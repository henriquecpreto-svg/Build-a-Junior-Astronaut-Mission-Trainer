const consumoTripulante = {
    oxigenio: 13,
    agua: 10,
    alimentos: 10
};

const status = {
    energia: 100,
    agua: 100,
    oxigenio: 100,
    alimentos: 100,
    materiais: 60,
    protecao: 60,
    condicaoDaTripulacao: 100,
    integridadeDoHabitat: 100
};

const eventosAtivos = [];

const modificadores = {
    producaoEnergia: 1,
    consumoAgua: 1,
    producaoAlimentos: 1
}

function consumoDiario(status, consumoTripulante) {
    for (let recurso in consumoTripulante) {
        status[recurso] -= consumoTripulante[recurso];
    }
}

const eventos = [
    {
        id: "tempestadePoeira",
        nome: "Tempestade de poeira",
        descricao: "Uma tempestade de poeira atingiu a região da base.",
        duracao: 2,
        efeitos: {
            producaoEnergia: 0.60
        }
    },
    {
        id: "falhaReciclagem",
        nome: "Falha na reciclagem",
        descricao: "O sistema de reciclagem de água apresentou uma falha.",
        duracao: 2,
        efeitos: {
            consumoAgua: 1.40
        }
    },
    {
        id: "problemaEstufa",
        nome: "Problema na estufa",
        descricao: "Uma falha comprometeu a produção de alimentos.",
        duracao: 3,
        efeitos: {
            producaoAlimentos: 0.50
        }
    },
    {
        id: "baixaLuminosidade",
        nome: "Baixa luminosidade",
        descricao: "A incidência de luz solar está abaixo do esperado.",
        duracao: 1,
        efeitos: {
            energia: 0.75
        }
    },
    {
        id: "vazamentoAgua",
        nome: "Vazamento de água",
        descricao: "Um vazamento provocou perdas na reserva de água.",
        duracao: 1,
        efeitos: {
            agua: -15
        }
    },
    {
        id: "manutencao",
        nome: "Manutenção preventiva",
        descricao: "Uma manutenção melhorou o desempenho do sistema de energia.",
        duracao: 2,
        efeitos: {
            producaoEnergia: 1.20
        }
    }
];

function aplicarEvento(evento, status) {
    for (let efeito in evento.efeitos) {
        if (efeito in status) {
            status[efeito] += evento.efeitos[efeito];
        }
    }
}

function iniciarEvento(evento, status) {
    if (eventosAtivos.some(ativo => ativo.id === evento.id)) {
        return;
    }
    eventosAtivos.push({
        ...evento,
        diasRestantes: evento.duracao
    });
    aplicarEvento(evento, status);
    recalcularModificadores();
}

function atualizarEventos() {
    for (let i = eventosAtivos.length - 1; i >= 0; i--) {
        eventosAtivos[i].diasRestantes--;
        if (eventosAtivos[i].diasRestantes <= 0) {
            eventosAtivos.splice(i, 1);
        }
    }
    recalcularModificadores();
}

function resetarModificadores() {
    modificadores.producaoEnergia = 1;
    modificadores.consumoAgua = 1;
    modificadores.producaoAlimentos = 1;
}

function sortearEvento(chanceEvento) {
    const numeroAleatorio = Math.random();
    if (numeroAleatorio >= chanceEvento) {
        return null;
    }
    const eventosDisponiveis = eventos.filter(evento =>
        !eventosAtivos.some(
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
}

