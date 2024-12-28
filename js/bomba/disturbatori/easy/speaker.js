function creaSpeaker() {
  const speaker = document.createElement("div");
  speaker.className = "speaker";
  document.body.appendChild(speaker);

  return speaker;
}

var audioTracks = [
  new Audio("../../sounds/effects/disturbatori/aaaaa.mp3"),
  new Audio("../../sounds/effects/disturbatori/aaaaCiccio.mp3"),
  new Audio("../../sounds/effects/disturbatori/domandina.mp3"),
  new Audio("../../sounds/effects/disturbatori/easy.mp3"),
  new Audio("../../sounds/effects/disturbatori/osimhen.mp3"),
  new Audio("../../sounds/effects/disturbatori/urloSium.mp3"),
];

var currentTrack = null;

function playRandomTrack() {
  if (!esploso) {
    var randomIndex = Math.floor(Math.random() * audioTracks.length);
    var selectedTrack = audioTracks[randomIndex];

    // Imposta il loop sulla traccia selezionata
    selectedTrack.loop = true;

    // Riproduci la traccia
    selectedTrack.play();

    // Assegna la traccia corrente
    currentTrack = selectedTrack;

    // Aggiungi la classe "active" allo speaker quando l'audio è attivo
    speaker.classList.add("active");

    // Aggiungi un gestore di evento per la fine della traccia
    currentTrack.addEventListener("ended", function onEnded() {
      // Rimuovi il gestore dell'evento "ended"
      currentTrack.removeEventListener("ended", onEnded);

      // Rimuovi la classe "active" quando l'audio è in pausa
      speaker.classList.remove("active");

      // Una volta che la traccia corrente è terminata, avvia un'altra traccia casuale dopo 3-6 secondi
      startRandomPlayback();
    });
  }
}

function startRandomPlayback() {
  // Attendi un periodo casuale tra 1:10 (70 secondi) e 2:30 (150 secondi)
  var randomDelay = Math.floor(Math.random() * (150000 - 70000 + 1)) + 70000;

  // Avvia la riproduzione casuale dopo il ritardo
  setTimeout(function () {
    playRandomTrack();
  }, randomDelay);
}

function onEnded() {
  // Rimuovi il gestore dell'evento "ended"
  currentTrack.removeEventListener("ended", onEnded);

  // Una volta che la traccia corrente è terminata, avvia un'altra traccia casuale dopo 3-6 secondi
  startRandomPlayback();
}

// Crea lo speaker
var speaker = creaSpeaker();

// Chiamare la funzione per avviare il processo
startRandomPlayback();

// ...

speaker.addEventListener("click", function () {
  if (currentTrack) {
    // Interrompi la traccia corrente
    currentTrack.pause();
    currentTrack.currentTime = 0; // Riporta il tempo di riproduzione a 0
    currentTrack.removeEventListener("ended", onEnded); // Rimuovi il gestore dell'evento "ended"

    // Rimuovi la classe "active" quando l'audio è in pausa
    speaker.classList.remove("active");

    // Esegui un'animazione al contrario (una sola volta)
    speaker.classList.add("reverse-pulse");
    setTimeout(function () {
      speaker.classList.remove("reverse-pulse");
    }, 1000); // Durata dell'animazione in millisecondi (1s nel tuo caso)

    // Avvia un nuovo audio casuale dopo 3-6 secondi
    startRandomPlayback();
  }
});
