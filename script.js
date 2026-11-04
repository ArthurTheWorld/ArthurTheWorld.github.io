// Monta a página a partir de DADOS (dados.js). Não precisa editar aqui.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const d = DADOS;
const poucoMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.title = `${d.nome} | ${d.titulo}`;

// Perfil
$("avatar").innerHTML = d.foto ? `<img src="${esc(d.foto)}" alt="${esc(d.nome)}">` : esc(d.iniciais);
$("sidebarNome").textContent = d.nome;
$("heroNome").textContent = d.nome;
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
  .map((n) => `<div class="numero revelar"><span data-alvo="${n.valor}" data-sufixo="${esc(n.sufixo)}">0</span><p>${esc(n.rotulo)}</p></div>`)
  .join("");

// Habilidades
$("barras").innerHTML = d.habilidades
  .map((h) => `<div class="revelar">
      <div class="barra-topo"><span>${esc(h.nome)}</span><span>${h.nivel}%</span></div>
      <div class="barra"><div data-nivel="${h.nivel}"></div></div>
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
  .map((c, i) => `<button class="${i === 0 ? "ativo" : ""}" data-filtro="${esc(c)}">${esc(c)}</button>`)
  .join("");
function mostrarProjetos(filtro) {
  $("projetosGrid").innerHTML = d.projetos
    .filter((p) => filtro === "Todos" || p.categoria === filtro)
    .map((p) => {
      const icone = iconeCategoria[d.categorias.indexOf(p.categoria)] || "bi-folder";
      return `<article class="projeto">
        <div class="capa">${p.imagem ? `<img src="${esc(p.imagem)}" alt="">` : `<i class="bi ${icone}"></i>`}</div>
        <div class="corpo">
          <span class="tag">${esc(p.categoria)}</span>
          <h4>${esc(p.titulo)}</h4>
          <p>${esc(p.descricao)}</p>
          ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Ver projeto <i class="bi bi-arrow-right"></i></a>` : ""}
        </div>
      </article>`;
    }).join("");
}
$("filtros").addEventListener("click", (e) => {
  const botao = e.target.closest("button");
  if (!botao) return;
  $("filtros").querySelectorAll("button").forEach((b) => b.classList.toggle("ativo", b === botao));
  mostrarProjetos(botao.dataset.filtro);
});
mostrarProjetos("Todos");

// Serviços
$("servicosGrid").innerHTML = d.servicos
  .map((s) => `<div class="servico revelar"><i class="bi ${esc(s.icone)}"></i><h4>${esc(s.titulo)}</h4><p>${esc(s.texto)}</p></div>`)
  .join("");

// Contato
const contatos = [
  { icone: "bi-geo-alt", titulo: "Localização", valor: d.info[0]?.valor },
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
  $("statusForm").textContent = "Enviando…";
  try {
    const r = await fetch(d.formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error();
    form.reset();
    $("statusForm").textContent = "Mensagem enviada. Obrigado!";
  } catch {
    $("statusForm").textContent = "Não foi possível enviar. Tente pelo email.";
  }
});

// Texto digitando no topo
(function digitar() {
  if (poucoMovimento) { $("digitado").textContent = d.frasesDigitadas[0]; return; }
  let frase = 0, letra = 0, apagando = false;
  const alvo = $("digitado");
  (function passo() {
    const texto = d.frasesDigitadas[frase];
    letra += apagando ? -1 : 1;
    alvo.textContent = texto.slice(0, letra);
    let espera = apagando ? 50 : 100;
    if (!apagando && letra === texto.length) { apagando = true; espera = 1800; }
    else if (apagando && letra === 0) { apagando = false; frase = (frase + 1) % d.frasesDigitadas.length; espera = 400; }
    setTimeout(passo, espera);
  })();
})();

// Animações ao rolar: fade-in, barras e contadores
function contar(el) {
  if (poucoMovimento) { el.textContent = el.dataset.alvo + el.dataset.sufixo; return; }
  const alvo = +el.dataset.alvo, inicio = performance.now(), dur = 1200;
  (function quadro(t) {
    const p = Math.min((t - inicio) / dur, 1);
    el.textContent = Math.round(alvo * p) + (p === 1 ? el.dataset.sufixo : "");
    if (p < 1) requestAnimationFrame(quadro);
  })(inicio);
}
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("visivel");
    en.target.querySelectorAll("[data-nivel]").forEach((b) => (b.style.clipPath = `inset(0 ${100 - b.dataset.nivel}% 0 0)`));
    en.target.querySelectorAll("[data-alvo]").forEach(contar);
    observador.unobserve(en.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));

// Menu: destaca a seção atual e abre/fecha no celular
const links = document.querySelectorAll("nav a");
const secoes = [...document.querySelectorAll("main section")];
window.addEventListener("scroll", () => {
  const y = scrollY + innerHeight / 3;
  const atual = secoes.filter((s) => s.offsetTop <= y).pop();
  links.forEach((a) => a.classList.toggle("ativo", atual && a.getAttribute("href") === "#" + atual.id));
});
$("menuToggle").addEventListener("click", () => $("sidebar").classList.toggle("aberta"));
links.forEach((a) => a.addEventListener("click", () => $("sidebar").classList.remove("aberta")));
