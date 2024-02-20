const numero_moduli = 12;
const bomba = document.querySelector(".bomba");
const giraButton = document.querySelector(".gira-button"); // Aggiunta del riferimento al pulsante

var fronte = true;

var win = new Audio("../../sounds/livello-completato.mp3");
var swap = new Audio("../../sounds/effects/swap.mp3");
var click = new Audio("../../sounds/effects/click.mp3");
var right = new Audio("/sounds/effects/right.mp3");
var wrong = new Audio("/sounds/effects/wrong.mp3");
var explosion = new Audio("/sounds/effects/explosion.mp3");
var memory = new Audio("/sounds/effects/memory.mp3");
var loseMusic = new Audio("/sounds/effects/music-level/loseMusic.mp3");
var notification = new Audio("/sounds/effects/notification.mp3");
var notification_out = new Audio("/sounds/effects/notification_out.mp3");

var esploso = false;

function gira() {
  if (fronte) {
    for (let i = 0; i < numero_moduli / 2; i++) {
      bomba.children[i].classList.add("dietro");
    }
    for (let i = numero_moduli / 2; i < numero_moduli; i++) {
      bomba.children[i].classList.remove("dietro");
    }
    fronte = false;
    swap.pause();
    swap.currentTime = 0;
    swap.play();
  } else {
    for (let i = 0; i < numero_moduli / 2; i++) {
      bomba.children[i].classList.remove("dietro");
    }
    for (let i = numero_moduli / 2; i < numero_moduli; i++) {
      bomba.children[i].classList.add("dietro");
    }
    fronte = true;
    swap.pause();
    swap.currentTime = 0;
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
  document.querySelector(".menu-container h1").innerHTML =
    "BOMBA DISINNESCATA!";
  document.querySelector(".menu-container").style.display = "flex";
  document.querySelector(".codice").style.display = "flex";
  musicLevel.pause();
  ticking.pause();
  timeLeft.pause();
  minuteLeft.pause();
  document.querySelector(".left-red-light").style.animation = "none";
  document.querySelector(".right-red-light").style.animation = "none";
  clearInterval(intervalId);
  show = true;
  win.play();
}
function sconfitta(reason) {
  console.log(reason);
  document.querySelector(
    ".famous-list"
  ).innerHTML += `<div>Causa Esplosione: ${reason}</div>`;
  esploso = true;
  document.querySelector(".menu-container h1").innerHTML = "SEI ESPLOSO!";
  document.querySelector(".menu-container").style.display = "flex";
  document.querySelector(".vittime").style.display = "flex";
  document.querySelector(".famous-list").style.display = "flex";

  document.querySelector(".menu-container .n-vittime").innerHTML =
    " " + Math.floor(Math.random() * 300 + 100) + " ";
  for (let i = 0; i < 2; i++) {
    var index = Math.floor(Math.random() * people.length);
    var person = document.createElement("span");
    person.textContent = people[index];
    people.splice(index, 1); // Remove the selected person from the array
    document
      .querySelector(".famous-list")
      .querySelector(".list")
      .appendChild(person);
  }
  show = true;

  var allElements = document.querySelector("body").children;

  for (let i = 4; i < allElements.length; i++) {
    allElements[i].classList.add("complete");
    document.querySelector(".gira-button").classList.remove("complete");
  }

  // Add the following lines to trigger loseMusic after 2 seconds
  setTimeout(() => {
    loseMusic.play();
    loseMusic.volume = 0.08;
  }, 500);

  document.querySelector(".left-red-light").style.animation = "none";
  document.querySelector(".right-red-light").style.animation = "none";
  document.querySelector(".left-red-light").style.backgroundColor = "red";
  document.querySelector(".right-red-light").style.backgroundColor = "red";
}

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Escape" key (key code 27)
  show = !show;

  if (event.key === "Escape") {
    if (show) {
      document.querySelector(".menu-container h1").innerHTML = "MENU";
      document.querySelector(".menu-container").style.display = "flex";
    } else {
      document.querySelector(".menu-container").style.display = "none";
    }
  }
});

function aggiungi_modulo(modulo) {
  var empty = true;
  var containers = document.querySelectorAll(".container-modulo");
  var random_container = Math.floor((Math.random() * containers.length) / 2);
  while (empty) {
    if (containers[random_container].children.length == 0) {
      containers[random_container].appendChild(modulo);
      empty = false;
    } else {
      random_container = Math.floor(Math.random() * containers.length);
    }
  }
}

function checkForWin() {
  var n_moduli = document.querySelector(".n-moduli");
  var n_moduli_completati = document.querySelector(".n-moduli-completati");

  n_moduli_completati.innerHTML = parseInt(n_moduli_completati.innerHTML) + 1;

  if (parseInt(n_moduli_completati.innerHTML) == parseInt(n_moduli.innerHTML)) {
    var allElements = document.querySelector("body").children;

    setTimeout(() => {
      document.querySelector(".win-led").style.display = "block";
    }, 500);

    setTimeout(() => {
      vittoria();
    }, 500);
  }
}
