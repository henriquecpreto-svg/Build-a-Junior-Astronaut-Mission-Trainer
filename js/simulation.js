function calcularRecursos(){
    const quantidade = items.production + item.consumption;
    const novoValor = item.current + quantidade
    return(novoValor)
}
const novosRecursos = calcularRecursos(items);
console.log(novosRecursos);

function RecursoAtualizar(){
items.energia.max = items.energia.production - items.energia.consumption;
items.agua.max = items.agua.production - items.agua.consumption;
items.material.max = items.oxigenio.production - items.oxigenio.consumption;
}

function verificarSobrevivencia() {
    if (agua <= 0){
        console.log("Falta de Água")
    }
    else if (agua <=50){
        console.log("Á água está acabando")
    } else {
        console.log("Quantidade de água consideravel")
    }

    if (enrgia <= 0){
        console.log("Falta de energia")
    }
    else if (energia <=50){
        console.log("A enrgia está acabando")
    } else {
        console.log("Quantidade de energia consideravel")
    }

     if (oxigenio <= 0){
        console.log("Falta de oxigenio")
    }
    else if (oxigenio <=50){
        console.log("O oxigenio está acabando")
    } else {
        console.log("Quantidade de oxigenio consideravel")
    }
}

let dia = 1;
function novoDia() {
    dia++;
    RecursosAtualizar()
    verificarSobrevivencia()
}

const instalacoes = [
  {
    id: "solar",
    name: "Painéis solares adicionais",
    materialCost: 20,
    energyCost: 0,
    effect: {
      resource: "energy",
      production: 5
    },
    built: false,
    efficiency: 100
  },
  {
    id: "greenhouse",
    name: "Estufa hidropônica",
    materialCost: 25,
    energyCost: 0,
    effect: {
      resource: "food",
      production: 3
    },
    built: false,efficiency: 100
  },
  {
    id: "recycler",
    name: "Reciclador de água",
    materialCost: 20,
    energyCost: 0,
    effect: {
      resource: "water",
      production: 3
    },
    built: false,
    efficiency: 100
  },
  {
    id: "oxygen",
    name: "Unidade de oxigênio",
    materialCost: 25,
    energyCost: 0,
    effect: {
      resource: "oxygen",
      production: 3
    },
    built: false,
    efficiency: 100
  },
  {
    id: "shelter",
    name: "Abrigo reforçado",
    materialCost: 30,
    energyCost: 0,
    effect: {
      system: "protection",
      value: 10
    },
    built: false,
    efficiency: 100
  }
  {
    id: "workshop",
    name: "Oficina de manutenção",
    materialCost: 20,
    energyCost: 0,
    effect: {
      system: "repair",
      value: 1
    },
    built: false,
    efficiency: 100
  }
];

function repararInstalacao(id) {
  const instalacao = instalacoes.find(item.id === id);

  if (!instalacao || !instalacao.built) {
    return "Instalação indisponível.";
  }

  if (instalacao.status !== "damaged") {
    return "Essa instalação não precisa de reparos.";
  }

  const materiais = items.find(item.id === "materials");
  const custoReparo = 10;

  if (materiais.current < custoReparo) {
    return "Materiais insuficientes para o reparo.";
  }

  materiais.current -= custoReparo;

  instalacao.efficiency = 100;
  instalacao.status = "operational";

  return `${instalacao.name} foi reparada!`;
}

function calcularBonusProducao(resourceId) {
  return instalacoes.reduce((total, instalacao) => {
    if (!instalacao.built || !instalacao.effect) {
      return total;
    }

    if (instalacao.effect.resource !== resourceId) {
      return total;
    }

    const eficiencia = instalacao.efficiency ?? 100;

    return total +
      instalacao.effect.production * (eficiencia / 100);
  }, 0);
}