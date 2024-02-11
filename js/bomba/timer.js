// Creazione del modulo time

var ticking = new Audio("/sounds/effects/tickingClock.mp3")
var boom = new Audio("/sounds/effects/explosion.mp3")

let intervalId;

function crea_timer(startingMinutes, startingSeconds) {
    let timer = document.createElement("div");
    timer.classList.add("timer");

    let errori = document.createElement("div");
    errori.classList.add("errori");

    let display = document.createElement("div");
    display.classList.add("display");

    let display2 = document.createElement("div"); // Create a second display
    display2.classList.add("display"); // Apply the same class as the original display
    display2.classList.add("display2"); // Additional class to distinguish it
    display2.textContent = "88:88"; // Initial value for the second display

    // Initialize timer display with starting values
    display.textContent = `${startingMinutes.toString().padStart(2, '0')}:${startingSeconds.toString().padStart(2, '0')}`;

    // Create timer
    timer.appendChild(errori);
    timer.appendChild(display);
    timer.appendChild(display2); // Append the second display

    // Update timer display every second
    let totalSeconds = startingMinutes * 60 + startingSeconds;
    intervalId = setInterval(() => {
        totalSeconds--;
        if(totalSeconds == 0){
            ticking.volume = 0
            boom.play()
        }
        if (totalSeconds < 0) {
            clearInterval(intervalId);
            display.textContent = "00:00";

        } else {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        //ticking.play()
    }, 1000);

    return timer;
}

// Aggiunge il modulo timer a un container casuale tra i 12

function aggiungi_modulo(modulo) {
    var empty = true;
    var containers = document.querySelectorAll(".container-modulo");
    var random_container = Math.floor(Math.random()*containers.length);
    while(empty){
        if(containers[random_container].children.length == 0){
            containers[random_container].appendChild(modulo)
            empty = false;
        }else{
            random_container = Math.floor(Math.random()*containers.length);
        }
    }
}

var starting_minutes = parseInt(document.querySelector(".starting-minutes").innerHTML)
var starting_seconds = parseInt(document.querySelector(".starting-seconds").innerHTML)

aggiungi_modulo(crea_timer(starting_minutes, starting_seconds))

function stopTick() {
    ticking.volume = 0;
    clearInterval(intervalId)
}