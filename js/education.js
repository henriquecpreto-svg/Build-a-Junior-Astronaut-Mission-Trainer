
window.Education = {

  topics: [

    {
      id: "mars",
      icon: "🪐",
      title: "Ambiente marciano",

      text:
        "Marte tem uma atmosfera muito mais fina que a terrestre, " +
        "composta principalmente por dióxido de carbono. " +
        "A superfície apresenta frio intenso e poeira. " +
        "Uma base humana precisaria de ambiente pressurizado " +
        "e sistemas de controle térmico.",

      source: "NASA Mars Exploration",
      url: "https://science.nasa.gov/mars/"
    },

    {
      id: "energy",
      icon: "☀️",
      title: "Energia e poeira",

      text:
        "Marte recebe menos luz solar por unidade de área " +
        "do que a Terra. A poeira em suspensão pode diminuir " +
        "a produção elétrica dos painéis. Por isso, " +
        "armazenar energia e administrar a demanda ajuda " +
        "a proteger sistemas essenciais.",

      source: "NASA Mars Exploration",
      url: "https://science.nasa.gov/mars/"
    },

    {
      id: "oxygen",
      icon: "🫧",
      title: "Oxigênio e MOXIE",

      text:
        "O instrumento MOXIE, instalado no rover Perseverance, " +
        "demonstrou a produção de oxigênio a partir do " +
        "dióxido de carbono da atmosfera de Marte. " +
        "Foi um experimento tecnológico em pequena escala, " +
        "não um sistema completo de suporte à vida.",

      source: "NASA — MOXIE",
      url: "https://www.nasa.gov/solar-system/nasas-oxygen-generating-experiment-moxie-completes-mars-mission/"
    },

    {
      id: "water",
      icon: "💧",
      title: "Reciclagem de água",

      text:
        "A reciclagem reduz a necessidade de transportar água. " +
        "Tecnologias da Estação Espacial Internacional " +
        "demonstram que a água pode ser recuperada e tratada " +
        "para reutilização. Uma base marciana precisaria " +
        "adaptar e manter seus próprios equipamentos.",

      source: "NASA — Water Recovery",
      url: "https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/"
    },

    {
      id: "food",
      icon: "🌱",
      title: "Agricultura espacial",

      text:
        "Plantas precisam de água, luz, nutrientes " +
        "e condições adequadas. A NASA estuda o cultivo " +
        "em ambientes controlados para missões espaciais. " +
        "Aumentar a produção de alimentos também amplia " +
        "o consumo de energia e água.",

      source: "NASA — Growing Plants in Space",
      url: "https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/"
    },

    {
      id: "radiation",
      icon: "🛡️",
      title: "Radiação espacial",

      text:
        "Marte não conta com uma atmosfera espessa " +
        "e um campo magnético global semelhantes aos da Terra. " +
        "Por isso, a proteção dos habitats e a existência " +
        "de abrigos são importantes para reduzir a exposição " +
        "da tripulação a partículas energéticas.",

      source: "NASA — Humans in Space",
      url: "https://www.nasa.gov/humans-in-space/"
    },

    {
      id: "data",
      icon: "📊",
      title: "Dados de missões planetárias",

      text:
        "O Planetary Data System (PDS) disponibiliza dados " +
        "de investigações planetárias. No nosso jogo, " +
        "os números de custo e produção são parâmetros " +
        "educativos e não dados retirados diretamente do PDS.",

      source: "NASA — Planetary Data System",
      url: "https://pds.nasa.gov/"
    }
  ],

  // EXPLICAÇÕES DAS DECISÕES
  hints: {

    solar:
      "Painéis solares dependem da luz disponível e podem perder eficiência com poeira.",

    greenhouse:
      "Estufas fornecem alimentos, mas também demandam água e energia.",

    recycler:
      "A recuperação de água reduz perdas, mas exige manutenção e eletricidade.",

    oxygen:
      "Produção de oxigênio precisa de energia e equipamentos apropriados.",

    shelter:
      "A proteção reduz a exposição a partículas energéticas, sem eliminar todos os riscos.",

    workshop:
      "Manutenção preventiva aumenta a confiabilidade dos sistemas de uma base.",

    balanced:
      "Equilibrar sistemas reduz o risco de favorecer um recurso e comprometer outro.",

    conserve:
      "Economizar energia pode reduzir a operação de outros equipamentos.",

    life:
      "Suporte à vida deve ter prioridade quando água ou oxigênio estão ameaçados.",

    farm:
      "O cultivo exige água e energia antes de fornecer mais alimentos."
  },

};