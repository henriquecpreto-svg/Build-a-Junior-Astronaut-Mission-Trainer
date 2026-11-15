window.Simulation = {  

  dia: 1,
  maxDiasMissao: 30,
  estadoMissao: "Em andamento",
  acoesDisponiveis: 2,
  finalizada: false,
  resultado: null,

  saudeTripulante: 100,
  habitat: 100,
  protecao: 60,

  instalacoes: [
    {
      id: "solar",
      nome: "Painéis solares adicionais",
      descricao: "Aumentam a produção diária de energia.",
      custo: 20,
      energyCost: 0,
      effect: {
        resource: "energy",
        production: 5
      },
      construido: false,
      status: "operational",
      eficiencia: 100
    },
    {
      id: "greenhouse",
      nome: "Estufa hidropônica",
      descricao: "Aumenta a produção diária de alimentos.",
      custo: 25,
      energyCost: 0,
      effect: {
        resource: "food",
        production: 5
      },
      construido: false,
      status: "operational",
      eficiencia: 100
    },
    {
      id: "recycler",
      nome: "Reciclador de água",
      descricao: "Aumenta a produção diária de água.",
      custo: 20,
      energyCost: 0,
      effect: {
        resource: "water",
        production: 5
      },
      construido: false,
      status: "operational",
      eficiencia: 100
    },
    {
      id: "oxygen",
      nome: "Unidade de oxigênio",
      descricao: "Aumenta a produção diária de oxigênio.",
      custo: 25,
      energyCost: 0,
      effect: {
        resource: "oxygen",
        production: 3
      },
      construido: false,
      status: "operational",
      eficiencia: 100
    },
    {
      id: "shelter",
      nome: "Abrigo reforçado",
      descricao: "Aumenta a proteção da base contra ameaças externas.",
      custo: 30,
      energyCost: 0,
      effect: {
        system: "protection",
        status: "operational",
        value: 10
      },
      construido: false,
      eficiencia: 100
    },
    {
      id: "workshop",
      nome: "Oficina de manutenção",
      descricao: "Permite reparar o habitat e instalações danificadas.",
      custo: 20,
      energyCost: 0,
      effect: {
        system: "repair",
        value: 1
      },
      construido: false,
      status: "operational",
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
    if (this.saudeTripulante <= 0) {
        console.log("O astronauta não sobreviveu.");
        return false;
    }

    if (this.habitat <= 0) {
        console.log("O habitat foi destruído.");
        return false;
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
        return [];
    }

    const relatorio = [];

    this.atualizarRecursos();
    Events.atualizarEventos();
    this.atualizarSaude();

    relatorio.push(`📅 Fim do Dia ${this.dia}. Produção e consumo processados.`);

    if (this.verificarFimMissao()) {
        if (this.resultado === "vitoria") {
            relatorio.push("🏆 Todos os 30 dias da missão foram concluídos!");
        } else {
            relatorio.push("🚨 Condições críticas atingidas. A missão foi encerrada.");
        }
        return relatorio;
    }

    const eventoSorteado = Events.sortearEvento();
    if (eventoSorteado) {
        relatorio.push(`${eventoSorteado.nome}: ${eventoSorteado.descricao}`);
    } else {
        relatorio.push("✅ Nenhum imprevisto ocorreu hoje.");
    }

    this.dia++;
    this.acoesDisponiveis = 2;

    return relatorio;
},

proximoDia: function() {
    return this.novoDia();
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

    const oficina = this.instalacoes.find(item => item.id === "workshop" && item.construido);

    if (!oficina) {
      return "Você precisa construir a oficina primeiro.";
    }

    if (!instalacao || !instalacao.construido) {
      return "Instalação indisponível.";
    }

    if (instalacao.status !== "damaged") {
      return "Essa instalação não precisa de reparos.";
    }

    const materiais = Resources.get("materials");

    if (!materiais) {
        return "Recurso de materiais não encontrado.";
    }
    const custoReparo = 10;

    if (materiais.current < custoReparo) {
      return "Materiais insuficientes para o reparo.";
    }
    if (this.acoesDisponiveis <= 0) {
    return "Você não possui mais ações disponíveis hoje.";
    }

    materiais.current -= custoReparo;

    instalacao.eficiencia = 100;
    instalacao.status = "operational";
    this.acoesDisponiveis--;

    return `${instalacao.nome} foi reparada!`;
  },

  repararHabitat: function() {
    if (this.acoesDisponiveis <= 0) {
        return "Você não possui mais ações disponíveis hoje.";
    }

    const oficina = this.instalacoes.find(
        item => item.id === "workshop" && item.construido
    );

    if (!oficina) {
        return "Você precisa construir a oficina primeiro.";
    }

    if (this.habitat >= 100) {
        return "O habitat não precisa de reparos.";
    }

    const materiais = Resources.get("materials");
    const custo = 10;

    if (!materiais || materiais.current < custo) {
        return "Materiais insuficientes.";
    }

    materiais.current -= custo;

    this.habitat = Math.min(100, this.habitat + 25);

    this.acoesDisponiveis--;

    return "Habitat reparado com sucesso!";
  },

  receberDanoHabitat: function(dano) {
    const reducao = this.protecao / 100;
    const danoFinal = dano * (1 - reducao);

    this.habitat = Math.max(
      0,
      this.habitat - danoFinal
    );
  },

   construirInstalacao: function(id) {
    const instalacao = this.instalacoes.find(item => item.id === id);

    if (!instalacao) {
      return "Instalação não encontrada."
    }

    if (instalacao.construido) {
      return "Essa instalação já foi construída.";
    }

    const materiais = Resources.get("materials");

    if (!materiais) {
        return "Recurso de materiais não encontrado.";
    }

    if (materiais.current < instalacao.custo) {
        return "Materiais insuficientes.";
    }

    if (this.acoesDisponiveis <= 0) {
    return "Você não possui mais ações disponíveis hoje.";
    }

    materiais.current -= instalacao.custo;

    instalacao.construido = true;
    instalacao.eficiencia = 100;
    instalacao.status = "operational";
    this.acoesDisponiveis--;
    if (instalacao.effect.system === "protection") {
    this.protecao += instalacao.effect.value;
    }

    return `${instalacao.nome} construída com sucesso!`;
    
  },

  construir: function(id) {
    return this.construirInstalacao(id);
},

atualizarSaude: function() {
    const recursosVitais = ["water", "oxygen", "food"];

    for (let i = 0; i < recursosVitais.length; i++) {
        const recurso = Resources.get(recursosVitais[i]);

        if (recurso && recurso.current <= 10) {
            this.saudeTripulante -= 10;
        }
    }

    this.saudeTripulante = Math.max(0, this.saudeTripulante);
},

  reset: function() {
    this.dia = 1;
    this.estadoMissao = "Em andamento";

    this.acoesDisponiveis = 2;
    this.finalizada = false;
    this.resultado = null;

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
