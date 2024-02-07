const numero_moduli = 12;
const bomba = document.querySelector(".bomba");

var fronte = true;

function gira() {
    if (fronte) {
        for (let i = numero_moduli / 2; i < numero_moduli - 1; i++) {
            bomba.children[i].classList.remove("dietro");
        }
        for (let i = 0; i < numero_moduli / 2 - 1; i++) {
            bomba.children[i].classList.add("dietro");
        }
        fronte = false;
    } else {
        for (let i = numero_moduli / 2; i < numero_moduli - 1; i++) {
            bomba.children[i].classList.add("dietro");
        }
        for (let i = 0; i < numero_moduli / 2 - 1; i++) {
            bomba.children[i].classList.remove("dietro");
        }
        fronte = true;
    }
}

function creaBomba() {
    for (let i = 0; i < numero_moduli; i++) {
        let container_modulo = document.createElement("div");
        container_modulo.classList.add("container-modulo");
        bomba.appendChild(container_modulo);
    }

    for (let i = numero_moduli / 2 - 1; i < numero_moduli - 1; i++) {
        bomba.children[i].classList.add("dietro");
    }
}

creaBomba();
