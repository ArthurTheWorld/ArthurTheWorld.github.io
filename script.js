// Monta a página a partir de DADOS (dados.js). Não precisa editar aqui.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const d = DADOS;
// Tradução dos textos fixos (idioma.js); sem ele, fica tudo em português
const tr = window.tr || ((s) => s);
const poucoMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.title = `${d.nome} | ${d.titulo}`;

// Só a página principal (tema de vidro) usa pipeline, logos e projetos resumidos
const temaVidro = document.body.classList.contains("tema-vidro");
const ARQUIVOS_LOGO = { spark: "apachespark", bigquery: "googlebigquery", mongodb: "mongodb-icon" };
const NOMES_LOGO = {
  python: "Python", databricks: "Databricks", dbt: "dbt", airflow: "Airflow", kafka: "Kafka", snowflake: "Snowflake",
  terraform: "Terraform", docker: "Docker", "power-bi": "Power BI", azure: "Azure", aws: "AWS", "google-cloud": "Google Cloud",
  postgres: "PostgreSQL", "github-actions": "GitHub Actions", streamlit: "Streamlit", spark: "Apache Spark",
  bigquery: "BigQuery", duckdb: "DuckDB", mlflow: "MLflow", ollama: "Ollama", fastapi: "FastAPI", mongodb: "MongoDB",
};
const logo = (chave, decorativo = false) =>
  `<img class="logo" src="assets/icons/${ARQUIVOS_LOGO[chave] || chave}.svg" alt="${decorativo ? "" : NOMES_LOGO[chave]}"${decorativo ? "" : ` title="${NOMES_LOGO[chave]}"`} width="20" height="20" loading="lazy">`;

// Perfil
$("avatar").innerHTML = d.foto ? `<img src="${esc(d.foto)}" alt="${esc(d.nome)}">` : esc(d.iniciais);
$("sidebarNome").textContent = d.nome;
$("heroNome").textContent = d.nome;
if ($("heroFato")) $("heroFato").textContent = d.fato;
if ($("pipeline")) {
  $("pipeline").innerHTML = d.pipeline
    .map((e, i) => `<li style="--i:${i}">${logo(e.logo, true)}<strong>${esc(e.nome)}</strong><span>${esc(e.papel)}</span></li>`)
    .join("");
}
$("rodapeNome").textContent = d.nome;
$("ano").textContent = new Date().getFullYear();

const icones = { github: "bi-github", linkedin: "bi-linkedin", instagram: "bi-instagram", email: "bi-envelope" };
$("redes").innerHTML = Object.entries(d.redes)
  .filter(([, url]) => url)
  .map(([rede, url]) => {
    const href = rede === "email" ? `mailto:${url}` : url;
    return `<a href="${esc(href)}" target="_blank" rel="noopener" aria-label="${rede}"><i class="bi ${icones[rede]}"></i></a>`;
  }).join("");

// Sobre
$("resumo").textContent = d.resumo;
$("sobreTitulo").textContent = d.titulo;
$("destaque").textContent = d.destaque;
$("info").innerHTML = d.info
  .map((i) => `<li><i class="bi bi-chevron-right"></i><span><strong>${esc(i.rotulo)}:</strong> ${esc(i.valor)}</span></li>`)
  .join("");
$("numeros").innerHTML = d.numeros
  .map((n) => `<div class="numero revelar"><span data-alvo="${n.valor}" data-sufixo="${esc(n.sufixo)}">${n.valor}${esc(n.sufixo)}</span><p>${esc(n.rotulo)}</p></div>`)
  .join("");

// Habilidades
$("barras").innerHTML = temaVidro
  ? d.competencias
    .map((g) => `<div class="grupo-comp revelar">
        <h3>${esc(g.area)}</h3>
        <ul>${g.itens.map((i) => `<li>${i.logo ? logo(i.logo, true) : `<i class="bi ${esc(i.icone)}" aria-hidden="true"></i>`}${esc(i.nome)}</li>`).join("")}</ul>
      </div>`)
    .join("")
  : d.habilidades
  .map((h) => `<div class="revelar">
      <div class="barra-topo"><span>${esc(h.nome)}</span><span>${h.nivel}%</span></div>
      <div class="barra"><div style="clip-path: inset(0 ${100 - h.nivel}% 0 0)"></div></div>
    </div>`)
  .join("");

