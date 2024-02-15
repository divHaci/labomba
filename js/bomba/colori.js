let colori_colonna_hex = ["#FF0000", "#FF6B00", "#FFFF00", "#00FF00", "#009400", "#0000FF", "#00B6DE"];
let colori_bottoni_hex = ["#FF0000", "#FF6B00", "#FFFF00", "#00FF00", "#009400", "#0000FF", "#00B6DE", "#000000", "#FFFFFF", "#DF00E3", "#00B6DE", "#714526"];
let colori_nome = ["ROSSO", "ARANCIONE", "GIALLO", "VERDE", "AZZURRO", "BLU", "NERO", "BIANCO", "VIOLA", "ROSA", "GRIGIO", "MARRONE", "INDACO", "CELESTE", "LILLA"];

var right = new Audio("/sounds/effects/right.mp3")
var wrong = new Audio("/sounds/effects/wrong.mp3")
var explosion = new Audio("/sounds/effects/explosion.mp3")

let soluzione_colonna;

let display;
let buttons_container;

let correct_button_n;

let ledContainer;

let moduloColori;

let soluzioni = [
  ["#DF00E3", "#FF0000", "#00FF00", "#FFFF00", "#FFFFFF"],
  ["#0000FF", "#000000", "#FF6B00", "#DF00E3", "#FFFF00"],
  ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#DF00E3"],
  ["#FFFFFF", "#0000FF", "#FFFF00", "#000000", "#714526"],
  ["#DF00E3", "#00FF00", "#FF0000", "#00B6DE", "#FF6B00"],
  ["#000000", "#714526", "#0000FF", "#FFFF00", "#FFFFFF"],
  ["#0000FF", "#DF00E3", "#000000", "#FFFFFF", "#FF0000"]
];

function creaColori() {
  soluzione_colonna = Math.floor(Math.random() * colori_colonna_hex.length);
  moduloColori = document.createElement("div");
  moduloColori.classList.add("colori-module");

  display = document.createElement("div");
  display.classList.add("display");
  display.style.color = colori_colonna_hex[soluzione_colonna];
  display.style.textShadow = "0px 0px 1vh " + colori_colonna_hex[soluzione_colonna];
  display.innerHTML = colori_nome[Math.floor(Math.random() * colori_nome.length)];

  buttons_container = document.createElement("div");
  buttons_container.classList.add("buttons-container");

  for (let i = 0; i < 5; i++) {
    let button = document.createElement("button");
    button.classList.add("colori-button");
    button.setAttribute("onclick", "checkColore('wrong')")
    buttons_container.appendChild(button);
  }

  correct_button_n = Math.floor(Math.random() * 5);

  let count = 0;   // numero di bottoni da colorare
  let usciti = []; // colori che sono già usciti


  // COLORA I 5 BOTTONI
  while(count < 5){
    // SELEZIONA UN COLORE A CASO TRA TUTTI I POSSIBILI
    var random_color = colori_bottoni_hex[Math.floor(Math.random()*colori_bottoni_hex.length)]

    // SE IL COLORE NON È GIÀ USCITO
    if(usciti.indexOf(random_color) == -1){
      // INSERISCELO TRA QUELLI GIÀ USCITI
      usciti.push(random_color);

      // SE IL COLORE NON È PRESENTE TRA I COLORI DELLA COLONNA SCELTA COME SOLUZIONE
      if(soluzioni[soluzione_colonna].indexOf(random_color) == -1){
        //IL COLORE È VALIDO E SI PUÒ COLORARE IL BOTTONE
        buttons_container.children[count].style.backgroundColor = random_color;
        buttons_container.children[count].setAttribute("onclick", "checkColore('wrong')")
        count = count + 1;
      }
    }
  }

  // DOPO AVER COLORATO TUTTI I BOTTONI DI COLORI A CASO NON PRESENTI NELLA SOLUZIONE SI PROCEDE A SCEGLIERE UN BOTTONE A CASO E A COLORARLO DI UN COLORE A CASO PRESENTE NELLA SOLUZIONE
  let random_solution = Math.floor(Math.random() * 5);
  buttons_container.children[correct_button_n].style.backgroundColor = soluzioni[soluzione_colonna][random_solution];
  buttons_container.children[correct_button_n].setAttribute("onclick", "checkColore('right')")


  ledContainer = document.createElement("div");
  ledContainer.classList.add("led-container")
  for (let i = 0; i < 3; i++) {
    let led = document.createElement("div")
    led.classList.add("led")
    ledContainer.appendChild(led);
  }
  moduloColori.appendChild(ledContainer);
  moduloColori.appendChild(display);
  moduloColori.appendChild(buttons_container);
  return moduloColori;
}

