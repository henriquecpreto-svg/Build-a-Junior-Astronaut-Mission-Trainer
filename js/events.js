window.Events = {

    eventosAtivos: [],

    modificadores: {
        producaoEnergia: 1,
        consumoAgua: 1,
        producaoAlimentos: 1
    },

    eventos: [
        {
            id: "tempestadePoeira",
            nome: "🌪 Tempestade de poeira",
            descricao: "Uma tempestade de poeira atingiu a região da base.",
            duracao: 2,
            efeitos: {
                producaoEnergia: 0.6
            }
        },
        {
            id: "falhaReciclagem",
            nome: "💧 Falha na reciclagem",
            descricao: "O sistema de reciclagem apresentou uma falha.",
            duracao: 2,
            efeitos: {
                consumoAgua: 1.4
            }
        },
        {
            id: "problemaEstufa",
            nome: "🌱 Problema na estufa",
            descricao: "Uma falha comprometeu a produção de alimentos.",
            duracao: 3,
            efeitos: {
                producaoAlimentos: 0.5
            }
        },
        {
            id: "baixaLuminosidade",
            nome: "🌑 Baixa luminosidade",
            descricao: "A incidência de luz solar está abaixo do esperado.",
            duracao: 1,
            efeitos: {
                producaoEnergia: 0.75
            }
        },
        {
            id: "vazamentoAgua",
            nome: "🚨 Vazamento de água",
            descricao: "Um vazamento provocou perdas na reserva de água.",
            duracao: 1,
            imediato: {
                water: -15
            },
            efeitos: {}
        },
        {
            id: "manutencao",
            nome: "🔧 Manutenção preventiva",
            descricao: "Uma manutenção melhorou o desempenho da energia.",
            duracao: 2,
            efeitos: {
                producaoEnergia: 1.2
            }
        }
    ],

    resetar() {
        this.eventosAtivos = [];

        this.modificadores = {
            producaoEnergia: 1,
            consumoAgua: 1,
            producaoAlimentos: 1
        };
    },

    recalcularModificadores: function() {
    this.modificadores = {
        producaoEnergia: 1,
        consumoAgua: 1,
        producaoAlimentos: 1
    };

    for (let i = 0; i < this.eventosAtivos.length; i++) {
        let efeitos = this.eventosAtivos[i].efeitos;

        this.modificadores.producaoEnergia *= efeitos.producaoEnergia || 1;
        this.modificadores.consumoAgua *= efeitos.consumoAgua || 1;
        this.modificadores.producaoAlimentos *= efeitos.producaoAlimentos || 1;
    }
},

    iniciarEvento(evento) {
        if (!evento) return null;

        if (this.eventosAtivos.some(
            ativo => ativo.id === evento.id
        )) {
            return null;
        }

        const ativo = {
            ...evento,
            diasRestantes: evento.duracao
        };

        this.eventosAtivos.push(ativo);

        if (evento.imediato) {
            Object.entries(evento.imediato).forEach(
                ([id, quantidade]) => {
                    Resources.update(id, quantidade);
                }
            );
        }

        this.recalcularModificadores();

        return ativo;
    },

    atualizarEventos() {
        this.eventosAtivos.forEach(evento => {
            evento.diasRestantes--;
        });

        this.eventosAtivos = this.eventosAtivos.filter(
            evento => evento.diasRestantes > 0
        );

        this.recalcularModificadores();
    },

    sortearEvento(chance = 0.25) {
        if (Math.random() >= chance) return null;

        const disponiveis = this.eventos.filter(evento =>
            !this.eventosAtivos.some(
                ativo => ativo.id === evento.id
            )
        );

        if (!disponiveis.length) return null;

        const indice = Math.floor(
            Math.random() * disponiveis.length
        );

        return this.iniciarEvento(disponiveis[indice]);
    },

    calcularProducao: function(recurso, bonusInstalacao) {
    if (bonusInstalacao === undefined) {
        bonusInstalacao = 0;
    }

    let modificador = 1;

    if (recurso.id === "energy") {
        modificador = this.modificadores.producaoEnergia;
    }

    if (recurso.id === "food") {
        modificador = this.modificadores.producaoAlimentos;
    }

    return (recurso.production + bonusInstalacao) * modificador;
},

    calcularConsumo: function(recurso) {
        let modificador = 1;

        if (recurso.id === "water") {
            modificador = this.modificadores.consumoAgua;
        }

        return recurso.consumption * modificador;
    }
};
