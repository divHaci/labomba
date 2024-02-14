var clickPwd = new Audio("../../sounds/effects/clickPassword.mp3");


function creaPassword() {
  var randomIndex = Math.floor(Math.random() * passwords.length);
  var randomWord = passwords[randomIndex]["word"];
  let password_modulo = document.createElement("div");
  password_modulo.classList.add("password-module");

  let slots = [[], [], [], [], []];

  // FILL ALL THE SLOTS RANDOMICALLY
  for (let i = 0; i < slots.length; i++) {
    for (let j = 0; j < 7; j++) {
      slots[i][j] = characters[Math.floor(Math.random() * characters.length)];
    }
  }

  // PUT THE CORRECT WORD LETTERS
  let indexes = [0, 0, 0, 0, 0];
  for (let i = 0; i < slots.length; i++) {
    slots[i][Math.floor(Math.random() * slots[i].length)] =
      passwords[randomIndex]["letters"][i];
  }

  let display = document.createElement("div");
  display.classList.add("display-password");

  let slots_display = document.createElement("div");
  slots_display.classList.add("slots-display");

  for (let i = 0; i < 5; i++) {
    let slot = document.createElement("div");
    slot.innerHTML = slots[i][0];
    slot.classList.add("slot");
    slots_display.appendChild(slot);
  }

  let button_left = document.createElement("div");
  button_left.classList.add("buttons-pass");
  let button_right = document.createElement("div");
  button_right.classList.add("buttons-pass");

  for (let i = 0; i < 5; i++) {
    var arrowL = document.createElement("button");
    arrowL.innerText = "▲";
    arrowL.addEventListener("click", function () {
      back(i, slots, indexes, slots_display);
      clickPwd.pause();
      clickPwd.currentTime = 0;
      clickPwd.play();
    });
    button_left.appendChild(arrowL);

    var arrowR = document.createElement("button");
    arrowR.innerText = "▼";
    arrowR.addEventListener("click", function () {
      ford(i, slots, indexes, slots_display);
      clickPwd.pause();
      clickPwd.currentTime = 0;
      clickPwd.play();
    });
    button_right.appendChild(arrowR);
  }

  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");

  let submit = document.createElement("button");
  submit.classList.add("submit-password");
  submit.innerText = "INVIO";
  submit.addEventListener("click", function () {
    check(slots, indexes, led); 
  });

  display.appendChild(button_left);
  display.appendChild(slots_display);
  display.appendChild(button_right);
  password_modulo.appendChild(display);
  password_modulo.appendChild(submit);
  password_modulo.appendChild(led_container);
  led_container.appendChild(led);
  return password_modulo;
}

function back(slotIndex, slots, indexes, slots_display) {
  indexes[slotIndex] =
    (indexes[slotIndex] - 1 + slots[slotIndex].length) %
    slots[slotIndex].length;
  updateDisplay(slotIndex, slots, indexes, slots_display);
}

function ford(slotIndex, slots, indexes, slots_display) {
  indexes[slotIndex] = (indexes[slotIndex] + 1) % slots[slotIndex].length;
  updateDisplay(slotIndex, slots, indexes, slots_display);
}

function updateDisplay(slotIndex, slots, indexes, slots_display) {
  // Update display with new letter for the specific slot
  slots_display.children[slotIndex].innerText =
    slots[slotIndex][indexes[slotIndex]];
}


function check(slots, indexes, led) {
  // Pass led as a parameter
  var userword = "";
  for (let i = 0; i < slots.length; i++) {
    userword += slots[i][indexes[i]];
  }

  if (isWordInPasswords(userword)) {
    led.style.backgroundColor = "lime";
    led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
    led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
    right.play();
    console.log(userword + " is in the passwords array.");
  } else {
    if (errori.children.length < parseInt(max_errori.innerHTML)) {
      var x = document.createElement("div");
      x.innerHTML = "X";
      errori.appendChild(x);
      led.style.backgroundColor = "red";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
      led.style.boxShadow = "0px 0px 2vw 0.5vw red";
      wrong.play();
      console.log(userword + " is not in the passwords array.");
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
      sconfitta();
    }
  }
}

function isWordInPasswords(word) {
  for (let i = 0; i < passwords.length; i++) {
    if (passwords[i]["word"] === word) {
      return true; // Word found in passwords
    }
  }
  return false; // Word not found in passwords
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

aggiungi_modulo(creaPassword());
