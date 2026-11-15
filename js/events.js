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
            descricao: "O sistema de reciclagem de água apresentou uma falha.",
            duracao: 2,
            efeitos: {
                consumoAgua: 1.4
            }
        },
        {
            id: "problemaEstufa",
            nome: "🌾 Problema na estufa",
            descricao: "Uma falha comprometeu a produção de alimentos.",
            duracao: 3,
            efeitos: {
                producaoAlimentos: 0.5
            }
        },
        {
            id: "baixaLuminosidade",
            nome: "Baixa luminosidade",
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
            efeitos: {
                water: -15
            }
        },
        {
            id: "manutencao",
            nome: "🔧 Manutenção preventiva",
            descricao: "Uma manutenção melhorou o desempenho do sistema de energia.",
            duracao: 2,
            efeitos: {
                producaoEnergia: 1.2
            }
        }
    ],

    resetarModificadores() {
        this.eventosAtivos = [];
        this.modificadores();
    },

    recalcularModificadores() {
        this.resetarModificadores();

        this.eventosAtivos.forEach(evento => {
            for (let efeito in evento.efeitos) {
                if (efeito in this.modificadores) {
                    this.modificadores[efeito] *= evento.efeitos[efeito];
                }
            }
        });
    },

    aplicarEvento(evento) {
        for (let efeito in evento.efeitos) {
            const recurso = Resources.items.find(
                item => item.id === efeito
            );

            if (recurso) {
                recurso.current = Math.max(
                    0,
                    Math.min(recurso.max, recurso.current + evento.efeitos[efeito])
                );
            }
        }
    },

    iniciarEvento(evento) {
        if (this.eventosAtivos.some(
            ativo => ativo.id === evento.id
        )) {
            return null;
        }

        const eventoAtivo = {
            ...evento,
            diasRestantes: evento.duracao
        };

        this.eventosAtivos.push(eventoAtivo);
        this.aplicarEvento(evento);
        this.recalcularModificadores();

        return eventoAtivo;
    },

    atualizarEventos() {
        for (let i = this.eventosAtivos.length - 1; i >= 0; i--) {
            this.eventosAtivos[i].diasRestantes--;

            if (this.eventosAtivos[i].diasRestantes <= 0) {
                this.eventosAtivos.splice(i, 1);
            }
        }

        this.recalcularModificadores();
    },

    sortearEvento(chanceEvento) {
        if (Math.random() >= chanceEvento) {
            return null;
        }

        const eventosDisponiveis = this.eventos.filter(
            evento => !this.eventosAtivos.some(
                ativo => ativo.id === evento.id
            )
        );

        if (eventosDisponiveis.length === 0) {
            return null;
        }

        const indiceAleatorio = Math.floor(
            Math.random() * eventosDisponiveis.length
        );

        return eventosDisponiveis[indiceAleatorio];
    },

    gerarEventoAleatorio(chanceEvento) {
        const evento = this.sortearEvento(chanceEvento);

        if (!evento) {
            return null;
        }

        return this.iniciarEvento(evento);
    },

    calcularProducao(recurso) {
        let modificador = 1;

        if (recurso.id === "energy") {
            modificador = this.modificadores.producaoEnergia;
        }

        if (recurso.id === "food") {
            modificador = this.modificadores.producaoAlimentos;
        }

        return recurso.production * modificador;
    },

    calcularConsumo(recurso) {
        let modificador = 1;

        if (recurso.id === "water") {
            modificador = this.modificadores.consumoAgua;
        }

        return recurso.consumption * modificador;
    }
};
