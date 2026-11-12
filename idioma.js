// =====================================================================
//  IDIOMA — versão em inglês do portfólio e o botão PT / EN.
//  Carregue depois de dados.js e antes de script.js.
//
//  Escolha do idioma, em ordem: ?lang=en|pt no endereço, a última escolha
//  do visitante e, por fim, o idioma do navegador (não-português abre em inglês).
//  Para mandar a versão em inglês a um recrutador: https://arthurtheworld.github.io/?lang=en
//
//  Ao editar dados.js, atualize aqui também. O que não tiver tradução
//  aparece em português.
// =====================================================================

(function () {
  const parametro = new URLSearchParams(location.search).get("lang");
  let salvo = null;
  try { salvo = localStorage.getItem("idioma"); } catch {}
  const navegador = (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
  const IDIOMA = ["pt", "en"].includes(parametro) ? parametro : ["pt", "en"].includes(salvo) ? salvo : navegador;
  window.IDIOMA = IDIOMA;

  // ---------- Textos fixos da página (index.html e script.js) ----------
  const TEXTOS = {
    "Início": "Home", "Perfil": "Profile", "Competências": "Skills", "Histórico": "Background",
    "Projetos": "Projects", "Serviços": "Services", "Contato": "Contact",
    "Ver projetos": "View projects", "Perfil profissional": "Professional profile",
    "Competências técnicas": "Technical skills", "Formação": "Education", "Experiência": "Experience",
    "Projetos em destaque": "Featured projects", "Enviar mensagem": "Send message",
    "Nomes e logos de produtos pertencem aos seus donos.": "Product names and logos belong to their owners.",
    "> acesso_concedido": "> access_granted",
    "> nome": "> name", "> assunto": "> subject", "> mensagem": "> message",
    "Abrir menu": "Open menu", "Fechar menu": "Close menu",
    "Caminho do dado: da ingestão aos dashboards": "Data path: from ingestion to dashboards",
    "Todos": "All", "Ver projeto": "View project", "Localização": "Location",
    "Enviando…": "Sending…", "Mensagem enviada. Obrigado!": "Message sent. Thank you!",
    "Não foi possível enviar. Tente pelo email.": "Could not send. Please try by email.",
    "> iniciando sistema..........OK": "> booting system............OK",
    "> carregando pipelines.......OK": "> loading pipelines..........OK",
    "> conectando ao lakehouse....OK": "> connecting to lakehouse....OK",
    "> verificando credenciais....OK": "> checking credentials.......OK",
    "> bem-vindo,": "> welcome,",
    "Português": "Português", "English": "English",
  };
  // Traduz um texto fixo; em português devolve o próprio texto
  window.tr = (s) => (IDIOMA === "en" && TEXTOS[s]) || s;

  // ---------- Dados em inglês (mesma forma de dados.js) ----------
  const CATEGORIAS = {
    "Lakehouse & DW": "Lakehouse & DW", "Streaming & CDC": "Streaming & CDC",
    "Qualidade de Dados": "Data Quality", "Cloud & ELT": "Cloud & ELT", "MLOps & IA": "MLOps & AI",
  };
  const PROJETOS = {
    "F1 Strategy Lakehouse": ["Lakehouse with real Formula 1 races: DuckDB and dbt, a lap-time model, a pit stop simulator and a Streamlit dashboard.", "6 real races from 2024"],
    "Pipeline Observability API": ["FastAPI service that reads dbt artifacts and tells whether today's data can be trusted, with auditing and privacy by design (LGPD).", "A traffic light that explains why"],
    "Data Warehouse no Databricks": ["Landing → Bronze → Silver → Gold pipeline with Delta Live Tables, Structured Streaming and Unity Catalog Volumes.", "Landing → Bronze → Silver → Gold", "Data Warehouse on Databricks"],
    "CNPJ Lakehouse": ["Lakehouse on Brazil's open company registry (CNPJ): ~60 million companies and ~100 GB, handling skew and a messy layout.", "~60 million companies · ~100 GB"],
    "CVM Fundos no BigQuery": ["Lakehouse of Brazilian investment funds (CVM) on BigQuery (raw / staging / marts), with dbt, Airflow and CI.", "raw → staging → marts", "CVM Funds on BigQuery"],
    "Olist Analytics Pipeline": ["Analytics pipeline with DuckDB, dbt and Streamlit over ~100k real e-commerce orders.", "~100k real orders"],
    "CDC Lakehouse": ["End-to-end CDC: Postgres → Debezium → Kafka → Spark → Delta Lake, with idempotent MERGE and schema evolution.", "Idempotent MERGE"],
    "Streaming de dados financeiros": ["Stock quotes from Yahoo Finance published to Kafka and consumed with Spark Structured Streaming into GCS/BigQuery.", "Streaming quotes", "Financial data streaming"],
    "Sentinela": ["Data reliability platform: SLOs, seasonal baselines, blast radius via dbt, assisted diagnosis and MTTR.", "SLOs, blast radius and MTTR"],
    "Data Quality Platform": ["E-commerce ELT pipeline with multi-layer quality checks, SQL transformations and observability.", "Multi-layer quality checks"],
    "Logistics Data Contracts": ["ODCS data contracts validated in CI/CD: the build fails if the data breaks the contract.", "The build fails if the contract breaks"],
    "AWS Lakehouse com Terraform": ["Data lake on AWS (S3, Glue and IAM) provisioned as code.", "Infrastructure as code", "AWS Lakehouse with Terraform"],
    "Cripto ELT": ["Cryptocurrency ELT with Airflow, dbt, Postgres and an S3 data lake, with idempotency and data contracts.", "Idempotency and data contracts", "Crypto ELT"],
    "Fraud MLOps Platform": ["Fraud detection with MLflow, a FastAPI service, drift monitoring and CI/CD.", "Drift monitoring"],
    "Pipeline Doctor": ["LLM-assisted diagnosis of Airflow failures, with MongoDB and a Streamlit audit dashboard.", "Failure diagnosis with an LLM"],
    "RAG local": ["RAG assistant with Ollama running 100% locally.", "100% local", "Local RAG"],
  };

  const EN = {
    titulo: "Data Engineer",
    frasesDigitadas: ["Data Engineer", "Analytics Engineer", "pipeline builder"],
    fato: "Data engineering: 3+ years with Databricks, dbt and Spark",
    resumo:
      "Data Engineer with 3 years of experience in Databricks, dbt, Spark and Airflow, " +
      "working from raw data all the way to the dashboard. I build Data Warehouses, Lakehouses and " +
      "Medallion Architectures on AWS, GCP and Azure, with a focus on performance, quality and governance.",
    destaque:
      "I cut analytical report generation time by 60% at an e-commerce operation handling " +
      "around 4,000 orders a day. Without reliable pipelines, reports turn into rework " +
      "and decisions get delayed — that is the problem I solve.",
    info: [
      { rotulo: "Location", valor: "Brazil" },
      { rotulo: "Email", valor: DADOS.redes.email },
      { rotulo: "Education", valor: "Systems Analysis and Development" },
      { rotulo: "Certification", valor: "Databricks Fundamentals" },
      { rotulo: "Languages", valor: "Portuguese (native), English (advanced/fluent)" },
      { rotulo: "Focus", valor: "Data Engineering, Lakehouse & Cloud" },
    ],
    numeros: [
      { valor: 3, sufixo: "+", rotulo: "Years in data engineering" },
      { valor: 60, sufixo: "%", rotulo: "Less time to generate reports" },
      { valor: 20, sufixo: "+", rotulo: "dbt models in production" },
      { valor: 4, sufixo: "k", rotulo: "Orders/day processed" },
    ],
    habilidades: [
      { nome: "Python & SQL", nivel: 90 },
      { nome: "Apache Spark, PySpark & Databricks", nivel: 90 },
      { nome: "dbt & Dimensional modeling", nivel: 90 },
      { nome: "Airflow & Orchestration (Workflows, Data Factory)", nivel: 80 },
      { nome: "Cloud (AWS, Azure, GCP) & Snowflake", nivel: 80 },
      { nome: "Power BI & DAX", nivel: 80 },
      { nome: "Kafka & Streaming", nivel: 70 },
      { nome: "Terraform, Docker & CI/CD", nivel: 70 },
    ],
    pipeline: [
      { nome: "Data Factory", papel: "Daily pipelines", logo: "azure" },
      { nome: "Bronze", papel: "Raw data", logo: "databricks" },
      { nome: "Silver", papel: "Cleaned data", logo: "databricks" },
      { nome: "Gold", papel: "20+ dbt models", logo: "dbt" },
      { nome: "Power BI", papel: "5 dashboards", logo: "power-bi" },
    ],
    competencias: [
      { area: "Languages and processing", itens: [
        { nome: "Python", logo: "python" }, { nome: "SQL", icone: "bi-database" },
        { nome: "Spark and PySpark", logo: "spark" }, { nome: "Databricks", logo: "databricks" },
      ] },
      { area: "Modeling and BI", itens: [
        { nome: "dbt", logo: "dbt" }, { nome: "Dimensional modeling", icone: "bi-diagram-3" },
        { nome: "Power BI and DAX", logo: "power-bi" },
      ] },
      { area: "Orchestration and streaming", itens: [
        { nome: "Airflow", logo: "airflow" }, { nome: "Databricks Workflows", logo: "databricks" },
        { nome: "Data Factory", logo: "azure" }, { nome: "Kafka", logo: "kafka" },
      ] },
      { area: "Cloud and infrastructure", itens: [
        { nome: "AWS", logo: "aws" }, { nome: "Azure", logo: "azure" }, { nome: "GCP", logo: "google-cloud" },
        { nome: "Snowflake", logo: "snowflake" }, { nome: "Terraform", logo: "terraform" },
        { nome: "Docker", logo: "docker" }, { nome: "CI/CD", icone: "bi-arrow-repeat" },
      ] },
    ],
    formacao: [
      { titulo: "Systems Analysis and Development", periodo: "2023 – 2026", local: "Grupo Projeção", texto: "" },
      { titulo: "Databricks Fundamentals Accreditation", periodo: "Certification", local: "Databricks", texto: "" },
    ],
    experiencias: [
      {
        titulo: "Data Engineer",
        periodo: "Aug 2023 – present",
        local: "CSkinStore · Balneário Camboriú, SC, Brazil",
        itens: [
          "Cut report generation time by 60% at an e-commerce business with ~4,000 orders/day.",
          "Star Schema Data Warehouse with dbt and Medallion Architecture (Bronze → Gold): 20+ models, automated tests and reusable macros.",
          "Refactored 20+ SQL queries and tuned Delta tables on Databricks, taking runs from minutes to seconds.",
          "Daily pipelines with Databricks Workflows and Azure Data Factory, with proactive alerts to meet SLAs.",
          "Governance with Unity Catalog (access control, cataloging and lineage) and 5 Power BI dashboards with advanced DAX.",
        ],
      },
      {
        titulo: "Data Engineer",
        periodo: "Jan 2026 – Jun 2026",
        local: "Roda Gigante Produção · Brasília, DF, Brazil",
        itens: [
          "Built about 5 dbt models integrating corporate data for analytics.",
          "Maintained Databricks pipelines and implemented data quality validation and monitoring routines.",
          "Supported governance with Unity Catalog and the build of Power BI dashboards.",
        ],
      },
      {
        titulo: "Independent Data Developer",
        periodo: "Jan 2023 – present",
        local: "Personal projects · github.com/ArthurTheWorld",
        itens: [
          "Public projects that reproduce modern enterprise data architectures: Data Warehouse, Lakehouse, streaming, IaC and MLOps.",
        ],
      },
    ],
    categorias: DADOS.categorias.map((c) => CATEGORIAS[c] || c),
    projetos: DADOS.projetos.map((p) => {
      const [descricao, destaque, titulo] = PROJETOS[p.titulo] || [];
      return { ...p, titulo: titulo || p.titulo, descricao: descricao || p.descricao,
        destaque: destaque || p.destaque, categoria: CATEGORIAS[p.categoria] || p.categoria };
    }),
    servicos: [
      { icone: "bi-diagram-3", titulo: "Data pipelines", texto: "Batch and streaming ingestion and orchestration with Airflow, Databricks and Data Factory." },
      { icone: "bi-database", titulo: "Data Warehouse & Lakehouse", texto: "Dimensional modeling with dbt and Medallion Architecture, with tests and governance." },
      { icone: "bi-speedometer2", titulo: "Performance & cost", texto: "SQL and Delta table tuning for faster, cheaper queries." },
      { icone: "bi-bar-chart-line", titulo: "Power BI dashboards", texto: "Financial, operational and sales KPIs with advanced DAX." },
      { icone: "bi-cloud", titulo: "Cloud & Infrastructure", texto: "AWS, Azure and GCP with Terraform, Docker and CI/CD." },
    ],
  };

  if (IDIOMA === "en") {
    Object.assign(DADOS, EN);
    document.documentElement.lang = "en";
    const descricao = document.querySelector('meta[name="description"]');
    if (descricao) descricao.content = `${DADOS.nome}'s portfolio — ${EN.titulo}`;

    // Troca os textos fixos do HTML (rótulos, placeholders e descrições para leitores de tela)
    const andar = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = andar.nextNode(); n; n = andar.nextNode()) {
      const t = n.nodeValue.trim();
      if (t && TEXTOS[t]) n.nodeValue = n.nodeValue.replace(t, TEXTOS[t]);
    }
    document.querySelectorAll("[placeholder], [aria-label]").forEach((el) => {
      ["placeholder", "aria-label"].forEach((a) => {
        const v = el.getAttribute(a);
        if (v && TEXTOS[v]) el.setAttribute(a, TEXTOS[v]);
      });
    });
  }

  // ---------- Botão PT / EN ----------
  const botao = document.createElement("div");
  botao.className = "idioma";
  botao.setAttribute("role", "group");
  botao.setAttribute("aria-label", IDIOMA === "en" ? "Language" : "Idioma");
  botao.innerHTML = [["pt", "PT", "Português"], ["en", "EN", "English"]]
    .map(([cod, rotulo, nome]) => `<button type="button" lang="${cod}" data-idioma="${cod}" aria-pressed="${cod === IDIOMA}" title="${nome}"><span aria-hidden="true">${rotulo}</span><span class="so-leitor">${nome}</span></button>`)
    .join("");
  botao.addEventListener("click", (e) => {
    const escolhido = e.target.closest("button")?.dataset.idioma;
    if (!escolhido || escolhido === IDIOMA) return;
    try { localStorage.setItem("idioma", escolhido); } catch {}
    // O endereço guarda o idioma (dá para compartilhar o link); o reload mantém a rolagem
    const url = new URL(location.href);
    if (escolhido === "en") url.searchParams.set("lang", "en"); else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    location.reload();
  });
  document.body.appendChild(botao);
})();
