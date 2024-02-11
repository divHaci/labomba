const video = document.getElementById("videoBackground");
const sound = document.getElementById("sound");
const music = document.getElementById("musiMenu");
const links = document.querySelectorAll("ul a");
const audioClick = document.getElementById("audioClick");
const audioHover = document.getElementById("audioHover");

// Inizializza l'audio come pausato
music.pause();

sound.addEventListener("click", () => {
    // Cambia l'icona e gestisci lo stato del suono
    if (music.paused) {
        sound.classList.remove("fa-volume-mute");
        sound.classList.add("fa-volume-up");
        music.play();
    } else {
        sound.classList.remove("fa-volume-up");
        sound.classList.add("fa-volume-mute");
        music.pause();
    }

    clickSound();
});

sound.addEventListener("mouseenter", hoverSound);

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", clickSound);
    links[i].addEventListener("mouseenter", hoverSound);
}

function clickSound() {
    audioClick.play();
}

function hoverSound() {
    audioHover.play();
}

const fullscreenButton = document.getElementById('fullscreenButton');
const fsIcon = document.getElementById('fs');

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        requestFullscreen();
    }
}

function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
    updateFullscreenIcon(true);
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    updateFullscreenIcon(false);
}

function updateFullscreenIcon(isFullscreen) {
    fsIcon.className = isFullscreen ? 'fas fa-solid fa-compress' : 'fas fa-solid fa-expand';
}