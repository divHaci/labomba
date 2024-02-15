function creaMemory() {
  var sequence;
  var blinking;
  let moduloMemory = document.createElement("div");
  moduloMemory.classList.add("memory-module");

  var displayMemory = document.createElement("div");
  displayMemory.classList.add("display-memory");

  var display_index = 0;
  var user_index = 0;
  var userclick = [];
  var delayBetweenSequences = 10;

  let led_container = document.createElement("div")
  led_container.classList.add("led-container");
  let led = document.createElement("div")
  led.classList.add("led")
  led_container.appendChild(led)

  for (let i = 0; i < 9; i++) {
    var square = document.createElement("div");
    square.classList.add("memory-square");
    displayMemory.appendChild(square);
    square.addEventListener("click", function () {
      userclick.push(i);
      if(user_index > 3){
        led.style.backgroundColor = "lime"
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw lime";
        led.style.boxShadow = "0px 0px 2vw 0.5vw lime";
        right.play();
        displayMemory.classList.add("complete")
      }else{
        displayMemory.children[i].style.backgroundColor = "#ffaa00";
        setTimeout(() => {
          displayMemory.children[i].style.backgroundColor = "#30657a";
        }, 300);
        switch (errori.children.length) {
          case 0:
            if (zero_errori[sequence[user_index]] == i) {
              memory.play()
              user_index++;
            } else {
              userclick = [];
              if (errori.children.length < parseInt(max_errori.innerHTML)) {
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
        
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                wrong.play()
              }else{
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                stopTick();
                wrong.play()
                musicLevel.pause()
                explosion.play()
                sconfitta();
              }
            }
          break;
          case 1:
            if (un_errore[sequence[user_index]] == i) {
              user_index++;
              memory.play()
            } else {
              if (errori.children.length < parseInt(max_errori.innerHTML)) {
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                wrong.play()
              }else{
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                stopTick();
                wrong.play()
                explosion.play()
                musicLevel.pause()
                minuteLeft.pause();
                timeLeft.pause()
                sconfitta();
              }
            }
          break;
          case 2:
            if (due_errori[sequence[user_index]] == i) {
              user_index++;
              memory.play();
            } else {
              if (errori.children.length < parseInt(max_errori.innerHTML)) {
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
        
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                wrong.play()
              }else{
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
                led.style.backgroundColor = "red"
                led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                led.style.boxShadow = "0px 0px 2vw 0.5vw red";
                click.pause()
                stopTick();
                wrong.play()
                //explosion.play()
                sconfitta();
              }
            }
          default:
            break;
        }
      }

      console.log(user_index);
    });
  }
  moduloMemory.appendChild(displayMemory);
  moduloMemory.appendChild(led_container);

  startNextSequence();

  function startNextSequence() {
    sequence = newSequenza();
    blinking = setInterval(() => {
      if (display_index >= sequence.length) {
        display_index = 0; // Reset index if it exceeds the array length
      }
      for (let i = 0; i < sequence.length; i++) {
        (function (i) {
          setTimeout(() => {
            displayMemory.children[sequence[i]].style.backgroundColor = "yellow";
            setTimeout(() => {
              displayMemory.children[sequence[i]].style.backgroundColor = "";
            }, 300);
          }, i * 300);
        })(i);
      }
      display_index++;
    }, (sequence.length + 1) * 500 + delayBetweenSequences); // Reduce the total time for each sequence + delay
  }

  return moduloMemory;
}

function newSequenza() {
  var sequence = [];
  var availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  while (availableNumbers.length > 4) {
    var randomIndex = Math.floor(Math.random() * availableNumbers.length);
    var randomNumber = availableNumbers[randomIndex];
    sequence.push(randomNumber);
    availableNumbers.splice(randomIndex, 1);
  }

  return sequence;
}

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

aggiungi_modulo(creaMemory());
