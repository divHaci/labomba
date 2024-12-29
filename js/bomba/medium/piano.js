var pianoforte = "Modulo Pianoforte";

function play_note(song, randomIndex, note) {
  song.pause();
  note = note + 1;
  song.currentTime = note * songs[randomIndex]["beat"];
  song.volume = 0.3;
  song.play();

  setTimeout(() => {
    song.pause();
  }, songs[randomIndex]["beat"] * 1000);

  return note;
}

function creaPiano() {
  var randomIndex;
  var note = -1;

  var sum = parseInt(document.querySelector(".sum-cifre").innerHTML);
  var lastDigit = parseInt(
    serialcode.codiceSeriale.charAt(serialcode.codiceSeriale.length - 1)
  );
  var firstSumDigit = parseInt(sum.toString().charAt(0));
  const middleCharCode = "M".charCodeAt(0);

  // Ottieni il codice ASCII del primo carattere del codice seriale
  const firstCharCode = serialcode.codiceSeriale
    .charAt(0)
    .toUpperCase()
    .charCodeAt(0);

  const letterFirstHalf = firstCharCode < middleCharCode;

  if (lastDigit % 2 != 0) {
    if (sum > 20 && parallelExist) {
      "The sum is over 20 and the parallel port exists";
      randomIndex = 0;
    } else if (sum < 20 && !SerialExist && !PS2Exist) {

      
      randomIndex = 1;
    } else if (!letterFirstHalf && RJ45Exist) {
      console.log("The first letter of the serial code is in the second half of the alphabet and the RJ45 port exists");
      
      randomIndex = 2;
    } else if (!RJ45Exist && PS2Exist) {
      console.log("The RJ45 port doesn't exist and the PS/2 port exists");
      randomIndex = 3;
    } else if (sum % 2 == 0) {
      log("The sum is even");
      randomIndex = 4;
    } else if (sum % 2 != 0) {
      log("The sum is odd");
      randomIndex = 5;
    }
  } else {
    if (PS2Exist && DVIDExist) {
      console.log("The PS/2 and DVI-D ports exist");
      randomIndex = 6;
    } else if (sum > 15 && SerialExist) {
      console.log("The sum is over 15 and the serial port exists");
      
      randomIndex = 7;
    } else if (sum < 15 && DVIDExist) {
      console.log("The sum is under 15 and the DVI-D port exists");
      randomIndex = 8;
    } else if (letterFirstHalf && RJ45Exist) {
      console.log("The first letter of the serial code is in the first half of the alphabet and the RJ45 port exists");
      randomIndex = 9;
    } else if (sum % 2 == 0) {
      console.log("The sum is even");
      randomIndex = 10;
    } else if (sum % 2 != 0) {
      console.log("The sum is odd");
      randomIndex = 11;
    }
  }

  var song = new Audio(
    "/sounds/modulo_piano/" + songs[randomIndex]["name"] + ".mp3"
  );

  var sequence = songs[randomIndex]["notes"];
  const notes = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI"];
  const diesis = ["DO#", "RE#", "", "FA#", "SOL#", "LA#"];
  let modulo = document.createElement("div");
  modulo.classList.add("piano-module");

  let piano = document.createElement("div");
  piano.classList.add("piano");

  let whites = document.createElement("div");
  whites.classList.add("whites");

  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");
  led_container.appendChild(led);

  let allkeys = [];

  function disableAllKeysExcept(correctKey) {
    correctKey.style.pointerEvents = "none";
    allkeys.forEach((item, index) => {
      if (item !== correctKey) {
        if (index < 7) {
          item.classList.add("disable-white");
        } else {
          item.classList.add("disable-black");
        }
        item.style.pointerEvents = "none";
      }
    });
  }

  function enableAllKeys() {
    allkeys.forEach((item, index) => {
      if (index < 7) {
        item.classList.remove("disable-white");
      } else {
        item.classList.remove("disable-black");
      }
      if (sequence.length != 0) {
        item.style.pointerEvents = "all";
      }
    });
  }

  for (let i = 0; i < notes.length; i++) {
    let key = document.createElement("div");
    key.classList.add("white-key");
    key.innerHTML = notes[i];
    key.addEventListener("click", () => {
      if (notes[i] == sequence[0]) {
        disableAllKeysExcept(key);
        sequence.shift();
        if (sequence.length == 0) {
          piano.classList.add("complete");
          led.style.backgroundColor = "lime";
          led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
          led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
          right.play();
          checkForWin();
        }
        note = play_note(song, randomIndex, note);
        setTimeout(enableAllKeys, songs[randomIndex]["beat"] * 1000);
      } else {
        key.classList.add("key-error");
        setTimeout(() => {
          key.classList.remove("key-error");
        }, 500);
        enableAllKeys(); // Re-enable all keys after wrong click
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
          sconfitta(pianoforte);
        }
      }
    });
    allkeys.push(key);
    whites.appendChild(key);
  }

  let blacks = document.createElement("div");
  blacks.classList.add("blacks");

  for (let i = 0; i < diesis.length; i++) {
    let key = document.createElement("div");
    key.classList.add("black-key");
    if (i == 2) {
      key.classList.add("invisible");
    }
    key.innerHTML = diesis[i];
    key.addEventListener("click", () => {
      if (diesis[i] == sequence[0]) {
        disableAllKeysExcept(key);
        sequence.shift();
        if (sequence.length == 0) {
          piano.classList.add("complete");
          led.style.backgroundColor = "lime";
          led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
          led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
          right.play();
          checkForWin();
        }
        note = play_note(song, randomIndex, note);
        setTimeout(enableAllKeys, songs[randomIndex]["beat"] * 1000);
      } else {
        key.classList.add("key-error");
        setTimeout(() => {
          key.classList.remove("key-error");
        }, 500);
        console.error("CUJUNE");
        enableAllKeys();
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
          sconfitta(pianoforte);
        }
      }
    });
    if (i != 2) {
      allkeys.push(key);
    }
    blacks.appendChild(key);
  }

  piano.appendChild(blacks);
  piano.appendChild(whites);
  modulo.appendChild(piano);
  modulo.appendChild(led_container);
  return modulo;
}

// Assuming you have aggiungi_modulo function defined somewhere
aggiungi_modulo(creaPiano());
