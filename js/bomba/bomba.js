const numero_moduli = 12;
const bomba = document.querySelector(".bomba");
const giraButton = document.querySelector(".gira-button"); // Aggiunta del riferimento al pulsante

var fronte = true;

var win = new Audio("../../sounds/livello-completato.mp3");
var swap = new Audio("../../sounds/effects/swap.mp3");
var click = new Audio("../../sounds/effects/click.mp3")
var right = new Audio("/sounds/effects/right.mp3")
var wrong = new Audio("/sounds/effects/wrong.mp3")
var explosion = new Audio("/sounds/effects/explosion.mp3")
var memory = new Audio("/sounds/effects/memory.mp3")

function gira() {
    if (fronte) {
        for (let i = 0; i < numero_moduli/2; i++) {
            bomba.children[i].classList.add("dietro");     
        }
        for (let i = numero_moduli/2; i < numero_moduli; i++) {
            bomba.children[i].classList.remove("dietro");     
        }
        fronte = false
        swap.play();
    }else{
        for (let i = 0; i < numero_moduli/2; i++) {
            bomba.children[i].classList.remove("dietro");     
        }
        for (let i = numero_moduli/2; i < numero_moduli; i++) {
            bomba.children[i].classList.add("dietro");     
        }
        fronte = true;
        swap.play();
    } 
    
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



var show = false;
giraButton.addEventListener("onclick", gira);

function vittoria() {
    document.querySelector(".menu-container h1").innerHTML = "HAI VINTO!"
    document.querySelector(".menu-container").style.display = "flex";
    show = true
    win.play();
}
function sconfitta() {
    console.log("suca");
    document.querySelector(".menu-container h1").innerHTML = "HAI PERSO!"
    document.querySelector(".menu-container").style.display = "flex";
    show = true
}

document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the "Escape" key (key code 27)
    show = !show;
    
    if (event.key === "Escape") {
        if(show){
            document.querySelector(".menu-container h1").innerHTML = "PAUSA"
            document.querySelector(".menu-container").style.display = "flex";
        }else{
            document.querySelector(".menu-container").style.display = "none";
        }
    }
  });