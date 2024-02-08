var moduli = document.querySelectorAll(".container-modulo");

for (var i = 0; i < moduli.length; i++) {
  var modulo = moduli[i];

  // Verifica se l'elemento è vuoto
  if (modulo.innerHTML.trim() === "") {
    // Cambia lo sfondo con un'immagine
    modulo.style.backgroundImage = "url('/img/modulo/placca.jpg')";
    modulo.style.backgroundSize = "cover";
  }
}
