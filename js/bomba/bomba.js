const numero_moduli = 12;
const bomba = document.querySelector(".bomba");
const giraButton = document.querySelector("button"); // Aggiunta del riferimento al pulsante

var fronte = true;
var animazioneInCorso = false; // Aggiunta variabile per tenere traccia dell'animazione

function gira() {
    if (animazioneInCorso) {
        return; // Se l'animazione è in corso, esce dalla funzione
    }

    animazioneInCorso = true; // Imposta la variabile a true durante l'animazione

    bomba.style.animation = 'rotateBomb 0.5s ease-in-out';

    setTimeout(() => {
        if (fronte) {
            for (let i = numero_moduli / 2; i < numero_moduli; i++) {
                bomba.children[i].classList.remove("dietro");
            }
            for (let i = 0; i < numero_moduli / 2; i++) {
                bomba.children[i].classList.add("dietro");
            }
            fronte = false;
        } else {
            for (let i = numero_moduli / 2; i < numero_moduli; i++) {
                bomba.children[i].classList.add("dietro");
            }
            for (let i = 0; i < numero_moduli / 2; i++) {
                bomba.children[i].classList.remove("dietro");
            }
            fronte = true;
        }
        bomba.style.animation = '';
        animazioneInCorso = false; // Resetta la variabile dopo l'animazione
    }, 500);
}

function creaBomba() {
    for (let i = 0; i < numero_moduli; i++) {
        let container_modulo = document.createElement("div");
        container_modulo.classList.add("container-modulo");
        bomba.appendChild(container_modulo);
    }

    for (let i = numero_moduli / 2; i < numero_moduli; i++) {
        bomba.children[i].classList.add("dietro");
    }
}

creaBomba();

giraButton.addEventListener("click", gira); // Aggiunta dell'event listener al pulsante