// Currículo
const itemTempo = (x) => `<div class="item-tempo revelar">
    <h4>${esc(x.titulo)}</h4>
    <span class="periodo">${esc(x.periodo)}</span>
    <em>${esc(x.local)}</em>
    ${x.texto ? `<p>${esc(x.texto)}</p>` : ""}
    ${x.itens ? `<ul>${x.itens.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
  </div>`;
$("formacao").innerHTML = d.formacao.map(itemTempo).join("");
$("experiencias").innerHTML = d.experiencias.map(itemTempo).join("");

// Projetos com filtro
const iconeCategoria = ["bi-database", "bi-lightning-charge", "bi-shield-check", "bi-cloud", "bi-robot"];
$("filtros").innerHTML = ["Todos", ...d.categorias]
  .map((c, i) => `<button class="${i === 0 ? "ativo" : ""}" data-filtro="${esc(c)}">${esc(i === 0 ? tr(c) : c)}</button>`)
  .join("");
const LIMITE_PROJETOS = 6;
// animarDe: a partir de qual card os novos entram com animação (null = nenhum)
function mostrarProjetos(filtro, verTudo = false, animarDe = null) {
  const lista = d.projetos.filter((p) => filtro === "Todos" || p.categoria === filtro);
  const resumir = temaVidro && filtro === "Todos" && !verTudo && lista.length > LIMITE_PROJETOS;
  const botaoTodos = $("verTodos");
  if (botaoTodos) {
    botaoTodos.hidden = !resumir;
    botaoTodos.textContent = window.IDIOMA === "en" ? `View all ${lista.length} projects` : `Ver todos os ${lista.length} projetos`;
  }
  $("projetosGrid").innerHTML = (resumir ? lista.slice(0, LIMITE_PROJETOS) : lista)
    .map((p, i) => {
      const entra = temaVidro && !poucoMovimento && animarDe !== null && i >= animarDe;
      const icone = iconeCategoria[d.categorias.indexOf(p.categoria)] || "bi-folder";
      const capa = p.imagem
        ? `<div class="capa"><img src="${esc(p.imagem)}" alt=""></div>`
        : temaVidro ? "" : `<div class="capa"><i class="bi ${icone}"></i></div>`;
      return `<article class="projeto${entra ? " entra" : ""}"${entra ? ` style="--i:${i - animarDe}"` : ""}>
        ${capa}
        <div class="corpo">
          <span class="tag">${temaVidro && !p.imagem ? `<i class="bi ${icone}"></i>` : ""}${esc(p.categoria)}</span>
          <h4>${esc(p.titulo)}</h4>
          ${temaVidro && p.destaque ? `<p class="destaque-proj">${esc(p.destaque)}</p>` : ""}
          <p>${esc(p.descricao)}</p>
          <div class="proj-rodape">
            ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${tr("Ver projeto")} <i class="bi bi-arrow-right"></i></a>` : ""}
            ${temaVidro && p.ferramentas ? `<span class="proj-logos">${p.ferramentas.map((f) => logo(f)).join("")}</span>` : ""}
          </div>
        </div>
      </article>`;
    }).join("");
}
$("filtros").addEventListener("click", (e) => {
  const botao = e.target.closest("button");
  if (!botao) return;
  $("filtros").querySelectorAll("button").forEach((b) => b.classList.toggle("ativo", b === botao));
  mostrarProjetos(botao.dataset.filtro, false, 0);
});
$("verTodos")?.addEventListener("click", () => {
  mostrarProjetos("Todos", true, LIMITE_PROJETOS);
  // Leva o foco ao primeiro projeto novo, para quem navega pelo teclado
  $("projetosGrid").children[LIMITE_PROJETOS]?.querySelector("a")?.focus();
});
mostrarProjetos("Todos");

// Serviços
$("servicosGrid").innerHTML = d.servicos
  .map((s) => `<div class="servico revelar"><i class="bi ${esc(s.icone)}"></i><h4>${esc(s.titulo)}</h4><p>${esc(s.texto)}</p></div>`)
  .join("");

