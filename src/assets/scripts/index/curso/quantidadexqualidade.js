function inicializarGrafico() {
    const containerPrincipal = document.getElementById('quantidadexqualidade');
    const boxDetalhe = document.getElementById('detalheElo');
    const container = document.getElementById("traducao-grafico");
    
    if (!containerPrincipal || !boxDetalhe || !container) return;

    const t = container.dataset.translations ? JSON.parse(container.dataset.translations) : {};
    const t_padrao = container.dataset.translationspadrao ? JSON.parse(container.dataset.translationspadrao) : "";

    const dadosReais = {
        mestre:     [100, 95, 55, 20, 5, 0, 0, 0],
        diamante:   [95, 90, 75, 45, 25, 10, 0, 0],
        esmeralda:  [90, 85, 80, 65, 40, 20, 10, 5],
        ouro:       [80, 78, 75, 70, 55, 45, 35, 25],
        prata:      [70, 68, 66, 64, 60, 55, 50, 45],
        ferro:      [55, 54, 53, 52, 51, 50, 48, 46]
    };

    const descricoesElo = {...t};

    // Otimização matemática simples (evita recriar escopos internos)
    const gerarCaminho = (valores) => {
        const largura = 500;
        const alturaUtil = 260; 
        const topoMargem = 30;
        const totalItens = valores.length - 1;
        
        return valores.map((valor, idx) => {
            const x = (idx / totalItens) * largura;
            const y = (alturaUtil - ((valor / 100) * alturaUtil)) + topoMargem;
            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    // Inicializa os desenhos das linhas
    Object.keys(dadosReais).forEach((elo) => {
        const path = document.getElementById(`linha${elo.charAt(0).toUpperCase() + elo.slice(1)}`);
        if (path) path.setAttribute('d', gerarCaminho(dadosReais[elo]));
    });

    // Cacheamos as seleções para evitar querySelector repetidos no mousemove
    const todasAsLinhas = containerPrincipal.querySelectorAll('.wrapperGrafico path');
    const todosItensLegenda = containerPrincipal.querySelectorAll('.wrapperGrafico .item-legenda');

    const ativarFoco = (elo) => {
        containerPrincipal.classList.add('tem-foco');
        
        // Remove classes anteriores com laços eficientes
        for (let i = 0; i < todasAsLinhas.length; i++) {
            const linha = todasAsLinhas[i];
            linha.classList.toggle('focado', linha.getAttribute('data-elo') === elo);
        }
        
        for (let i = 0; i < todosItensLegenda.length; i++) {
            const legenda = todosItensLegenda[i];
            legenda.classList.toggle('focado', legenda.getAttribute('data-elo') === elo);
        }

        boxDetalhe.innerHTML = descricoesElo[elo] || "";
    };

    const desativarFoco = () => {
        containerPrincipal.classList.remove('tem-foco');
        for (let i = 0; i < todasAsLinhas.length; i++) todasAsLinhas[i].classList.remove('focado');
        for (let i = 0; i < todosItensLegenda.length; i++) todosItensLegenda[i].classList.remove('focado');
        boxDetalhe.innerHTML = t_padrao;
    };

    // DELEGAÇÃO DE EVENTOS: Apenas 2 listeners no container pai em vez de 24 listeners individuais!
    containerPrincipal.addEventListener('mouseover', (e) => {
        const alvo = e.target.closest('path, .item-legenda');
        if (!alvo) return;
        
        const elo = alvo.getAttribute('data-elo');
        if (elo) ativarFoco(elo);
    });

    containerPrincipal.addEventListener('mouseout', (e) => {
        const alvo = e.target.closest('path, .item-legenda');
        if (alvo) desativarFoco();
    });

    // Animação com IntersectionObserver
    const observador = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            for (let i = 0; i < todasAsLinhas.length; i++) {
                todasAsLinhas[i].classList.add('animar');
            }
            observador.unobserve(containerPrincipal);
        }
    }, { 
        rootMargin: "-20% 0px -20% 0px", 
        threshold: 0.5 
    });

    observador.observe(containerPrincipal);
}

// Inicialização segura
if ('requestIdleCallback' in window) {
    requestIdleCallback(inicializarGrafico);
} else {
    window.addEventListener('load', inicializarGrafico);
}