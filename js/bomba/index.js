const video = document.getElementById("videoBackground");
const sound = document.getElementById("sound");
const music = document.getElementById("musiMenu");
const links = document.querySelectorAll("ul a");
const audioClick = document.getElementById("audioClick");
const audioHover = document.getElementById("audioHover");
const volumeRange = document.getElementById("volumeRange");

// Inizializza l'audio come pausato
music.pause();

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
    music.volume = volumeRange.value / 100;
});

function clickSound() {
    audioClick.play();
}

function hoverSound() {
    audioHover.play();
}

function hideArrow() {
    const arrow = document.querySelector('.arrow');
    arrow.style.color = 'transparent';
}

function showArrow() {
    const arrow = document.querySelector('.arrow');
    arrow.style.color = 'white';
}

function showVolumeBar() {
    volumeRange.style.display = 'block';
}

function hideVolumeBar() {
    volumeRange.style.display = 'none';
}
