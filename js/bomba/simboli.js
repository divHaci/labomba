var simboli = "Modulo Simboli";

function selectRandomNumbers() {
  var numbersArray = [0, 1, 2, 3, 4, 5, 6]; // Array of numbers from 0 to 6
  var selectedNumbers = [];

  while (selectedNumbers.length < 4) {
    var randomNumber = Math.floor(Math.random() * numbersArray.length);
    var selectedNumber = numbersArray[randomNumber];

    // Check if the selected number is not already in the selectedNumbers array
    if (!selectedNumbers.includes(selectedNumber)) {
      selectedNumbers.push(selectedNumber);
    }
  }

  return selectedNumbers;
}

function selectRandomSolution() {
  var randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function selectNames() {
  var selectedList = selectRandomSolution();
  var selectedNames = [];
  var indexes = selectRandomNumbers().sort();

  for (let i = 0; i < 4; i = i + 1) {
    selectedNames.push(selectedList[indexes[i]]);
  }

  return selectedNames;
}

function creaSimboli() {
  var expectedSequence = [0, 1, 2, 3];
  var names = selectNames();
  var modulo = document.createElement("div");
  modulo.classList.add("symbols-module");
  var buttons_container = document.createElement("div");
  buttons_container.classList.add("buttons-container");
  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");
  led_container.appendChild(led);

  names.forEach(function (name, index) {
    var simbolo = document.createElement("img");
    simbolo.src = "/img/modulo/simboli/" + name + ".png";
    simbolo.setAttribute("id", index);
    simbolo.classList.add("simbolo");
    simbolo.setAttribute("draggable", "false");
    simbolo.addEventListener("click", function () {
      buttonClicked(simbolo, buttons_container, led, modulo, expectedSequence); // Pass the clicked button and buttons container
    });
    buttons_container.appendChild(simbolo);
  });

  var buttons = Array.from(buttons_container.children);
  buttons.sort(() => Math.random() - 0.5);
  buttons.forEach((button) => buttons_container.appendChild(button));

  modulo.appendChild(buttons_container);
  modulo.appendChild(led_container);
  return modulo;
}

function buttonClicked(
  clickedButton,
  buttons_container,
  led,
  modulo,
  expectedSequence
) {
  click.pause();
  click.currentTime = 0;
  click.play();
  var clickedIndex = parseInt(clickedButton.getAttribute("id"));
  if (clickedIndex === expectedSequence[0]) {
    console.log("OK");
    clickedButton.style.filter = "brightness(0.3)";
    expectedSequence.shift();
    if (expectedSequence.length === 0) {
      var buttons = Array.from(buttons_container.children);
      buttons.forEach((button) => (button.style.filter = "brightness(1)"));
      led.style.backgroundColor = "lime";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
      led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
      for (let i = 0; i < 2; i++) {
        // SPEGNE IL MODULO TRANNE IL LED
        modulo.children[i].classList.add("complete");
      }
      right.play();
      checkForWin();
      console.log("GIUSTO");
    }
  } else {
    console.log("ERROR");
    expectedSequence = [0, 1, 2, 3];
    var buttons = Array.from(buttons_container.children);
    buttons.forEach((button) => (button.style.filter = "brightness(1)"));
    if (errori.children.length < parseInt(max_errori.innerHTML)) {
      var x = document.createElement("div");
      x.innerHTML = "X";
      errori.appendChild(x);
      led.style.backgroundColor = "red";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
      led.style.boxShadow = "0px 0px 2vw 0.5vw red";
      wrong.play();
    } else {
      var x = document.createElement("div");
      x.innerHTML = "X";
      errori.appendChild(x);
      led.style.backgroundColor = "red";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
      led.style.boxShadow = "0px 0px 2vw 0.5vw red";
      click.pause();
      stopTick();
      wrong.play();
      musicLevel.pause();
      explosion.play();
      document.querySelector(".bgvideo").style.display = "none";
      minuteLeft.pause();
      timeLeft.pause();
      sconfitta(simboli);
    }
  }
}

aggiungi_modulo(creaSimboli());