function aggiungi_modulo(modulo) {
  var empty = true;
  var containers = document.querySelectorAll(".container-modulo");
  var random_container = Math.floor(Math.random() * containers.length / 2);
  while (empty) {
    if (containers[random_container].children.length == 0) {
      containers[random_container].appendChild(modulo);
      empty = false;
    } else {
      random_container = Math.floor(Math.random() * containers.length);
    }
  }
}

var livello = 0;

function checkColore(button) {
  if (button == "wrong") {
    if (errori.children.length < parseInt(max_errori.innerHTML)) {
      var x = document.createElement("div");
      x.innerHTML = "X";
      errori.appendChild(x);
      wrong.play()
      count = 0;

      // Riavvia il timer solo se non è già in esecuzione
      if (!intervalId) {
        remainingTime = durationInSeconds;
        display.textContent = formatTime(remainingTime);
        intervalId = setInterval(updateTimer, 1000);
      }
    }else{
      var x = document.createElement("div");
      x.innerHTML = "X";
      errori.appendChild(x);
      click.pause()
      stopTick();
      wrong.play()
      musicLevel.pause()
      //explosion.play()
      sconfitta();
    }
    for (let i = 0; i < ledContainer.children.length; i++) {
      ledContainer.children[i].style.backgroundColor = "gray"
      ledContainer.children[i].style.boxShadow = "none";
    }
    ledContainer.children[livello].style.backgroundColor = "red"
    ledContainer.children[livello].style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
    ledContainer.children[livello].style.boxShadow = "0px 0px 2vw 0.5vw red";
    livello = 0;
  }else{
    ledContainer.children[livello].style.backgroundColor = "#fde910"
    ledContainer.children[livello].style.webkitBoxShadow = "0px 0px 2vw 0.5vw #fde910";
    ledContainer.children[livello].style.boxShadow = "0px 0px 2vw 0.5vw #fde910";
    livello = livello + 1;
    right.play();
    
    if(livello == 3){
      for (let i = 0; i < 3; i++) {
        ledContainer.children[i].style.backgroundColor = "lime"
        ledContainer.children[i].style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
        ledContainer.children[i].style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
      }
      for (let i = 1; i <= 2; i++) {
        //SPEGNE IL MODULO TRANNE IL LED
        moduloColori.children[i].classList.add("complete")
      }
    }
  }
  newLevel()
}

function newLevel() {
  soluzione_colonna = Math.floor(Math.random() * colori_colonna_hex.length);
  display.style.color = colori_colonna_hex[soluzione_colonna];
  display.style.textShadow = "0px 0px 1vh " + colori_colonna_hex[soluzione_colonna];
  display.innerHTML = colori_nome[Math.floor(Math.random() * colori_nome.length)];
  correct_button_n = Math.floor(Math.random() * 5);

  let count = 0;   // numero di bottoni da colorare
  let usciti = []; // colori che sono già usciti


  // COLORA I 5 BOTTONI
  while(count < 5){
    // SELEZIONA UN COLORE A CASO TRA TUTTI I POSSIBILI
    var random_color = colori_bottoni_hex[Math.floor(Math.random()*colori_bottoni_hex.length)]

    // SE IL COLORE NON È GIÀ USCITO
    if(usciti.indexOf(random_color) == -1){
      // INSERISCELO TRA QUELLI GIÀ USCITI
      usciti.push(random_color);

      // SE IL COLORE NON È PRESENTE TRA I COLORI DELLA COLONNA SCELTA COME SOLUZIONE
      if(soluzioni[soluzione_colonna].indexOf(random_color) == -1){
        //IL COLORE È VALIDO E SI PUÒ COLORARE IL BOTTONE
        buttons_container.children[count].style.backgroundColor = random_color;
        buttons_container.children[count].setAttribute("onclick", "checkColore('wrong')")
        count = count + 1;
      }
    }
  }

  // DOPO AVER COLORATO TUTTI I BOTTONI DI COLORI A CASO NON PRESENTI NELLA SOLUZIONE SI PROCEDE A SCEGLIERE UN BOTTONE A CASO E A COLORARLO DI UN COLORE A CASO PRESENTE NELLA SOLUZIONE
  let random_solution = Math.floor(Math.random() * 5);
  buttons_container.children[correct_button_n].style.backgroundColor = soluzioni[soluzione_colonna][random_solution];
  buttons_container.children[correct_button_n].setAttribute("onclick", "checkColore('right')")
}

aggiungi_modulo(creaColori())