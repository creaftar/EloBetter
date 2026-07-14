import { ProximaSecao } from "./curso";

function inicializarMonoChampion() {
    const lis = document.querySelectorAll(".li-monochampion");
    const nextBtn = document.getElementById("next-step-monochampion");
    const resetBtn = document.getElementById("reset-step-monochampion");
    
    if (lis.length === 0) return;

    // Lendo o localStorage de forma segura após o carregamento da página
    const salvo = localStorage.getItem("monoIndex");
    let currentActiveIndex = salvo !== null ? parseInt(salvo) : -1;
    
    let observer = null;

    // 1. CARREGA O ESTADO SALVO
    if (currentActiveIndex >= 0) {
        for (let i = 0; i <= currentActiveIndex; i++) {
            if (lis[i]) lis[i].classList.add("active");
        }
    } else {
        // Em vez de scroll event + getBoundingClientRect, usamos IntersectionObserver!
        const opcoes = {
            root: null, // usa a viewport do navegador
            rootMargin: "0px 0px -15% 0px", // Equivale ao seu multiplicador de 0.85
            threshold: 0
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && currentActiveIndex === -1) {
                    currentActiveIndex = 0;
                    lis[0].classList.add("active");
                    localStorage.setItem("monoIndex", currentActiveIndex);
                    
                    // Desliga o observer imediatamente após ativar a primeira
                    destruirObserver();
                }
            });
        }, opcoes);

        // Observa apenas a primeira LI
        if (lis[0]) observer.observe(lis[0]);
    }

    function destruirObserver() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    // 2. LISTENERS DOS BOTÕES
    nextBtn.addEventListener("click", () => {
        if (currentActiveIndex === -1) {
            currentActiveIndex = 0;
            lis[0].classList.add("active");
            localStorage.setItem("monoIndex", currentActiveIndex);
            destruirObserver(); // Desliga o observer se clicou antes de scrollar
            return;
        }
        if (currentActiveIndex < lis.length - 1) {
            currentActiveIndex++;
            lis[currentActiveIndex].classList.add("active");
            localStorage.setItem("monoIndex", currentActiveIndex);
        } else {
            ProximaSecao("trintaquarenta");
        }
    });

    resetBtn.addEventListener("click", () => {
        lis.forEach(li => li.classList.remove("active"));
        currentActiveIndex = -1;
        localStorage.setItem("monoIndex", currentActiveIndex);

        // Se resetou, recria o observer de scroll de forma performática
        if (!observer && lis[0]) {
            const opcoes = {
                root: null,
                rootMargin: "0px 0px -15% 0px",
                threshold: 0
            };
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && currentActiveIndex === -1) {
                        currentActiveIndex = 0;
                        lis[0].classList.add("active");
                        localStorage.setItem("monoIndex", currentActiveIndex);
                        destruirObserver();
                    }
                });
            }, opcoes);
            observer.observe(lis[0]);
        }
    });
}

// Inicialização não bloqueante na thread principal
if ('requestIdleCallback' in window) {
    requestIdleCallback(inicializarMonoChampion);
} else {
    window.addEventListener('load', inicializarMonoChampion);
}