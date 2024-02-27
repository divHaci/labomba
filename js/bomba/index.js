const video = document.getElementById("videoBackground");
const sound = document.getElementById("sound");
const music = document.getElementById("musiMenu");
const links = document.querySelectorAll("ul a");
const audioClick = document.getElementById("audioClick");
const audioHover = document.getElementById("audioHover");
const volumeRange = document.getElementById("volumeRange");

// Inizializza l'audio come non mutato

// Inverti la classe all'inizio
sound.classList.remove("fa-volume-mute");
sound.classList.add("fa-volume-up");

// Nascondi la freccia all'inizio
hideArrow();
showVolumeBar();

sound.addEventListener("click", () => {
  // Cambia l'icona e gestisci lo stato del suono
  if (music.paused) {
    sound.classList.remove("fa-volume-mute");
    sound.classList.add("fa-volume-up");
    music.play();
    hideArrow();
    showVolumeBar();
  } else {
    sound.classList.remove("fa-volume-up");
    sound.classList.add("fa-volume-mute");
    music.pause();
    showArrow();
    hideVolumeBar();
  }

  clickSound();
});

sound.addEventListener("mouseenter", hoverSound);

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", clickSound);
  links[i].addEventListener("mouseenter", hoverSound);
}

volumeRange.addEventListener("input", () => {
  // Imposta il volume dell'audio in base al valore dell'input range (da 0 a 1)
  localStorage.setItem("volume", volumeRange.value);
  music.volume = volumeRange.value / 100;
});

window.addEventListener("load", () => {
  if (localStorage.getItem("volume") != null) {
    var volume = localStorage.getItem("volume");
    music.volume = volume / 100;
  }
});

function clickSound() {
  audioClick.pause();
  audioClick.currentTime = 0;
  audioClick.play();
}

function hoverSound() {
  audioHover.pause();
  audioHover.currentTime = 0;
  audioHover.play();
}

function hideArrow() {
  const arrow = document.querySelector(".arrow");
  arrow.style.color = "transparent";
}

function showArrow() {
  const arrow = document.querySelector(".arrow");
  arrow.style.color = "white";
}

function showVolumeBar() {
  volumeRange.style.display = "block";
}

function hideVolumeBar() {
  volumeRange.style.display = "none";
}
