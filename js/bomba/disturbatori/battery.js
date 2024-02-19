// Create battery element
const battery = document.createElement("div");
battery.className = "battery";

// Create level element
const level = document.createElement("div");
level.className = "level";

// Append level to battery
battery.appendChild(level);

// Append battery to body
document.body.appendChild(battery);

// Initialize battery energy and charging status
let energy = 100;
let charging = false;
let timer;
let timerRunning = false; // New flag to track if the timer is running

// Update battery function
function updateBattery() {
  if (energy <= 0) {
    if (!esploso) {
      musicLevel.pause();
      click.pause();
      stopTick();
      wrong.play();
      explosion.play();
      sconfitta("battery");
      clearInterval(timer);
      timerRunning = false; // Reset timerRunning flag
    }
    return;
  }

  let color;
  if (charging) {
    energy += 0.01;
    if (energy > 100) energy = 100;
  } else {
    energy -= 0.01;
    if (energy < 0) energy = 0;
  }

  // Calculate color based on energy level
  if (energy >= 75) {
    color = "lime";
  } else if (energy >= 50) {
    color = "yellow";
  } else if (energy >= 25) {
    color = "orange";
  } else {
    color = "red";
  }

  level.style.backgroundColor = color;
  level.style.height = energy + "%";
}

// Start timer
function startTimer() {
  timer = setInterval(updateBattery, 1);
}

// Event listeners for mouse actions
// Event listener for mouse hover
battery.addEventListener("mouseover", function () {
  if (!timerRunning) {
    charging = true;
    startTimer();
    timerRunning = true;
  }
});

// Event listener for mouse leave
battery.addEventListener("mouseleave", function () {
  if (timerRunning) {
    charging = false;
    clearInterval(timer);
    timerRunning = false;
  }
});

// Initial function call
startTimer();
