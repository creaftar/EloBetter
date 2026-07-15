import { AdicionarVisibilidade } from "../ferramentas/el_visibilidade";
const containerIdiomas = document.getElementById("container-idiomas");
const menuIdiomas = document.getElementById("menu-idiomas");

containerIdiomas.addEventListener("click", ExibirMenu);

async function ExibirMenu(){
    AdicionarVisibilidade(menuIdiomas);
}