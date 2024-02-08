// Aggiunge il modulo timer a un container casuale tra i 12
var errori = document.querySelector(".errori")
var max_errori = document.querySelector(".max-errori");

function creaPressIt(solution) {
    let button = document.createElement("div");
    button.classList.add("press-it-button");

    let label = document.createElement("div");
    label.classList.add("press-it-label");

    label.innerHTML = solution;

    button.setAttribute("onclick", "newClick()");

    return button;
}

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

function creaTimer(durationInSeconds) {
    let timer = document.createElement("div");
    timer.classList.add("press-it-timer");

    let display = document.createElement("div");
    display.classList.add("press-it-display");

    // Initialize timer display with starting value
    display.textContent = formatTime(durationInSeconds);

    // Function to handle timer completion and reset
    function handleTimerCompletion() {
        clearInterval(intervalId); // Clear the current interval
        if (count !== solution) {
            if (errori.children.length < parseInt(max_errori.innerHTML)) {
                var x = document.createElement("div");
                x.innerHTML = "X";
                errori.appendChild(x);
            } else {
                // Handle explosion when there's no space for more errors
                console.log("ESPLODI");
            }
            remainingTime = durationInSeconds; // Reset remainingTime to initial duration
            display.textContent = formatTime(remainingTime); // Update display
            intervalId = setInterval(updateTimer, 1000); // Start a new interval
        }
    }

    // Function to update timer display
    function updateTimer() {
        remainingTime--;
        display.textContent = formatTime(remainingTime);
        if (remainingTime === 0) {
            handleTimerCompletion();
        }
    }

    // Start the timer interval
    let remainingTime = durationInSeconds;
    let intervalId = setInterval(updateTimer, 1000);

    timer.appendChild(display);
    return timer;
}



function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

var solution = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
console.log(solution);
var btn = creaPressIt(solution)
btn.appendChild(creaTimer(0 * 60 + 10));
aggiungi_modulo(btn);
var count = 0;


function newClick() {
    count ++;
    console.log(count);
}