// =====================================================================
//  SEUS DADOS — edite só este arquivo para personalizar o portfólio.
//  Salve e recarregue a página para ver as mudanças.
// =====================================================================

const DADOS = {
  nome: "Luiz Arthur",
  iniciais: "LA",                 // aparece no lugar da foto
  foto: "",                       // ex.: "img/foto.jpg" (deixe vazio para usar as iniciais)
  titulo: "Engenheiro de Dados",
  frasesDigitadas: ["Engenheiro de Dados", "Analytics Engineer", "construtor de pipelines"],

  resumo:
    "Engenheiro de Dados com 3 anos de experiência em Databricks, dbt, Spark e Airflow, " +
    "atuando do dado bruto ao dashboard. Trabalho com Data Warehousing, Lakehouse e " +
    "Arquitetura Medallion em AWS, GCP e Azure, priorizando performance, qualidade e governança.",
  destaque:
    "Reduzi em 60% o tempo de geração de relatórios analíticos em uma operação de e-commerce " +
    "com cerca de 4 mil pedidos por dia. Sem pipelines confiáveis, relatórios viram retrabalho " +
    "e decisões atrasam — é esse problema que eu resolvo.",

  info: [
    { rotulo: "Localização", valor: "Brasil" },
    { rotulo: "Email", valor: "luizarthur1831@gmail.com" },
    { rotulo: "Formação", valor: "Análise e Desenvolvimento de Sistemas" },
    { rotulo: "Certificação", valor: "Databricks Fundamentals" },
    { rotulo: "Foco", valor: "Engenharia de Dados, Lakehouse & Cloud" },
  ],

  redes: {
    github: "https://github.com/ArthurTheWorld",
    linkedin: "https://www.linkedin.com/in/luiz-arthur-/",
    email: "luizarthur1831@gmail.com",
    instagram: "",                // deixe vazio para esconder
  },

  numeros: [
    { valor: 3, sufixo: "+", rotulo: "Anos em engenharia de dados" },
    { valor: 60, sufixo: "%", rotulo: "Menos tempo para gerar relatórios" },
    { valor: 20, sufixo: "+", rotulo: "Modelos dbt em produção" },
    { valor: 4, sufixo: " mil", rotulo: "Pedidos/dia processados" },
  ],

  // Níveis sugeridos a partir do currículo — ajuste como achar justo
  habilidades: [
    { nome: "Python & SQL", nivel: 90 },
    { nome: "Apache Spark, PySpark & Databricks", nivel: 90 },
    { nome: "dbt & Modelagem dimensional", nivel: 90 },
    { nome: "Airflow & Orquestração (Workflows, Data Factory)", nivel: 80 },
    { nome: "Cloud (AWS, Azure, GCP) & Snowflake", nivel: 80 },
    { nome: "Power BI & DAX", nivel: 80 },
    { nome: "Kafka & Streaming", nivel: 70 },
    { nome: "Terraform, Docker & CI/CD", nivel: 70 },
  ],

  formacao: [
    { titulo: "Análise e Desenvolvimento de Sistemas", periodo: "2023 – 2026", local: "Grupo Projeção", texto: "" },
    { titulo: "Databricks Fundamentals Accreditation", periodo: "Certificação", local: "Databricks", texto: "" },
  ],

  experiencias: [
    {
      titulo: "Engenheiro de Dados",
      periodo: "ago 2023 – atual",
      local: "CSkinStore · Balneário Camboriú, SC",
      itens: [
        "Reduzi em 60% o tempo de geração de relatórios em um e-commerce com ~4 mil pedidos/dia.",
        "Data Warehouse em Star Schema com dbt e Arquitetura Medallion (Bronze → Gold), com 20+ modelos, testes automatizados e macros reutilizáveis.",
        "Refatorei 20+ queries SQL e fiz tuning de tabelas Delta no Databricks, levando execuções de minutos para segundos.",
        "Pipelines diários com Databricks Workflows e Azure Data Factory, com alertas proativos para garantir SLAs.",
        "Governança com Unity Catalog (controle de acesso, catalogação e lineage) e 5 dashboards em Power BI com DAX avançado.",
      ],
    },
    {
      titulo: "Engenheiro de Dados",
      periodo: "jan 2026 – jun 2026",
      local: "Roda Gigante Produção · Brasília, DF",
      itens: [
        "Desenvolvi cerca de 5 modelos dbt integrando informações corporativas para consumo analítico.",
        "Mantive pipelines no Databricks e implementei rotinas de validação e monitoramento de qualidade de dados.",
        "Apoiei a governança via Unity Catalog e a construção de dashboards em Power BI.",
      ],
    },
    {
      titulo: "Desenvolvedor de Dados Independente",
      periodo: "jan 2023 – atual",
      local: "Projetos autorais · github.com/ArthurTheWorld",
      itens: [
        "Projetos públicos que reproduzem arquiteturas de dados corporativas modernas: Data Warehouse, Lakehouse, streaming, IaC e MLOps.",
      ],
    },
  ],

  // categoria: precisa bater com um dos nomes em "categorias"
  // link: cole o endereço do repositório de cada projeto no GitHub
  categorias: ["Lakehouse & DW", "Streaming & CDC", "Qualidade de Dados", "Cloud & ELT", "MLOps & IA"],
  projetos: [
    { titulo: "Data Warehouse no Databricks", descricao: "Pipeline Landing → Bronze → Silver → Gold com Delta Live Tables, Structured Streaming e Volumes do Unity Catalog.", categoria: "Lakehouse & DW", link: "https://github.com/ArthurTheWorld/Projeto-Data_Warehouse_Databricks", imagem: "" },
    { titulo: "CNPJ Lakehouse", descricao: "Lakehouse sobre os dados abertos de CNPJ da Receita: ~60 milhões de empresas e ~100 GB, tratando skew e layout sujo.", categoria: "Lakehouse & DW", link: "https://github.com/ArthurTheWorld/cnpj-lakehouse", imagem: "" },
    { titulo: "CVM Fundos no BigQuery", descricao: "Lakehouse de fundos da CVM com BigQuery (raw / staging / marts), dbt, Airflow e CI.", categoria: "Lakehouse & DW", link: "https://github.com/ArthurTheWorld/cvm-bigquery-lakehouse", imagem: "" },
    { titulo: "Olist Analytics Pipeline", descricao: "Pipeline analítico com DuckDB, dbt e Streamlit sobre ~100 mil pedidos reais de e-commerce.", categoria: "Lakehouse & DW", link: "https://github.com/ArthurTheWorld/olist-analytics-pipeline", imagem: "" },
    { titulo: "CDC Lakehouse", descricao: "CDC de ponta a ponta: Postgres → Debezium → Kafka → Spark → Delta Lake, com MERGE idempotente e evolução de schema.", categoria: "Streaming & CDC", link: "https://github.com/ArthurTheWorld/cdc-lakehouse", imagem: "" },
    { titulo: "Streaming de dados financeiros", descricao: "Cotações via Yahoo Finance publicadas no Kafka e consumidas com Spark Structured Streaming até GCS/BigQuery.", categoria: "Streaming & CDC", link: "https://github.com/ArthurTheWorld/Projeto3-StreamingDados", imagem: "" },
    { titulo: "Sentinela", descricao: "Plataforma de confiabilidade de dados: SLOs, baseline sazonal, blast radius via dbt, diagnóstico assistido e MTTR.", categoria: "Qualidade de Dados", link: "https://github.com/ArthurTheWorld/sentinela", imagem: "" },
    { titulo: "Data Quality Platform", descricao: "Pipeline ELT de e-commerce com validação de qualidade em múltiplas camadas, transformações SQL e observabilidade.", categoria: "Qualidade de Dados", link: "https://github.com/ArthurTheWorld/DataQualityPlatform", imagem: "" },
    { titulo: "Logistics Data Contracts", descricao: "Contratos de dados no padrão ODCS validados no CI/CD: o build falha se os dados quebrarem o contrato.", categoria: "Qualidade de Dados", link: "https://github.com/ArthurTheWorld/logistics-data-contracts", imagem: "" },
    { titulo: "AWS Lakehouse com Terraform", descricao: "Data Lake na AWS (S3, Glue e IAM) provisionado como código.", categoria: "Cloud & ELT", link: "https://github.com/ArthurTheWorld/AwsLakehouseIac", imagem: "" },
    { titulo: "Cripto ELT", descricao: "ELT de criptomoedas com Airflow, dbt, Postgres e data lake S3, com idempotência e contratos de dados.", categoria: "Cloud & ELT", link: "https://github.com/ArthurTheWorld/cripto-elt", imagem: "" },
    { titulo: "Fraud MLOps Platform", descricao: "Detecção de fraude com MLflow, API em FastAPI, monitoramento de drift e CI/CD.", categoria: "MLOps & IA", link: "https://github.com/ArthurTheWorld/fraud-mlops-platform", imagem: "" },
    { titulo: "Pipeline Doctor", descricao: "Diagnóstico de falhas no Airflow com LLM, MongoDB e dashboard de auditoria em Streamlit.", categoria: "MLOps & IA", link: "https://github.com/ArthurTheWorld/pipeline-doctor", imagem: "" },
    { titulo: "RAG local", descricao: "Assistente RAG com Ollama rodando 100% local.", categoria: "MLOps & IA", link: "https://github.com/ArthurTheWorld/rag-ollama", imagem: "" },
  ],

  // ícones: veja os nomes em https://icons.getbootstrap.com
  servicos: [
    { icone: "bi-diagram-3", titulo: "Pipelines de dados", texto: "Ingestão e orquestração batch e streaming com Airflow, Databricks e Data Factory." },
    { icone: "bi-database", titulo: "Data Warehouse & Lakehouse", texto: "Modelagem dimensional com dbt e Arquitetura Medallion, com testes e governança." },
    { icone: "bi-speedometer2", titulo: "Performance & custos", texto: "Tuning de SQL e tabelas Delta para consultas mais rápidas e baratas." },
    { icone: "bi-bar-chart-line", titulo: "Dashboards em Power BI", texto: "KPIs financeiros, operacionais e comerciais com DAX avançado." },
    { icone: "bi-cloud", titulo: "Cloud & Infraestrutura", texto: "AWS, Azure e GCP com Terraform, Docker e CI/CD." },
  ],

  // Formulário de contato: crie um formulário grátis em https://formspree.io
  // e cole o endereço aqui (ex.: "https://formspree.io/f/abcdwxyz").
  // Se ficar vazio, o botão abre o app de email do visitante.
  formspree: "",
};
