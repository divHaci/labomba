var binaryModulo = "Modulo Codice Binario";

function generaBinary() {
  var bits = [];
  var led_container = document.createElement("div");
  led_container.classList.add("led-container");
  var led = document.createElement("div");
  led.classList.add("led");
  led_container.appendChild(led);
  var container = document.createElement("div");
  container.classList.add("container");
  var modulo_binary = document.createElement("div");
  modulo_binary.classList.add("modulo-binary");
  var nLettera = document.createElement("div");
  nLettera.innerHTML = 1;
  nLettera.classList.add("n-lettera");

  let display_binary = document.createElement("div");
  display_binary.classList.add("display-binary");
  for (let i = 0; i < 8; i++) {
    let bit = document.createElement("div");
    bit.classList.add("bit");

    let off = document.createElement("div");
    off.classList.add("off");
    let on = document.createElement("div");
    on.classList.add("on");

    bit.appendChild(off);
    bit.appendChild(on);

    bits.push(bit);
    display_binary.appendChild(bit);
  }

  // Select a random word from the binary_words array
  let word = binary_words[Math.floor(Math.random() * binary_words.length)];

  var j = 0;
  let i = 0;
  var bits_interval = setInterval(() => {
    var leds = bits[i].children;
    if (binary[binary_words.indexOf(word)][j][i] == 0) {
      leds[0].style.backgroundColor = "rgb(255, 196, 0)";
      leds[0].style.boxShadow = "0px 0px 0.3vw rgb(255, 247, 0)";
    } else {
      leds[1].style.backgroundColor = "rgb(255, 196, 0)";
      leds[1].style.boxShadow = "0px 0px 0.3vw rgb(255, 247, 0)";
    }
    if (i == 7) {
      clearInterval(bits_interval);
    }
    i++;
  }, 500);
  var clock = setInterval(() => {
    for (var i = 0; i < 8; i++) {
      var leds = bits[i].children;
      leds[0].style.boxShadow = "";
      leds[1].style.boxShadow = "";
      leds[0].style.backgroundColor = "gray";
      leds[1].style.backgroundColor = "gray";
    }
    i = 0;
    var bits_interval = setInterval(() => {
      var leds = bits[i].children;
      if (binary[binary_words.indexOf(word)][j][i] == 0) {
        leds[0].style.backgroundColor = "rgb(255, 196, 0)";
        leds[0].style.boxShadow = "0px 0px 0.3vw rgb(255, 247, 0)";
      } else {
        leds[1].style.backgroundColor = "rgb(255, 196, 0)";
        leds[1].style.boxShadow = "0px 0px 0.3vw rgb(255, 247, 0)";
      }
      if (i == 7) {
        clearInterval(bits_interval);
      }
      i++;
    }, 500);
    j++;
    if (j == 4) {
      j = 0;
    }
    nLettera.innerHTML = j + 1;
  }, 6000);

  var input_container = document.createElement("div");
  var fields = document.createElement("div");
  fields.classList.add("input-fields");
  input_container.classList.add("input-container");

  let input_word = document.createElement("input");
  input_word.classList.add("input-word");
  input_word.type = "text";
  input_word.placeholder = "XXXX";
  input_word.maxLength = 4;
  input_word.setAttribute("draggable", "false"); // Disable drag-and-drop
  fields.appendChild(input_word);
  input_word.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  var submit = document.createElement("button");
  submit.innerHTML = "→";
  submit.addEventListener("click", function () {
    if (input_word.value.toUpperCase() == word) {
      led.style.backgroundColor = "lime";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
      led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
      right.play();
      for (let i = 0; i < 3; i++) {
        //SPEGNE IL MODULO TRANNE IL LED
        modulo_binary.children[i].classList.add("complete");
      }
      checkForWin();
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
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        led.style.backgroundColor = "red";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
        led.style.boxShadow = "0px 0px 2vw 0.5vw red";
        click.pause();
        stopTick();
        wrong.play();
        explosion.play();
        document.querySelector(".bgvideo").style.display = "none";
        musicLevel.pause();
        minuteLeft.pause();
        timeLeft.pause();
        sconfitta(binaryModulo);
      }
    }
  });
  input_container.appendChild(fields);
  input_container.appendChild(submit);

  container.appendChild(nLettera);
  container.appendChild(display_binary);
  container.appendChild(input_container);
  modulo_binary.appendChild(container);
  modulo_binary.appendChild(led_container);

  return modulo_binary;
}

aggiungi_modulo(generaBinary());
