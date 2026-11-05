// Fundo: cidade à noite em duas camadas, desenhada em SVG, e parallax ao rolar.
// O parallax fica desligado para quem pede menos movimento e em telas de celular.
(function () {
  const CIANO = "#00f0ff", AMARELO = "#fcee0a", VERMELHO = "#ff2a6d";
  const EXTRA = { longe: 160, perto: 320 }; // quanto cada camada sobra para deslizar
  const CAMADAS = {
    longe: { minW: 50, maxW: 120, minH: .4, maxH: .82, cor: "#12122a", janela: 3, passoX: 11, passoY: 15, acesas: .3, brilho: .55, placas: .15 },
    perto: { minW: 90, maxW: 210, minH: .18, maxH: .5, cor: "#090914", janela: 5, passoX: 18, passoY: 24, acesas: .25, brilho: .9, placas: .4 },
  };

  const fundo = document.querySelector(".luzes");
  const hero = document.querySelector(".hero");
  const heroConteudo = document.querySelector(".hero-conteudo");
  const semMovimento = matchMedia("(prefers-reduced-motion: reduce)");
  const celular = matchMedia("(max-width: 700px)");
  const camadas = {};

  // Sempre a mesma sequência, para a cidade não mudar a cada visita
  let semente;
  const aleatorio = () => (semente = (semente * 16807) % 2147483647) / 2147483647;
  const entre = (a, b) => a + aleatorio() * (b - a);
  const escolher = (lista) => lista[Math.floor(aleatorio() * lista.length)];

  function predios(w, h, o) {
    let s = "", x = -10;
    while (x < w) {
      const bw = entre(o.minW, o.maxW), bh = entre(o.minH, o.maxH) * h, topo = h - bh;
      s += `<rect x="${x}" y="${topo}" width="${bw}" height="${bh}" fill="${o.cor}"/>`;
      for (let jy = topo + 12; jy < h - 6; jy += o.passoY) {
        for (let jx = x + 7; jx < x + bw - o.janela; jx += o.passoX) {
          if (aleatorio() < o.acesas) s += `<rect x="${jx}" y="${jy}" width="${o.janela}" height="${o.janela * 1.5}" fill="${escolher([CIANO, AMARELO, AMARELO, "#ffffff"])}" opacity="${entre(o.brilho * .5, o.brilho)}"/>`;
        }
      }
      if (aleatorio() < o.placas) {
        const cor = escolher([VERMELHO, CIANO, AMARELO]), py = topo + entre(10, Math.max(12, bh * .3)), ph = entre(50, 150), px = x + bw - 5;
        s += `<rect x="${px - 8}" y="${py - 8}" width="20" height="${ph + 16}" fill="${cor}" opacity=".16"/><rect x="${px}" y="${py}" width="4" height="${ph}" fill="${cor}" opacity=".95"/>`;
      }
      x += bw + entre(0, 8);
    }
    return s;
  }

  function desenhar() {
    semente = 11;
    const w = innerWidth, h = innerHeight;
    fundo.querySelectorAll(".camada").forEach((c) => c.remove());
    for (const nome in CAMADAS) {
      const altura = h + EXTRA[nome], camada = document.createElement("div");
      camada.className = "camada";
      camada.style.height = altura + "px";
      camada.innerHTML = `<svg viewBox="0 0 ${w} ${altura}" preserveAspectRatio="none">${predios(w, altura, CAMADAS[nome])}</svg>`;
      fundo.appendChild(camada);
      camadas[nome] = camada;
    }
    mover();
  }

  function mover() {
    agendado = false;
    const parado = semMovimento.matches || celular.matches;
    const total = document.documentElement.scrollHeight - innerHeight;
    const y = scrollY, progresso = total > 0 ? y / total : 0;
    for (const nome in camadas) camadas[nome].style.transform = parado ? "" : `translate3d(0, ${-progresso * EXTRA[nome]}px, 0)`;
    if (parado) {
      heroConteudo.style.transform = "";
      hero.style.removeProperty("--brilho-y");
    } else if (y < innerHeight) {
      heroConteudo.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
      hero.style.setProperty("--brilho-y", `${y * 0.4}px`);
    }
  }

  let agendado = false, larguraAtual = innerWidth, espera;
  addEventListener("scroll", () => { if (!agendado) { agendado = true; requestAnimationFrame(mover); } }, { passive: true });
  semMovimento.addEventListener("change", mover);
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
