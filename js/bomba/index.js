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
        hideArrow();
    } else {
        sound.classList.remove("fa-volume-up");
        sound.classList.add("fa-volume-mute");
        music.pause();
        showArrow();
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

function hideArrow() {
    const arrow = document.querySelector('.arrow');
    arrow.style.color = 'transparent';
}

function showArrow() {
    const arrow = document.querySelector('.arrow');
    arrow.style.color = 'white';
}
