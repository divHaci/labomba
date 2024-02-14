function creaPassword() {
    var randomIndex = Math.floor(Math.random()*passwords.length);
    var randomWord = passwords[randomIndex]["word"];
    let password_modulo = document.createElement("div");
    password_modulo.classList.add("password-module");

    let slots = [[],[],[],[],[]];
    

    // FILL ALL THE SLOTS RANDOMICALLY
    for (let i = 0; i < slots.length; i++) {
        for (let j = 0; j < 5; j++) {    
            slots[i][j] = characters[Math.floor(Math.random()*characters.length)];
        }
    }

    // PUT THE CORRECT WORD LETTERS
    let indexes = [0, 0, 0, 0, 0];
    for (let i = 0; i < slots.length; i++) {
        slots[i][Math.floor(Math.random()*slots[i].length)] = passwords[randomIndex]["letters"][i];
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
        arrowL.innerText = "◀";
        arrowL.addEventListener("click", function() {
            back(i, slots, indexes);
        });
        button_left.appendChild(arrowL);

        var arrowR = document.createElement("button");
        arrowR.innerText = "▶";
        arrowR.addEventListener("click", function() {
            ford(i, slots, indexes);
        });
        button_right.appendChild(arrowR);
    }

    let submit = document.createElement("button");
    submit.classList.add("submit-password");
    submit.innerText = "INVIO";
    submit.addEventListener("click", function() {
        check(randomWord, slots, indexes);
    });

    display.appendChild(button_left);
    display.appendChild(slots_display);
    display.appendChild(button_right);
    password_modulo.appendChild(display);
    password_modulo.appendChild(submit)
    return password_modulo;
}

function back(slotIndex, slots, indexes) {
    indexes[slotIndex] = (indexes[slotIndex] - 1 + slots[slotIndex].length) % slots[slotIndex].length;
    updateDisplay(slotIndex, slots, indexes);
}

function ford(slotIndex, slots, indexes) {
    indexes[slotIndex] = (indexes[slotIndex] + 1) % slots[slotIndex].length;
    updateDisplay(slotIndex, slots, indexes);
}

function updateDisplay(slotIndex, slots, indexes) {
    let slots_display = document.querySelectorAll(".slots-display .slot");

    // Update display with new letter for the specific slot
    slots_display[slotIndex].innerText = slots[slotIndex][indexes[slotIndex]];
}

function check(correctWord, slots, indexes) {
    var userword = "";
    for (let i = 0; i < slots[0].length; i++) {
        userword += slots[i][indexes[i]];
    }

    if(userword == correctWord){
        console.log("giusto");
    }else{
        console.log("sbagliato");
    }
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

aggiungi_modulo(creaPassword());
