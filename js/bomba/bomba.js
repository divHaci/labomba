const numero_moduli = 12;
const bomba = document.querySelector(".bomba");
const giraButton = document.querySelector(".gira-button"); // Aggiunta del riferimento al pulsante

var fronte = true;
var serialcode = generaCodiceSeriale();

var parallelExist;
var RJ45Exist;
var PS2Exist;
var DVIDExist;
var SerialExist;

function generaCodiceSeriale() {
  const lettere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeri = "0123456789";

  // Genera una lettera casuale come primo carattere
  const primoCarattere = lettere.charAt(
    Math.floor(Math.random() * lettere.length)
  );

  // Genera una sequenza casuale di lettere e numeri nel mezzo
  let parteCentrale = "";
  let sommaNumeri = 0;
  for (let i = 0; i < 6; i++) {
    // Alterna tra lettere e numeri
    const carattere =
      i % 2 === 0
        ? lettere.charAt(Math.floor(Math.random() * lettere.length))
        : numeri.charAt(Math.floor(Math.random() * numeri.length));

    parteCentrale += carattere;

    // Se il carattere è un numero, aggiungilo alla somma
    if (!isNaN(parseInt(carattere))) {
      sommaNumeri += parseInt(carattere);
    }
  }

  // Genera un numero casuale come ultimo carattere
  const ultimoCarattere = numeri.charAt(
    Math.floor(Math.random() * numeri.length)
  );

  // Aggiungi l'ultimo carattere alla somma
  sommaNumeri += parseInt(ultimoCarattere);

  // Unisci tutto per ottenere il codice seriale completo
  var serialcode = primoCarattere + parteCentrale + ultimoCarattere;

  // Restituisci il codice seriale e la somma dei numeri
  return { codiceSeriale: serialcode, sommaNumeri };
}

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
var caviSounds = new Audio("/sounds/effects/caviSounds.mp3");
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

var ports = ["Parallel", "Serial", "PS2", "RJ45", "DVID"];

function creaBomba() {
  var portslot1 = document.createElement("div");
  var portslot2 = document.createElement("div");
  portslot1.classList.add("portslot1");
  portslot2.classList.add("portslot2");

  var port1 = document.createElement("img");
  var port2 = document.createElement("img");
  port1.setAttribute("draggable", "false");
  port2.setAttribute("draggable", "false");
  portslot1.appendChild(port1);
  portslot2.appendChild(port2);

  // Generate a random number between 0 and 2
  var randomSpawn1 = Math.floor(Math.random() * 5);
  var randomSpawn2 = Math.floor(Math.random() * 5);

  // Check if the random number is 0 or 1, then spawn the port
  if (randomSpawn1 !== 2 || randomSpawn1 !== 3) {
    var port = Math.floor(Math.random() * ports.length);
    switch (port) {
      case 0:
        parallelExist = true;
        break;
      case 3:
        RJ45Exist = true;
        break;
      case 2:
        PS2Exist = true;
        break;
      case 4:
        DVIDExist = true;
        break;
      case 1:
        SerialExist = true;
        break;

      default:
        break;
    }
    portslot1.children[0].src = "/img/bomba/" + ports[port] + ".png";
  }

  if (randomSpawn2 !== 2 || randomSpawn2 !== 3) {
    var port = Math.floor(Math.random() * ports.length);
    switch (port) {
      case 0:
        parallelExist = true;
        break;
      case 3:
        RJ45Exist = true;
        break;
      case 2:
        PS2Exist = true;
        break;
      case 4:
        DVIDExist = true;
        break;
      case 1:
        SerialExist = true;
        break;

      default:
        break;
    }
    portslot2.children[0].src = "/img/bomba/" + ports[port] + ".png";
  }

  var code_container = document.createElement("div");
  code_container.classList.add("code-container");
  code_container.innerHTML = serialcode.codiceSeriale;
  var sum_cifre = document.createElement("div");
  sum_cifre.style.display = "none";
  sum_cifre.innerHTML = serialcode.sommaNumeri;
  sum_cifre.classList.add("sum-cifre");
  document.querySelector("body").appendChild(sum_cifre);
  document.querySelector("body").appendChild(code_container);
  document.querySelector("body").appendChild(portslot1);
  document.querySelector("body").appendChild(portslot2);
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
var elapsedMinutes; // Declare these variables at a higher scope
var elapsedSeconds;

function vittoria() {
  document.querySelector(".menu-container h1").innerHTML =
    "BOMBA DISINNESCATA!";
  document.querySelector(".menu-container").style.display = "flex";
  document.querySelector(".menu-container .time").style.display = "flex";
  document.querySelector(".menu-container .record").style.display = "flex";
  musicLevel.pause();
  ticking.pause();
  timeLeft.pause();
  minuteLeft.pause();

  document.querySelector(".left-red-light").style.animation = "none";
  document.querySelector(".right-red-light").style.animation = "none";
  clearInterval(intervalId);
  show = true;
  win.play();

  // Tempo iniziale
  var startingMinutes = parseInt(
    document.querySelector(".starting-minutes").innerHTML,
    10
  );
  var startingSeconds = parseInt(
    document.querySelector(".starting-seconds").innerHTML,
    10
  );

  // Tempo finale
  var timeString = document.querySelector(".timer .display").innerHTML;
  var timeArray = timeString.split(":");
  var minutes = parseInt(timeArray[0], 10);
  var seconds = parseInt(timeArray[1], 10);

  // Calcolo del tempo trascorso
  elapsedMinutes = startingMinutes - minutes;
  elapsedSeconds = startingSeconds - seconds;

  // Correggi il tempo trascorso in caso di secondi negativi
  if (elapsedSeconds < 0) {
    elapsedSeconds += 60;
    elapsedMinutes--;
  }

  // Correggi il tempo trascorso in caso di minuti negativi
  if (elapsedMinutes < 0) {
    elapsedMinutes += 60;
  }

  document.querySelector(".menu-container .time .minutes").innerHTML =
    elapsedMinutes;
  document.querySelector(".menu-container .time .seconds").innerHTML =
    elapsedSeconds;

  var nLivello = document.querySelector(".level").innerHTML;
  localStorage.setItem("level" + nLivello + "Minutes", elapsedMinutes);
  localStorage.setItem("level" + nLivello + "Seconds", elapsedSeconds);
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
      document.querySelector(".menu-container .record").style.display = "flex";
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
