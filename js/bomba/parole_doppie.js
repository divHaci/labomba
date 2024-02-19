var paroleDoppie = "Modulo Parole Doppie";

function creaParoleDoppie() {
  let lvl = 0;
  let moduloParoleDoppie = document.createElement("div");
  moduloParoleDoppie.classList.add("modulo-parole-doppie");

  let displayParoleDoppie = document.createElement("div");
  displayParoleDoppie.classList.add("display-parole-doppie");

  var correctDisplayWordIndex = Math.floor(Math.random() * words.length);
  var correctSolutionIndex = Math.floor(
    Math.random() * soluzioni_parole.length
  );
  var correctWordIndex = Math.floor(
    Math.random() * soluzioni_parole[correctSolutionIndex].length
  );

  var displayWord = words[correctDisplayWordIndex];

  var keywordButtonIndex = words_ass[correctDisplayWordIndex]["key"];
  var correctButtonIndex;
  do {
    correctButtonIndex = Math.floor(Math.random() * 6);
  } while (correctButtonIndex == keywordButtonIndex);

  var buttonKeyword;
  do {
    buttonKeyword = words[Math.floor(Math.random() * words.length)];
  } while (
    buttonKeyword ==
      soluzioni_parole[words.indexOf(buttonKeyword)][correctWordIndex] ||
    soluzioni_parole[words.indexOf(buttonKeyword)]
      .slice(0, correctWordIndex)
      .indexOf(buttonKeyword) != -1
  );

  displayParoleDoppie.innerHTML = displayWord;

  let ledContainerParoleDoppie = document.createElement("div");
  ledContainerParoleDoppie.classList.add("led-container-parole-doppie");

  for (let i = 0; i < 4; i = i + 1) {
    let led = document.createElement("div");
    led.classList.add("led");
    ledContainerParoleDoppie.appendChild(led);
  }

  let containerParoleDoppie = document.createElement("div");
  containerParoleDoppie.classList.add("container-parole-doppie");

  let parole_uscite = [];
  for (let i = 0; i < 6; i = i + 1) {
    let button = document.createElement("button");
    button.classList.add("button-parole-doppie");
    button.style.fontSize = "1vw";

    containerParoleDoppie.appendChild(button);

    if (i != correctButtonIndex) {
      button.setAttribute("id", "wrong");

      if (i == keywordButtonIndex) {
        button.innerHTML = buttonKeyword;
      } else {
        let randomWord;
        do {
          randomWord = words[Math.floor(Math.random() * words.length)];
        } while (
          soluzioni_parole[words.indexOf(buttonKeyword)]
            .slice(0, correctWordIndex + 1)
            .indexOf(randomWord) != -1 ||
          parole_uscite.indexOf(randomWord) != -1 ||
          randomWord == buttonKeyword
        );
        button.innerHTML = randomWord;
        parole_uscite.push(randomWord);
      }
    } else {
      button.setAttribute("id", "right");

      button.innerHTML =
        soluzioni_parole[words.indexOf(buttonKeyword)][correctWordIndex];
    }

    button.addEventListener("click", () => {
      var result = button.getAttribute("id");

      if (result == "right") {
        right.play();
        ledContainerParoleDoppie.children[lvl].style.backgroundColor =
          "#fde910";
        ledContainerParoleDoppie.children[lvl].style.webkitBoxShadow =
          "0px 0px 2vw 0.5vw #fde910";
        ledContainerParoleDoppie.children[lvl].style.boxShadow =
          "0px 0px 2vw 0.5vw #fde910";
        lvl = lvl + 1;

        parole_uscite = [];
        var buttonKeyword;
        do {
          buttonKeyword = words[Math.floor(Math.random() * words.length)];
        } while (
          buttonKeyword ==
            soluzioni_parole[words.indexOf(buttonKeyword)][correctWordIndex] ||
          soluzioni_parole[words.indexOf(buttonKeyword)]
            .slice(0, correctWordIndex)
            .indexOf(buttonKeyword) != -1
        );

        correctDisplayWordIndex = Math.floor(Math.random() * words.length);
        correctSolutionIndex = Math.floor(
          Math.random() * soluzioni_parole.length
        );
        correctWordIndex = Math.floor(
          Math.random() * soluzioni_parole[words.indexOf(buttonKeyword)].length
        );

        displayWord = words[correctDisplayWordIndex];

        keywordButtonIndex = words_ass[correctDisplayWordIndex]["key"];
        correctButtonIndex;
        do {
          correctButtonIndex = Math.floor(Math.random() * 6);
        } while (correctButtonIndex == keywordButtonIndex);

        displayParoleDoppie.innerHTML = displayWord;
        for (let i = 0; i < containerParoleDoppie.children.length; i++) {
          let button = containerParoleDoppie.children[i];
          if (i != correctButtonIndex) {
            button.setAttribute("id", "wrong");
            if (i == keywordButtonIndex) {
              button.innerHTML = buttonKeyword;
            } else {
              let randomWord;
              do {
                randomWord = words[Math.floor(Math.random() * words.length)];
              } while (
                soluzioni_parole[words.indexOf(buttonKeyword)]
                  .slice(0, correctWordIndex + 1)
                  .indexOf(randomWord) != -1 ||
                parole_uscite.indexOf(randomWord) != -1 ||
                randomWord == buttonKeyword
              );
              button.innerHTML = randomWord;
              parole_uscite.push(randomWord);
            }
          } else {
            button.setAttribute("id", "right");
            button.innerHTML =
              soluzioni_parole[words.indexOf(buttonKeyword)][correctWordIndex];
          }
        }
        if (lvl == 4) {
          for (let i = 0; i < ledContainerParoleDoppie.children.length; i++) {
            ledContainerParoleDoppie.children[i].style.backgroundColor = "lime";
            ledContainerParoleDoppie.children[i].style.webkitBoxShadow =
              "0px 0px 2vw 0.5vw #74FF66ed";
            ledContainerParoleDoppie.children[i].style.boxShadow =
              "0px 0px 2vw 0.5vw #74FF66";
          }
          for (let i = 0; i < 2; i++) {
            //SPEGNE IL MODULO TRANNE IL LED
            moduloParoleDoppie.children[i].classList.add("complete");
          }
          checkForWin();
        }
      } else if (result == "wrong") {
        for (let i = 0; i < 4; i = i + 1) {
          ledContainerParoleDoppie.children[i].style.backgroundColor = "gray";
          ledContainerParoleDoppie.children[i].style.boxShadow = "none";
        }
        if (errori.children.length < parseInt(max_errori.innerHTML)) {
          var x = document.createElement("div");
          x.innerHTML = "X";
          errori.appendChild(x);
          wrong.play();
        } else {
          var x = document.createElement("div");
          x.innerHTML = "X";
          errori.appendChild(x);
          click.pause();
          stopTick();
          wrong.play();
          musicLevel.pause();
          explosion.play();
          document.querySelector(".bgvideo").style.display = "none";
          sconfitta(paroleDoppie);
        }

        ledContainerParoleDoppie.children[lvl].style.backgroundColor = "red";
        ledContainerParoleDoppie.children[lvl].style.webkitBoxShadow =
          "0px 0px 2vw 0.5vw red";
        ledContainerParoleDoppie.children[lvl].style.boxShadow =
          "0px 0px 2vw 0.5vw red";
        lvl = 0;
      }
    });
  }

  moduloParoleDoppie.appendChild(displayParoleDoppie);
  moduloParoleDoppie.appendChild(containerParoleDoppie);
  moduloParoleDoppie.appendChild(ledContainerParoleDoppie);

  return moduloParoleDoppie;
}

aggiungi_modulo(creaParoleDoppie());
