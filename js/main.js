function instrucoes() {
    document.getElementById('cards').classList.remove('hidden');
    document.getElementById('botao-iniciar').classList.add('hidden');
    document.getElementById('botao-comojogar').classList.add('hidden');
    document.getElementById('botao-sobre').classList.add('hidden');
    document.getElementById('cards').classList.remove('hidden');
}

function fecharInstrucoes() {
    document.getElementById('cards').classList.add('hidden')
    document.getElementById('botao-iniciar').classList.remove('hidden');
    document.getElementById('botao-comojogar').classList.remove('hidden');
    document.getElementById('botao-sobre').classList.remove('hidden');
}

function sobreProjeto() {
    document.getElementById('sobreprojeto').classList.remove('hidden')
}

function fecharSobre() {
    document.getElementById('sobreprojeto').classList.add('hidden')
}