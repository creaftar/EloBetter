import { BuscarPerfil, latestVersion, AtualizarPerfil, _lastUpdate } from "./dados";

const imgEl = document.getElementById("container-img-perfil");
const nivelEl = document.getElementById("perfil-nivel");
const nickAccountEl = document.getElementById("nickname");
const tagAccountEl = document.getElementById("tag-br1");
const lastUpdateEl = document.getElementById("atualizacao-perfil");
const atualizarBtn = document.getElementById("atualizar-perfil");
const eloEl = document.getElementById("elo-perfil");

const copiarBtn = document.getElementById("copiar-perfil"); 

const rankEl = document.getElementById("tier-perfil-name");
const divisionEl = document.getElementById("tier-perfil-division");
const lpEl = document.getElementById("tier-perfil-lp");

const winsEl = document.getElementById("tier-perfil-win");
const lossesEl = document.getElementById("tier-perfil-losses");
const winrateEl = document.getElementById("tier-perfil-winrate");

let perfil = await BuscarPerfil();

copiarBtn.addEventListener("click", CopiarNickname);
atualizarBtn.addEventListener("click", async () => {
    await AtualizarPerfil();
    VerificarEstadoBotao(); 
    AtualizarTextoTempo();
    AtualizarInterface(true);
});

async function AtualizarInterface(botaoChamando = false){
    if (!perfil || botaoChamando){
        await AtualizarPerfil();
        perfil = await BuscarPerfil();
    }

    imgEl.innerHTML = "";
    imgEl.appendChild(GerarImg());
    
    nivelEl.textContent = perfil.nivel;
    nickAccountEl.textContent = perfil.nome + " "; 
    tagAccountEl.textContent = "#" + perfil.tag;

    AtualizarRank(perfil.ranking[0]);

    eloEl.src = ObterLinkElo(perfil.ranking[0].tier.toLowerCase());
    
    AtualizarTextoTempo();
    VerificarEstadoBotao();
    
    setInterval(() => {
        VerificarEstadoBotao();
        AtualizarTextoTempo();
    }, 60000);

    return true;
}

function AtualizarRank(ranking){
    const wins = ranking.wins;
    const losses = ranking.losses;
    const totalJogos = wins + losses;

    rankEl.textContent = ranking.tier;
    /*if(ranking.tier === "MASTER" || ranking.tier === "GRANDMASTER" || ranking.tier === "CHALLENGER")
        divisionEl.textContent = "";
    else*/
        divisionEl.textContent = ranking.rank;
    lpEl.textContent = ranking.leaguePoints + ' LP'; 
    winsEl.textContent = ranking.wins;
    lossesEl.textContent = ranking.losses;

    const winrate = (wins / totalJogos) * 100;
    
    winrateEl.textContent = `Winrate: ${Math.ceil(winrate)}%`;
}

function GerarImg(){
    const imgDOM = document.createElement("img");
    imgDOM.id = "perfil-img";
    imgDOM.alt = "Invoker Icon"; 
    imgDOM.width = "120"; 
    imgDOM.height = "120"; 
    imgDOM.loading = "lazy";
    imgDOM.src = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${perfil.iconeId}.png`;
    return imgDOM;
}

async function CopiarNickname() {
    if (!perfil) return;

    const nickCompleto = `${perfil.nome} #${perfil.tag.toLowerCase()}`;

    try {
        await navigator.clipboard.writeText(nickCompleto);
        copiarBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
        copiarBtn.classList.add("copiado");
        copiarBtn.classList.remove("nao-copiado");
        
        setTimeout(() => {
            copiarBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
            copiarBtn.classList.remove("copiado");
        copiarBtn.classList.add("nao-copiado");
        }, 2000);

    } catch (err) {
        console.error("Erro ao copiar o nickname: ", err);
    }
}

function AtualizarTextoTempo() {
    if (!_lastUpdate) {
        lastUpdateEl.textContent = "Nunca atualizado";
        return;
    }
    
    const agora = new Date();
    const ultimaData = new Date(_lastUpdate);
    
    const diferencaMs = agora - ultimaData; 

    const diferencaEmSegundos = Math.floor(diferencaMs / 1000);
    const diferencaEmMinutos = Math.floor(diferencaEmSegundos / 60);
    const diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);

    if (diferencaEmHoras >= 1) {
        lastUpdateEl.textContent = `Última atualização: há ${diferencaEmHoras} hora(s)`;
    } 
    else if (diferencaEmMinutos >= 1) {
        lastUpdateEl.textContent = `Última atualização: há ${diferencaEmMinutos} minuto(s)`;
    } 
    else {
        const segundos = diferencaEmSegundos <= 0 ? 1 : diferencaEmSegundos;
        lastUpdateEl.textContent = `Última atualização: há ${segundos} segundo(s)`;
    }
}

function VerificarEstadoBotao(){
    if (!_lastUpdate) {
        atualizarBtn.disabled = false;
        atualizarBtn.classList.remove("disabled");
        atualizarBtn.classList.add("enabled");
        atualizarBtn.textContent = "A"; // Texto padrão do seu botão
        return;
    }

    const agora = new Date();
    const ultimaData = new Date(_lastUpdate);
    const diferencaEmMinutos = (agora - ultimaData) / 1000 / 60;

    if (diferencaEmMinutos < 5) {
        atualizarBtn.disabled = true;
        atualizarBtn.classList.remove("enabled");
        atualizarBtn.classList.add("disabled");
    } else {
        atualizarBtn.disabled = false;
        atualizarBtn.classList.remove("disabled");
        atualizarBtn.classList.add("enabled");
    }
}

function ObterLinkElo(ranking) {
    if (!ranking || ranking === "unranked") {
        return "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png"; 
    }
    
    // URL padrão dos emblemas de elo do Community Dragon
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${ranking}.png`;
}

AtualizarInterface();