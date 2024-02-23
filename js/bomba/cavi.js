var cavi = "Modulo Cavi";

function creaCavi() {
  var last_digit = serialcode.codiceSeriale.charAt(serialcode.length - 1);
  var colors = [
    "orange",
    "purple",
    "green",
    "red",
    "blue",
    "yellow",
    "brown",
    "white",
  ];
  let modulo = document.createElement("div");
  modulo.classList.add("cables-module");
  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");
  led_container.appendChild(led);

  var cables_n = Math.floor(Math.random() * (7 - 4 + 1)) + 4;

  var cables = [];
  for (let i = 0; i < cables_n; i++) {
    cables.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  var cables_to_cut = [];

  switch (cables_n) {
    case 4:
      if (cables.indexOf("orange") == -1) {
        cables_to_cut.push(1);
      } else if (cables[cables_n - 1] == "purple") {
        cables_to_cut.push(0);
        cables_to_cut.push(3);
      } else if (cables.indexOf("green") != -1) {
        cables_to_cut.push(cables.indexOf("green"));
      } else {
        cables_to_cut.push(0);
        cables_to_cut.push(1);
        cables_to_cut.push(2);
        cables_to_cut.push(3);
      }
      break;

    case 5:
      if (
        cables.filter((color) => color === "red").length >= 2 &&
        last_digit % 2 == 0
      ) {
        cables_to_cut.push(cables.indexOf("red", cables.indexOf("red") + 1));
      } else if (
        cables[cables_n - 1] == "blue" &&
        cables.indexOf("green") == -1
      ) {
        cables_to_cut.push(0);
      } else if (cables.filter((color) => color === "yellow").length == 2) {
        cables_to_cut.push(cables.indexOf("yellow"));
      } else if (cables.filter((color) => color === "purple").length >= 2) {
        cables_to_cut.push(1);
      } else {
        cables_to_cut.push(2);
      }
      break;

    case 6:
      if (cables[cables_n - 1] == "brown" && last_digit % 2 != 0) {
        cables_to_cut.push(4);
      } else if (
        cables.filter((color) => color === "green").length == 2 &&
        cables.filter((color) => color === "purple").length >= 2
      ) {
        cables_to_cut.push(cables.indexOf("green"));
      } else if (cables.indexOf("brown") == -1) {
        cables_to_cut.push(1);
        cables_to_cut.push(5);
      } else if (
        cables.indexOf("red") != -1 &&
        cables.indexOf("yellow") != -1 &&
        cables.indexOf("blue") != -1
      ) {
        cables_to_cut.push(0);
        cables_to_cut.push(2);
        cables_to_cut.push(4);
      } else {
        cables_to_cut.push(2);
      }
      break;
    case 7: {
      if (cables.indexOf("yellow") == -1 && last_digit % 2 != 0) {
        cables_to_cut.push(3);
      } else if (
        cables.filter((color) => color === "yellow").length == 2 &&
        cables.indexOf("white") != -1
      ) {
        cables_to_cut.push(cables.indexOf("yellow"));
      } else if (cables.indexOf("red") == -1) {
        cables_to_cut.push(2);
        cables_to_cut.push(6);
      } else if (
        cables.indexOf("blue") == -1 &&
        cables.filter((color) => color === "red").length == 1 &&
        cables.filter((color) => color === "yellow").length >= 2
      ) {
        cables_to_cut.push(1);
        cables_to_cut.push(2);
        cables_to_cut.push(5);
      } else {
        cables_to_cut.push(4);
      }
      break;
    }
    default:
      break;
  }

  let cables_container = document.createElement("div");
  cables_container.classList.add("cables-container");
  cables.forEach((cable, index) => {
    var cableImg = document.createElement("img");
    cableImg.classList.add("cable");
    cableImg.src = "/img/modulo/cavi/intero/" + cable + ".png";
    cables_container.appendChild(cableImg);
    cableImg.style.height = 75 / cables_n + "%";
    cableImg.setAttribute("draggable", "false");
    cableImg.addEventListener("click", () => {
      if (cableImg.getAttribute("id") != "spezzato") {
        caviSounds.pause();
        caviSounds.currentTime = 0;
        caviSounds.play();
        cableImg.src = "/img/modulo/cavi/spezzato/" + cable + ".png";
        cableImg.setAttribute("id", "spezzato");
        var expectedSequence = cables_to_cut;
        if (index === expectedSequence[0]) {
          expectedSequence.shift();
          if (cables_to_cut.length === 0) {
            led.style.backgroundColor = "lime";
            led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
            led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
            modulo.children[0].classList.add("complete");
            right.play();
            checkForWin();
          }
        } else {
          var expectedSequence = cables_to_cut;
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
            minuteLeft.pause();
            timeLeft.pause();
            sconfitta(cavi);
          }
        }
      }
    });
  });

  modulo.appendChild(cables_container);
  modulo.appendChild(led_container);

  return modulo;
}

aggiungi_modulo(creaCavi());
