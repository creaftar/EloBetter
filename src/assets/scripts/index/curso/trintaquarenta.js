import { ProximaSecao } from "./curso";

const nextBtn = document.getElementById("next-step-trintaquarenta");

nextBtn.addEventListener("click", () => {
    ProximaSecao("mentalidade");
});