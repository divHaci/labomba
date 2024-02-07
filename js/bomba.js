
// Design bomba
// Aggiunta 12 moduli vuoti + pulsante gira per caricare i moduli avanti e dietro
// Gestire errori e timer

const numero_moduli = 12;
const bomba = document.querySelector(".bomba");

var fronte = true;

function creaBomba() {
    for (let i = 0; i < numero_moduli; i++) {
        // Creiamo un nuovo container vuoto
        let container_modulo = document.createElement("div");
        container_modulo.classList.add("container-modulo");
        // Aggiungiamo il nuovo container per il modulo alla bomba
        bomba.appendChild(container_modulo);
    }

    // Impostiamo i container dietro (metà) non visibili
    for (let i = numero_moduli/2; i < numero_moduli - 1; i++) {
        bomba.children[i].classList.add("dietro")
    }
}

creaBomba()