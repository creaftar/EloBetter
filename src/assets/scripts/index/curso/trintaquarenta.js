import { ProximaSecao } from "./curso";

function inicializarTrintaQuarenta() {
    const nextBtn = document.getElementById("next-step-trintaquarenta");
    
    // Proteção essencial: só adiciona o evento se o botão realmente existir na tela
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            ProximaSecao("mentalidade");
        });
    }
}

// Inicializa sem bloquear a renderização inicial do topo da página
if ('requestIdleCallback' in window) {
    requestIdleCallback(inicializarTrintaQuarenta);
} else {
    window.addEventListener('load', inicializarTrintaQuarenta);
}