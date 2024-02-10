const numero_moduli = 12;
const bomba = document.querySelector(".bomba");
const giraButton = document.querySelector("button"); // Aggiunta del riferimento al pulsante

var fronte = true;

function gira() {
    var click = new Audio("../../sounds/effects/click.mp3")

    if (fronte) {
        for (let i = 0; i < numero_moduli/2; i++) {
            bomba.children[i].classList.add("dietro");     
        }
        for (let i = numero_moduli/2; i < numero_moduli; i++) {
            bomba.children[i].classList.remove("dietro");     
        }
        fronte = false
    }else{
        for (let i = 0; i < numero_moduli/2; i++) {
            bomba.children[i].classList.remove("dietro");     
        }
        for (let i = numero_moduli/2; i < numero_moduli; i++) {
            bomba.children[i].classList.add("dietro");     
        }
        fronte = true;
    } 
    click.play();
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

giraButton.addEventListener("onclick", gira);