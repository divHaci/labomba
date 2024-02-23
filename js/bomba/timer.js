var timerModulo = "Tempo scaduto";

var ticking = new Audio("/sounds/effects/tickingClock.mp3");
var boom = new Audio("/sounds/effects/explosion.mp3");
var musicLevel = new Audio("/sounds/effects/music-level/musicLevel.mp3");
var timeLeft = new Audio("/sounds/effects/10secondsleft.mp3");
var minuteLeft = new Audio("/sounds/effects/music-level/30seconds.mp3");

let intervalId;
musicLevel.play();
musicLevel.volume = 0.08;

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
  display.textContent = `${startingMinutes
    .toString()
    .padStart(2, "0")}:${startingSeconds.toString().padStart(2, "0")}`;

  // Create timer
  timer.appendChild(errori);
  timer.appendChild(display);
  timer.appendChild(display2); // Append the second display

  // Update timer display every second
  let totalSeconds = startingMinutes * 60 + startingSeconds;
  intervalId = setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 1) {
      ticking.volume = 0;
      musicLevel.pause();
      timeLeft.pause();
      minuteLeft.pause();
      document.querySelector(".left-red-light").style.animation = "none";
      document.querySelector(".right-red-light").style.animation = "none";
      document.querySelector(".left-red-light").style.backgroundColor = "red";
      document.querySelector(".right-red-light").style.backgroundColor = "red";
      boom.play();
    }
    if (totalSeconds == 10) {
      ticking.volume = 0;
      document.querySelector(".left-red-light").style.animation =
        "blink 0.1s ease-in-out infinite alternate-reverse";
      document.querySelector(".right-red-light").style.animation =
        "blink 0.1s ease-in-out infinite alternate-reverse";
    }

    if (totalSeconds == 19) {
      document.querySelector(".left-red-light").style.animation =
        "blink 0.5s ease-in-out infinite alternate-reverse";
      document.querySelector(".right-red-light").style.animation =
        "blink 0.5s ease-in-out infinite alternate-reverse";
    }
    if (totalSeconds == 11) {
      timeLeft.play();
    }
    if (totalSeconds == 30) {
      document.querySelector(".left-red-light").style.animation =
        "blink 1s ease-in-out infinite alternate";
      document.querySelector(".right-red-light").style.animation =
        "blink 1s ease-in-out infinite alternate";
      minuteLeft.play();
      musicLevel.volume = 0.09;
    }
    if (totalSeconds == 27) {
      musicLevel.pause();
    }
    if (totalSeconds < 0) {
      clearInterval(intervalId);
      display.textContent = "00:00";
      sconfitta(timerModulo);
    } else {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    if (totalSeconds == 350) {
      musicLevel.play();
    }

    if (totalSeconds == 650) {
      musicLevel.play();
    }
    ticking.play();
  }, 1000);

  return timer;
}

var starting_minutes = parseInt(
  document.querySelector(".starting-minutes").innerHTML
);
var starting_seconds = parseInt(
  document.querySelector(".starting-seconds").innerHTML
);

aggiungi_modulo(crea_timer(starting_minutes, starting_seconds));

function stopTick() {
  ticking.volume = 0;
  clearInterval(intervalId);
}

var errori = document.querySelector(".errori");
var max_errori = document.querySelector(".max-errori");
