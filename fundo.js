// Fundo animado: um cardume de peixes em caracteres, desenhado em canvas a 15 quadros por segundo.
// assets/peixes.json guarda a posição e o brilho de cada célula, quadro a quadro; os caracteres são escolhidos aqui.
// Só anima no topo da página, tem botão de pausa e fica parado para quem pede menos movimento.
(function () {
  const CARACTERES = ["`':;", "!;:o", "toS%", "X#8@"];
  const SOLTOS = ".'-`o";
  const COR_LADRILHO = [null, "#4a1640", "#74105c", "#960f76", "#f2b8e0"];
  const COR_CARACTERE = [null, "#e88ccb", "#ff58ba", "#ff78ca", "#2a0a22"];
  const COR_SOLTO = "rgba(214, 96, 170, .75)";

  const fundo = document.querySelector(".luzes");
  const heroConteudo = document.querySelector(".hero-conteudo");
  const semMovimento = matchMedia("(prefers-reduced-motion: reduce)");
  const celular = matchMedia("(max-width: 700px)");

  // Número estável para cada posição: a mesma célula sempre sorteia o mesmo caractere
  const valor = (i, j) => { const t = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return t - Math.floor(t); };

  let cardume = null;
  async function carregarCardume() {
    const j = await (await fetch("assets/peixes.json?v=3")).json();
    const N = j.cols * j.lins, bruto = atob(j.dados), q = new Uint8Array(N * j.quadros);
    let p = 0;
    for (let k = 0; k < j.quadros; k++) {
      let c = 0;
      while (c < N) {
        const v = bruto.charCodeAt(p++), n = bruto.charCodeAt(p++);
        for (let i = 0; i < n; i++, c++) q[k * N + c] = k ? v ^ q[(k - 1) * N + c] : v;
      }
    }
    cardume = { cols: j.cols, lins: j.lins, fps: j.fps, n: j.quadros, q };
  }

  // A área do texto do topo, para escurecer o peixe atrás dele
  const texto = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
  function areaDoTexto() {
    const nome = texto(document.getElementById("heroNome")), fato = texto(document.getElementById("heroFato"));
    const topo = document.querySelector(".pre-titulo").getBoundingClientRect(), botao = document.querySelector(".hero .botao").getBoundingClientRect();
    return { x0: Math.min(nome.left, fato.left) - 16, x1: Math.max(nome.right, fato.right, botao.right) + 16, y0: topo.top - 12, y1: botao.bottom + 12 };
  }

  let animacao = null, fundoPausado = false;
  function iniciar() {
    parar();
    const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
    canvas.className = "ascii";
    fundo.appendChild(canvas);
    const w = innerWidth, h = innerHeight;
    canvas.width = w; canvas.height = h;

    function pintar(t) {
      if (!cardume) return;
      ctx.clearRect(0, 0, w, h);
      // Computador: o cardume inteiro cabe à direita da barra lateral. Celular: maior, cortando as laterais.
      const { cols: C, lins: L, n, fps, q } = cardume, areaX = w > 1100 ? 270 : 0, cel = w < 700;
      const escala = cel ? .36 : (w - areaX) / 2560;
      const lc = (2560 / C) * escala, lh = (1440 / L) * escala, ox = cel ? (w - C * lc) / 2 : areaX, oy = cel ? 0 : (h - L * lh) / 2;
      const quadro = Math.floor(t * fps) % n, base = quadro * C * L, troca = Math.floor(quadro / 6);
      // Agrupa por cor: trocar de cor a cada caractere pesaria mais
      const niveis = [[], [], [], [], [], []];
      for (let y = 0; y < L; y++) for (let x = 0; x < C; x++) {
        const s = q[base + y * C + x];
        if (!s) continue;
        const px = ox + x * lc, py = oy + y * lh;
        if (px + lc < 0 || px > w || py + lh < 0 || py > h) continue;
        const nivel = Math.floor((s - 1) / 4) + 1, dens = (s - 1) % 4;
        const c = nivel === 5 ? SOLTOS[Math.floor(valor(x, y) * 5)] : CARACTERES[dens][Math.floor(valor(x + troca, y) * 4)];
        niveis[nivel].push(c, px, py);
      }
      ctx.font = `600 ${lh * .56}px "Share Tech Mono", ui-monospace, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (let nivel = 1; nivel <= 5; nivel++) {
        const g = niveis[nivel];
        if (nivel < 5) {
          ctx.fillStyle = COR_LADRILHO[nivel];
          ctx.beginPath();
          for (let k = 0; k < g.length; k += 3) ctx.roundRect(g[k + 1] + lc * .05, g[k + 2] + lh * .08, lc * .9, lh * .84, 3 * escala);
          ctx.fill();
        }
        ctx.fillStyle = nivel < 5 ? COR_CARACTERE[nivel] : COR_SOLTO;
        for (let k = 0; k < g.length; k += 3) ctx.fillText(g[k], g[k + 1] + lc / 2, g[k + 2] + lh * .54);
      }
    }

    // Atrás do texto o peixe só escurece: uma camada à parte, que não precisa ser redesenhada a cada quadro
    const veu = document.createElement("div");
    veu.className = "veu-texto";
    heroConteudo.prepend(veu);
    const ajustar = () => {
      const a = areaDoTexto(), c = heroConteudo.getBoundingClientRect();
      veu.style.cssText = `left:${a.x0 - c.left}px;top:${a.y0 - c.top}px;width:${a.x1 - a.x0}px;height:${a.y1 - a.y0}px`;
    };
    ajustar();
    document.fonts?.ready.then(() => { if (veu.isConnected) ajustar(); });

    const eu = { canvas, veu, id: 0 };
    animacao = eu;

    // Os dados chegam depois da página: desenha assim que estiverem prontos
    const paradoNoInicio = semMovimento.matches;
    const tempoInicial = () => (semMovimento.matches ? 8 : performance.now() / 1000);
    if (cardume) pintar(tempoInicial());
    else carregarCardume().then(() => { if (animacao === eu) pintar(tempoInicial()); }).catch(() => {});
    if (paradoNoInicio) return;

    // Quem preferir pode parar o movimento
    const pausa = document.createElement("button");
    pausa.type = "button";
    pausa.className = "pausa-fundo";
    const rotular = () => {
      pausa.innerHTML = `<i class="bi ${fundoPausado ? "bi-play-fill" : "bi-pause-fill"}" aria-hidden="true"></i>`;
      pausa.setAttribute("aria-label", fundoPausado ? "Retomar a animação do fundo" : "Pausar a animação do fundo");
      pausa.title = pausa.getAttribute("aria-label");
    };
    pausa.addEventListener("click", () => { fundoPausado = !fundoPausado; rotular(); });
    rotular();
    document.querySelector(".hero").appendChild(pausa);
    eu.pausa = pausa;

    let ultimo = 0;
    (function quadro(ms) {
      eu.id = requestAnimationFrame(quadro);
      if (document.hidden || fundoPausado || ms - ultimo < 66) return; // 15 quadros por segundo
      if (scrollY > innerHeight * .9) return; // só anima no topo: congela durante a leitura das seções
      ultimo = ms;
      pintar(ms / 1000);
    })(0);
  }
  function parar() {
    if (!animacao) return;
    cancelAnimationFrame(animacao.id);
    animacao.veu.remove();
    animacao.canvas.remove();
    animacao.pausa?.remove();
    animacao = null;
  }

  function mover() {
    agendado = false;
    const y = scrollY;
    animacao?.canvas.classList.toggle("ao-ler", y > innerHeight * .6); // o desenho recua quando começam as seções
    if (semMovimento.matches || celular.matches) heroConteudo.style.transform = "";
    else if (y < innerHeight) heroConteudo.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
  }
  function desenhar() { iniciar(); mover(); }

  let agendado = false, larguraAtual = innerWidth, espera;
  addEventListener("scroll", () => { if (!agendado) { agendado = true; requestAnimationFrame(mover); } }, { passive: true });
  semMovimento.addEventListener("change", desenhar);
  celular.addEventListener("change", mover);
  // No celular a barra do navegador muda a altura ao rolar: só redesenha se a largura mudar
  addEventListener("resize", () => {
    if (innerWidth === larguraAtual) return;
    larguraAtual = innerWidth;
    clearTimeout(espera);
    espera = setTimeout(desenhar, 200);
  });
  desenhar();
})();