// Contato
const contatos = [
  { icone: "bi-geo-alt", titulo: tr("Localização"), valor: d.info[0]?.valor },
  { icone: "bi-envelope", titulo: "Email", valor: d.redes.email, href: `mailto:${d.redes.email}` },
  { icone: "bi-linkedin", titulo: "LinkedIn", valor: d.redes.linkedin.replace(/^https?:\/\//, ""), href: d.redes.linkedin },
  { icone: "bi-github", titulo: "GitHub", valor: d.redes.github.replace(/^https?:\/\//, ""), href: d.redes.github },
];
$("contatoInfo").innerHTML = contatos
  .filter((c) => c.valor)
  .map((c) => `<div class="contato-item"><i class="bi ${c.icone}"></i><div>
      <h4>${c.titulo}</h4>
      ${c.href ? `<a href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.valor)}</a>` : `<p>${esc(c.valor)}</p>`}
    </div></div>`)
  .join("");

$("formContato").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const campos = Object.fromEntries(new FormData(form));
  if (!d.formspree) {
    const corpo = `${campos.mensagem}\n\n— ${campos.nome} (${campos.email})`;
    location.href = `mailto:${d.redes.email}?subject=${encodeURIComponent(campos.assunto)}&body=${encodeURIComponent(corpo)}`;
    return;
  }
  $("statusForm").textContent = tr("Enviando…");
  try {
    const r = await fetch(d.formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error();
    form.reset();
    $("statusForm").textContent = tr("Mensagem enviada. Obrigado!");
  } catch {
    $("statusForm").textContent = tr("Não foi possível enviar. Tente pelo email.");
  }
});

// Texto digitando no topo: já abre no cargo, passa pelas outras frases uma vez e para no cargo
(function digitar() {
  const alvo = $("digitado"), frases = d.frasesDigitadas;
  alvo.textContent = frases[0];
  const cursor = document.querySelector(".cursor");
  if (poucoMovimento) { cursor?.remove(); return; }
  let frase = 0, letra = frases[0].length, apagando = true, voltas = 0;
  function passo() {
    const texto = frases[frase];
    letra += apagando ? -1 : 1;
    alvo.textContent = texto.slice(0, letra);
    let espera = apagando ? 50 : 100;
    if (!apagando && letra === texto.length) {
      if (voltas === frases.length) { cursor?.remove(); return; }
      apagando = true; espera = 1800;
    } else if (apagando && letra === 0) {
      apagando = false; frase = (frase + 1) % frases.length; voltas++; espera = 400;
    }
    setTimeout(passo, espera);
  }
  setTimeout(passo, 1800);
})();

// Animações ao rolar: fade-in, barras e contadores
function contar(el) {
  if (poucoMovimento) { el.textContent = el.dataset.alvo + el.dataset.sufixo; return; }
  const alvo = +el.dataset.alvo, inicio = performance.now(), dur = 800;
  (function quadro(t) {
    const p = Math.min((t - inicio) / dur, 1);
    const e = 1 - (1 - p) ** 3; // desacelera ao chegar no valor final
    el.textContent = Math.round(alvo * e) + (p === 1 ? el.dataset.sufixo : "");
    if (p < 1) requestAnimationFrame(quadro);
  })(inicio);
}
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("visivel");
    en.target.querySelectorAll("[data-alvo]").forEach(contar);
    observador.unobserve(en.target);
  });
}, { threshold: 0.2 });
// Só esconde os blocos depois que o observador existe: se ele falhar, o conteúdo continua visível
document.documentElement.classList.add("anima");
document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));

// Menu: destaca a seção atual e abre/fecha no celular
const links = document.querySelectorAll("nav a");
const secoes = [...document.querySelectorAll("main section")];
window.addEventListener("scroll", () => {
  const y = scrollY + innerHeight / 3;
  const atual = secoes.filter((s) => s.offsetTop <= y).pop();
  links.forEach((a) => a.classList.toggle("ativo", atual && a.getAttribute("href") === "#" + atual.id));
});
function menu(aberto) {
  $("sidebar").classList.toggle("aberta", aberto);
  $("veu")?.classList.toggle("visivel", aberto);
  $("menuToggle").setAttribute("aria-expanded", aberto);
  $("menuToggle").setAttribute("aria-label", tr(aberto ? "Fechar menu" : "Abrir menu"));
}
$("menuToggle").addEventListener("click", () => menu(!$("sidebar").classList.contains("aberta")));
$("veu")?.addEventListener("click", () => menu(false));
links.forEach((a) => a.addEventListener("click", () => menu(false)));
