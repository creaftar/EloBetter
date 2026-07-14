import { ProximaSecao } from "./curso";

function inicializarMentalidade() {
    const container = document.getElementById("traducao-mentalidade");
    if (!container) return; // Proteção caso o componente mude de página

    const t = container.dataset.translations ? JSON.parse(container.dataset.translations) : {};
    const textos = [...t];

    const quadrados = document.querySelectorAll(".quadrado-mentalidade");
    const nextBtn = document.getElementById("next-step-mentalidade");
    const resetBtn = document.getElementById("reset-step-mentalidade");

    let _estaDigitando = false; 

    // 1. CARREGA O PROGRESSO APÓS A PÁGINA ESTAR OCIOSA
    CarregarProgressoSalvo();

    // 2. ADICIONA OS LISTENERS
    quadrados.forEach((quadrado, i) => {
        quadrado.addEventListener("click", () => {
            if (_estaDigitando) return; 

            if (quadrado.classList.contains("mentalidade-ativa") && i !== quadrados.length - 1)
                ProximoQuadrado(i, quadrado);
            else if (quadrado.classList.contains("mentalidade-ativa") && i == quadrados.length - 1) {
                ProximaSecao("aviso-mentalidade");
                quadrado.classList.remove("mentalidade-ativa");
                localStorage.setItem("indiceMentalidade", i + 1); 
            }
        });
    });

    resetBtn.addEventListener("click", () => {
        if (!_estaDigitando) {
            ResetarMentalidade();
        }
    });

    nextBtn.addEventListener("click", () => {
        ProximaSecao("quantidadexqualidade");
    });

    // --- Suas funções internas mantêm o mesmo escopo lexical movendo-as para dentro ou referenciando-as ---
    function CarregarProgressoSalvo() {
        const indiceSalvo = localStorage.getItem("indiceMentalidade");
        if (indiceSalvo !== null) {
            const indiceInt = parseInt(indiceSalvo);
            quadrados[0].classList.remove("mentalidade-ativa");
            for (let i = 1; i <= indiceInt; i++) {
                if (quadrados[i]) {
                    const pEl = quadrados[i].querySelector(".texto-quadrado-mentalidade");
                    if (pEl && textos[i]) pEl.innerHTML = textos[i];
                }
            }
            if (indiceInt < quadrados.length) {
                quadrados[indiceInt].classList.add("mentalidade-ativa");
            }
        }
    }

    async function ProximoQuadrado(i, quadrado) {
        const proximoIndice = i + 1;
        const pEl = quadrados[proximoIndice].querySelector(".texto-quadrado-mentalidade");
        GerarLetras(proximoIndice, pEl);
        quadrado.classList.remove("mentalidade-ativa");
        quadrados[proximoIndice].classList.add("mentalidade-ativa");
        quadrados[proximoIndice].scrollIntoView({ behavior: 'smooth', block: 'center' });
        localStorage.setItem("indiceMentalidade", proximoIndice);
    }

    function GerarLetras(i, pEl) {
        let letrasDigitadas = 0;
        _estaDigitando = true;
        resetBtn.classList.add("disabled");
        resetBtn.disabled = true; 

        function digitar() {
            if (letrasDigitadas < textos[i].length) {
                pEl.innerHTML = textos[i].slice(0, letrasDigitadas + 1);
                letrasDigitadas++;
                setTimeout(digitar, 20);
            } else {
                _estaDigitando = false;
                resetBtn.classList.remove("disabled");
                resetBtn.disabled = false;
            }
        }
        digitar();
    }

    function ResetarMentalidade() {
        const ativo = document.querySelector(".mentalidade-ativa");
        if (ativo) ativo.classList.remove("mentalidade-ativa");
        quadrados[0].classList.add("mentalidade-ativa");
        quadrados.forEach((quadrado) => {
            const pEl = quadrado.querySelector(".texto-quadrado-mentalidade");
            if (pEl) pEl.textContent = "";
        });
        localStorage.removeItem("indiceMentalidade");
    }
}

// GATILHO DE ALTA PERFORMANCE (Ignora a linha de frente do Lighthouse)
if ('requestIdleCallback' in window) {
    requestIdleCallback(inicializarMentalidade);
} else {
    window.addEventListener('load', inicializarMentalidade);
}