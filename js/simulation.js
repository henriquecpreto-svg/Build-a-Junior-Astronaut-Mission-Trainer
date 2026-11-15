window.Simulation = {  

  dia: 1,
  maxDiasMissao: 30,
  estadoMissao: "Em andamento",
  acoesDisponiveis: 2,
  finalizada: false,
  resultado: null,

  tripulacao: 1,
  saudeTripulante: 100,
  habitat: 100,
  protecao: 60,

  instalacoes: [
    {
      id: "solar",
      nome: "Painéis solares adicionais",
      custo: 20,
      energyCost: 0,
      effect: {
        resource: "energy",
        production: 5
      },
      construido: false,
      eficiencia: 100
    },
    {
      id: "greenhouse",
      nome: "Estufa hidropônica",
      custo: 25,
      energyCost: 0,
      effect: {
        resource: "food",
        production: 3
      },
      construido: false,eficiencia: 100
    },
    {
      id: "recycler",
      nome: "Reciclador de água",
      custo: 20,
      energyCost: 0,
      effect: {
        resource: "water",
        production: 3
      },
      construido: false,
      eficiencia: 100
    },
    {
      id: "oxygen",
      nome: "Unidade de oxigênio",
      custo: 25,
      energyCost: 0,
      effect: {
        resource: "oxygen",
        production: 3
      },
      construido: false,
      eficiencia: 100
    },
    {
      id: "shelter",
      nome: "Abrigo reforçado",
      custo: 30,
      energyCost: 0,
      effect: {
        system: "protection",
        value: 10
      },
      construido: false,
      eficiencia: 100
    },
    {
      id: "workshop",
      nome: "Oficina de manutenção",
      custo: 20,
      energyCost: 0,
      effect: {
        system: "repair",
        value: 1
      },
      construido: false,
      eficiencia: 100
    }
  ],

   calcularRecursos: function(recurso) {
        const bonus = this.calcularBonusProducao(recurso.id);

        const producao = Events.calcularProducao(recurso, bonus);
        const consumo = Events.calcularConsumo(recurso);

        return Math.max(
            0,
            Math.min(recurso.max, recurso.current + producao - consumo)
        );
    },

  RecursoAtualizar: function() {
    for (let i = 0; i < Resources.items.length; i++) {
        let recurso = Resources.items[i];

        if (recurso.id === "materials") {
            continue;
        }

        recurso.current = this.calcularRecursos(recurso);
    }
},

  verificarSobrevivencia: function() {
      const recursosVitais = ["water", "oxygen", "food"];
      for (let id of recursosVitais) {
          const recurso = Resources.items.find(
              item => item.id === id
          );
          if (recurso.current <= 0) {
              console.log(`Missão comprometida: falta de ${recurso.nome}.`);
              return false;
          }
      }
      return true;
  },

  finalizarMissao: function(resultado) {
    this.estadoMissao = resultado;
    this.finalizada = true;

    if (resultado === "Vitória") {
        this.resultado = "vitoria";
        console.log("Missão concluída com sucesso!");
    }

    if (resultado === "Derrota") {
        this.resultado = "derrota";
        console.log("Missão encerrada. O astronauta não sobreviveu.");
    }
},

  verificarFimMissao: function() {
    if (!this.verificarSobrevivencia()) {
        this.finalizarMissao("Derrota");
        return true;
    }

    if (this.dia >= this.maxDiasMissao) {
        this.finalizarMissao("Vitória");
        return true;
    }

    return false;
},

  novoDia: function() {
    if (this.estadoMissao !== "Em andamento") {
        return;
    }
    Events.sortearEvento();
    this.atualizarRecursos();
    Events.atualizarEventos();
    if (this.verificarFimMissao()) {
        return;
    }
    this.dia++;
    this.acoesDisponiveis = 2;
    console.log("Dia " + this.dia + " iniciado.");
},

  calcularBonusProducao: function(resourceId) {
    let bonusTotal = 0;

    for (let i = 0; i < this.instalacoes.length; i++) {
        let instalacao = this.instalacoes[i];

        if (instalacao.construido && instalacao.effect) {
            if (instalacao.effect.resource === resourceId) {
                let eficiencia = instalacao.eficiencia / 100;

                bonusTotal += instalacao.effect.production * eficiencia;
            }
        }
    }

    return bonusTotal;
},

  atualizarRecursos: function() {
    this.RecursoAtualizar();
},

  repararInstalacao: function(id) {
    const instalacao = this.instalacoes.find(item => item.id === id);

    if (!instalacao || !instalacao.construido) {
      return "Instalação indisponível.";
    }

    if (instalacao.status !== "damaged") {
      return "Essa instalação não precisa de reparos.";
    }

    const materiais = Resources.items.find(item => item.id === "materials");
    const custoReparo = 10;

    if (materiais.current < custoReparo) {
      return "Materiais insuficientes para o reparo.";
    }

    materiais.current -= custoReparo;

    instalacao.eficiencia = 100;
    instalacao.status = "operational";

    return `${instalacao.nome} foi reparada!`;
  },

   construirInstalacao: function(id) {
    const instalacao = this.instalacoes.find(item => item.id === id);

    if (!instalacao) {
      return "Instalação não encontrada."
    }

    if (instalacao.construido) {
      return "Essa instalação já foi construída.";
    }

    const materiais = Resources.items.find(item => item.id === "materials");

    if (materiais.current < instalacao.custo) {
      return "Materiais insuficientes.";
    }

    materiais.current -= instalacao.custo;

    instalacao.construido = true;
    instalacao.eficiencia = 100;
    instalacao.status = "operational";

    return `${instalacao.nome} construída com sucesso!`;
  },

  reset: function() {
    this.dia = 1;
    this.estadoMissao = "Em andamento";

    this.acoesDisponiveis = 2;
    this.finalizada = false;
    this.resultado = null;

    this.tripulacao = 1;
    this.saudeTripulante = 100;
    this.habitat = 100;
    this.protecao = 60;

    Resources.reset();

    Events.resetar();

    for (let i = 0; i < this.instalacoes.length; i++) {
        this.instalacoes[i].construido = false;
        this.instalacoes[i].eficiencia = 100;
        this.instalacoes[i].status = "operational";
    }
},
};
