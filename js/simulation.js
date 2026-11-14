function RecursoAtualizar(){
items.energia.max = items.energia.production - items.energia.consumption;
items.agua.max = items.agua.production - items.agua.consumption;
items.material.max = items.oxigenio.production - items.oxigenio.consumption;
}

function verificarSobrevivencia() {
    if (Água <= 0){
        console.log("")
    }
    if (Energia <= 0){
        cosole.log("")
    }
    if(Oxigenio <= 0){
        cosole.log("")
    }
}

let dia = 1;
function novoDia() {
    dia++;
    RecursosAtualizar()
    verificarSobrevi
}