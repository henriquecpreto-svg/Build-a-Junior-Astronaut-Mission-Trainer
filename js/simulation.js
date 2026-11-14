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
    elif (agua <=50){
        console.log("Á água está acabando")
    }else{
        console.log("Quantidade de água consideravel")
    }

    if (enrgia <= 0){
        console.log("Falta de energia")
    }
    elif (energia <=50){
        console.log("A enrgia está acabando")
    }else{
        console.log("Quantidade de energia consideravel")
    }

     if (oxigenio <= 0){
        console.log("Falta de oxigenio")
    }
    elif (oxigenio <=50){
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
