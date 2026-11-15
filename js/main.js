document.addEventListener("DOMContentLoaded", () => {

    const $ = id => document.getElementById(id);
    const menu = document.querySelector(".conteiner-all");
    const dashboard = $("dashboard");
    const botaoIniciar = $("botao-iniciar");
    const botaoProximoDia = $("botao-proximo-dia");
    const botaoVoltar = $("botao-voltar");

    let ultimoRelatorio = [];

    window.instrucoes = function() {
        $("cards").classList.remove("hidden");
        $("botao-iniciar").classList.add("hidden");
        $("botao-comojogar").classList.add("hidden");
        $("botao-sobre").classList.add("hidden");
    };

    window.fecharInstrucoes = function() {
        $("cards").classList.add("hidden");
        $("botao-iniciar").classList.remove("hidden");
        $("botao-comojogar").classList.remove("hidden");
        $("botao-sobre").classList.remove("hidden");
    };

    window.sobreProjeto = function() {
    $("sobreprojeto").classList.remove("hidden");
    $("botao-iniciar").classList.add("hidden");
    $("botao-comojogar").classList.add("hidden");
    $("botao-sobre").classList.add("hidden");
    };

    window.fecharSobre = function() {
    $("sobreprojeto").classList.add("hidden");
    $("botao-iniciar").classList.remove("hidden");
    $("botao-comojogar").classList.remove("hidden");
    $("botao-sobre").classList.remove("hidden");
    };

    botaoIniciar.addEventListener("click", () => {
        Simulation.reset();
        ultimoRelatorio = [
            "🚀 MISSÃO INICIADA!",
            "A base marciana está pronta.",
            "Você possui duas ações administrativas por dia.",
            "Gerencie seus recursos e se mantenha vivo."
        ];

        menu.classList.add("hidden");
        dashboard.classList.remove("hidden");
        botaoProximoDia.disabled = false;
        renderizarDashboard();
    });

    function renderizarRecursos() {
        const container = $("status-recursos");
        container.innerHTML = "";
        Resources.items.forEach(recurso => {
            const percentual = Math.max(
                0,
                Math.min(
                    100,
                    (recurso.current / recurso.max) * 100
                )
            );
            const card = document.createElement("div");
            card.className = "resource-card";
            card.innerHTML = `
                <h3>${recurso.icon} ${recurso.name}</h3>
                <p>${recurso.current.toFixed(1)} / ${recurso.max} ${recurso.unit}</p>

                <div class="progress">
                    <div
                        class="progress-fill"
                        style="
                            width: ${percentual}%; 
                            background-color: ${recurso.color};"
                    ></div>
                </div>
            `;
            container.appendChild(card);
        });

        const indicadores = [
            {
                nome: "👨‍🚀 Saúde do astronauta",
                valor: Simulation.saudeTripulante
            },
            {
                nome: "🏠 Integridade do habitat",
                valor: Simulation.habitat
            },
            {
                nome: "🛡️ Proteção",
                valor: Simulation.protecao
            }
        ];

        indicadores.forEach(item => {

            const card = document.createElement("div");

            card.className = "resource-card";

            card.innerHTML = `
                <h3>${item.nome}</h3>

                <p>${item.valor.toFixed(0)}%</p>

                <div class="progress">
                    <div
                        class="progress-fill"
                        style="width: ${item.valor}%"
                    ></div>
                </div>
            `;

            container.appendChild(card);

        });

    }

    function renderizarInstalacoes() {

        const container = $("lista-instalacoes");

        container.innerHTML = "";

        Simulation.instalacoes.forEach(instalacao => {

            const card = document.createElement("article");

            card.className = "installation-card";

            card.innerHTML = `
                <h3>${instalacao.nome}</h3>

                <p>${instalacao.descricao}</p>

                <p>
                    Custo: ${instalacao.custo} materiais
                </p>

                <p>
                    Eficiência: ${instalacao.eficiencia}%
                </p>

                <button
                    data-construir="${instalacao.id}"
                    ${instalacao.construido ? "disabled" : ""}
                >
                    ${instalacao.construido
                        ? "Construída"
                        : "Construir"}
                </button>

                ${instalacao.construido
                    ? `<button data-reparar="${instalacao.id}">
                        Reparar instalação
                       </button>`
                    : ""}
            `;

            container.appendChild(card);

        });

        const oficina = Simulation.instalacoes.find(
            item => item.id === "workshop"
        );

        if (oficina && oficina.construido) {
            const cardReparo = document.createElement("article");
            cardReparo.className = "installation-card";

            cardReparo.innerHTML = `
                <h3>🔧 Manutenção do Habitat</h3>
                <p>Restaura +25% da integridade do habitat.</p>
                <p>Custo: 10 materiais</p>
                <p>Integridade atual: ${Simulation.habitat.toFixed(0)}%</p>
                <button id="botao-reparar-habitat" ${Simulation.habitat >= 100 ? "disabled" : ""}>
                    ${Simulation.habitat >= 100 ? "Habitat íntegro" : "Reparar habitat"}
                </button>
            `;

            cardReparo
                .querySelector("#botao-reparar-habitat")
                .addEventListener("click", () => {
                    mostrarResultado(Simulation.repararHabitat());
                });

            container.appendChild(cardReparo);
        }

        container.querySelectorAll("[data-construir]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const resultado = Simulation.construirInstalacao(
                    button.dataset.construir
                );

                mostrarResultado(resultado);

            });

        });

        container.querySelectorAll("[data-reparar]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const resultado = Simulation.repararInstalacao(
                    button.dataset.reparar
                );

                mostrarResultado(resultado);

            });

        });

    }

    function renderizarEventos() {

        const container = $("eventos-ativos");

        container.innerHTML = "";

        if (Events.eventosAtivos.length === 0) {

            container.textContent = "Nenhum evento ativo.";

            return;

        }

        Events.eventosAtivos.forEach(evento => {

            const p = document.createElement("p");

        p.textContent =
        `${evento.nome} (${evento.diasRestantes} dia(s) restante(s)) — ${evento.descricao}`;

            container.appendChild(p);

        });

    }
    
    function renderizarRelatorio() {

        const container = $("relatorio");

        container.innerHTML = "";

        ultimoRelatorio.forEach(item => {

            const p = document.createElement("p");

            p.textContent = item;

            container.appendChild(p);

        });

    }

    function mostrarResultado(mensagem) {

        alert(mensagem);

        renderizarDashboard();

    }

    function renderizarDashboard() {

        $("dia").textContent = Simulation.dia;

        renderizarRecursos();

        renderizarInstalacoes();

        renderizarEventos();

        renderizarRelatorio();

        Education.renderizar();

        const statusAntigo = $("status-acoes");

        if (statusAntigo) {
            statusAntigo.remove();
        }

        const acoes = document.createElement("p");

        acoes.id = "status-acoes";

        acoes.textContent =
            `Ações restantes hoje: ${Simulation.acoesDisponiveis}`;

        $("status-recursos").after(acoes);

    }

    botaoProximoDia.addEventListener("click", () => {

        if (Simulation.finalizada) return;

        const confirmar = confirm(
            "Deseja encerrar as ações do dia e avançar?"
        );

        if (!confirmar) return;

        ultimoRelatorio = Simulation.novoDia() || [];

        renderizarDashboard();

        if (Simulation.finalizada) {

            botaoProximoDia.disabled = true;

            if (Simulation.resultado === "vitoria") {

                alert(
                    "🏆 PARABÉNS! Você concluiu a missão!"
                );

            } else {

                alert(
                    "🚨 MISSÃO ENCERRADA! A base não conseguiu manter as condições necessárias."
                );

            }

        }

    });

    botaoVoltar.addEventListener("click", () => {

        const confirmar = confirm(
            "Deseja sair da missão? Todo o progresso será perdido."
        );

        if (!confirmar) return;

        Simulation.reset();

        ultimoRelatorio = [];

        botaoProximoDia.disabled = false;

        dashboard.classList.add("hidden");

        menu.classList.remove("hidden");

    });

});
