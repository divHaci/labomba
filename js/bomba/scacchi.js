var scacchi = "Modulo Scacchi";

function creaScacchi() {
  //
  var randomIndex = Math.floor(Math.random() * solutions.length);
  var letters = ["h", "g", "f", "e", "d", "c", "b", "a"];
  let modulo = document.createElement("div");
  modulo.classList.add("chess-module");
  let container = document.createElement("div");
  container.classList.add("chess-container");
  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");

  led_container.appendChild(led);

  var count = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let field = document.createElement("div");
      if (i % 2 == 0 && j % 2 == 0) {
        field.classList.add("white-field");
      } else if (i % 2 == 0 && j % 2 != 0) {
        field.classList.add("black-field");
      }
      if (i % 2 != 0 && j % 2 == 0) {
        field.classList.add("black-field");
      } else if (i % 2 != 0 && j % 2 != 0) {
        field.classList.add("white-field");
      }
      // field.innerHTML = count;
      container.appendChild(field);
      count++;
    }
  }
  var lettersContainer = document.createElement("div");
  lettersContainer.classList.add("letters-container");
  for (let k = 0; k < letters.length; k++) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
    letter.innerHTML = letters[k];
    lettersContainer.appendChild(letter);
    container.appendChild(lettersContainer);
  }
  var numbersContainer = document.createElement("div");
  numbersContainer.classList.add("numbers-container");
  for (let k = 0; k < letters.length; k++) {
    let number = document.createElement("div");
    number.classList.add("number");
    number.innerHTML = k + 1;
    numbersContainer.appendChild(number);
    container.appendChild(numbersContainer);
  }
  var cells = Array.from(container.children);
  solutions[randomIndex]["white"].forEach((piece) => {
    var white_piece = document.createElement("img");
    white_piece.src =
      "/img/modulo/chess/pieces/white/" + pieces[piece["piece"]] + ".png";
    white_piece.setAttribute("draggable", "false");
    cells[piece["cell"]].appendChild(white_piece);
  });

  solutions[randomIndex]["black"].forEach((piece) => {
    var black_piece = document.createElement("img");
    black_piece.src =
      "/img/modulo/chess/pieces/black/" + pieces[piece["piece"]] + ".png";
    black_piece.style.display = "none";
    black_piece.setAttribute("draggable", "false");
    cells[piece["cell"]].appendChild(black_piece);
  });

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Prossima mossa...";

  let btn = document.createElement("input");
  btn.type = "button";
  btn.value = "→";
  var currentMove = 0;
  btn.addEventListener("click", () => {
    if (
      input.value.toLowerCase() ==
      solutions[randomIndex]["moves"][currentMove]["notation"].toLowerCase()
    ) {
      console.log("CORRECT");
      cells[
        solutions[randomIndex]["moves"][currentMove]["prevCell"]
      ].removeChild(
        cells[solutions[randomIndex]["moves"][currentMove]["prevCell"]]
          .firstChild
      );

      var piece = document.createElement("img");
      piece.src =
        "/img/modulo/chess/pieces/" +
        solutions[randomIndex]["moves"][currentMove]["player"] +
        "/" +
        pieces[solutions[randomIndex]["moves"][currentMove]["piece"]] +
        ".png";

      if (
        cells[
          solutions[randomIndex]["moves"][currentMove]["currentCell"]
        ].hasChildNodes()
      ) {
        cells[
          solutions[randomIndex]["moves"][currentMove]["currentCell"]
        ].children[0].style.display = "block";

        setTimeout(() => {
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].removeChild(
            cells[solutions[randomIndex]["moves"][currentMove]["currentCell"]]
              .firstChild
          );
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].appendChild(piece);
          capture.play();
        }, 1000);
      } else {
        move.play();
        cells[
          solutions[randomIndex]["moves"][currentMove]["currentCell"]
        ].appendChild(piece);
      }
      if (currentMove + 1 == solutions[randomIndex]["moves"].length) {
        // Display the king piece
        let kingCell =
          cells[solutions[randomIndex]["moves"][currentMove]["king"]];
        if (kingCell.children.length > 0) {
          kingCell.children[0].style.display = "block";
        }

        // Display black pieces
        solutions[randomIndex]["black"].forEach((piece) => {
          let cell = cells[piece["cell"]];
          if (cell.children.length > 0) {
            cell.children[0].style.display = "block";
          }
        });

        led.style.backgroundColor = "lime";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
        led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
        for (let i = 0; i < 2; i++) {
          // SPEGNE IL MODULO TRANNE IL LED
          modulo.children[i].classList.add("complete");
        }
        right.play();

        checkForWin();
        checkmate.play();
      }

      btn.disabled = true;
      setTimeout(() => {
        currentMove = currentMove + 1;
        cells[
          solutions[randomIndex]["moves"][currentMove]["prevCell"]
        ].removeChild(
          cells[solutions[randomIndex]["moves"][currentMove]["prevCell"]]
            .firstChild
        );

        var piece = document.createElement("img");
        piece.src =
          "/img/modulo/chess/pieces/" +
          solutions[randomIndex]["moves"][currentMove]["player"] +
          "/" +
          pieces[solutions[randomIndex]["moves"][currentMove]["piece"]] +
          ".png";

        piece.style.display = "none";

        if (
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].hasChildNodes()
        ) {
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].removeChild(
            cells[solutions[randomIndex]["moves"][currentMove]["currentCell"]]
              .firstChild
          );
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].appendChild(piece);
        } else {
          cells[
            solutions[randomIndex]["moves"][currentMove]["currentCell"]
          ].appendChild(piece);
        }
        currentMove = currentMove + 1;
        btn.disabled = false;
      }, 1500);
    } else {
      if (errori.children.length < parseInt(max_errori.innerHTML)) {
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        led.style.backgroundColor = "red";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
        led.style.boxShadow = "0px 0px 2vw 0.5vw red";
        wrong.play();
      } else {
        led.style.backgroundColor = "red";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
        led.style.boxShadow = "0px 0px 2vw 0.5vw red";
        click.pause();
        stopTick();
        wrong.play();
        musicLevel.pause();
        explosion.play();
        minuteLeft.pause();
        timeLeft.pause();
        sconfitta(scacchi);
      }
    }
    input.value = "";
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(btn);

  modulo.appendChild(inputContainer);
  modulo.appendChild(container);
  modulo.appendChild(led_container);

  return modulo;
}

aggiungi_modulo(creaScacchi());
