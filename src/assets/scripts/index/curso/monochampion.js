const lis = document.querySelectorAll(".li-monochampion");
const nextBtn = document.getElementById("next-step-monochampion");
const resetBtn = document.getElementById("reset-step-monochampion");

let currentActiveIndex = parseInt(localStorage.getItem("monoIndex")) ?? -1;
if (currentActiveIndex >= 0) {
    for (let i = 0; i <= currentActiveIndex; i++) {
        if (lis[i]) lis[i].classList.add("active");
    }
} else {
    window.addEventListener("scroll", VerificarScroll);
    VerificarScroll();
}

nextBtn.addEventListener("click", () => {
    if (currentActiveIndex === -1) {
        currentActiveIndex = 0;
        lis[0].classList.add("active");
        localStorage.setItem("monoIndex", currentActiveIndex);
        window.removeEventListener("scroll", VerificarScroll); // Desliga o scroll se clicou antes
        return;
    }
    if (currentActiveIndex < lis.length - 1) {
        currentActiveIndex++;
        lis[currentActiveIndex].classList.add("active");
        localStorage.setItem("monoIndex", currentActiveIndex);
    }
    else {
        const proximaSecao = document.getElementById("footer-teste");
        if (proximaSecao) {
            proximaSecao.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

resetBtn.addEventListener("click", () => {
    lis.forEach((li, index) => {
        if (index > 0) li.classList.remove("active");
    });

    currentActiveIndex = currentActiveIndex >= 0 ? 0 : -1;
    localStorage.setItem("monoIndex", currentActiveIndex);
    if (currentActiveIndex === -1) {
        window.addEventListener("scroll", VerificarScroll);
    }
});

function VerificarScroll() {
    if (lis.length === 0) return;
    
    const triggerBottom = window.innerHeight * 0.85; 
    const liTop = lis[0].getBoundingClientRect().top;

    if (liTop < triggerBottom) {
        currentActiveIndex = 0;
        lis[0].classList.add("active");
        localStorage.setItem("monoIndex", currentActiveIndex);
        window.removeEventListener("scroll", VerificarScroll);
    }
}