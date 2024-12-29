//check id all document has loaded then log "loaded"
function checkEmptyModule() {
  var moduli = document.querySelectorAll(".bomba .container-modulo");
    moduli.forEach(modulo => {
    
      if (!modulo.hasChildNodes()) {
        modulo.style.backgroundImage = "url('/img/modulo/placca.jpg')";
        modulo.style.backgroundSize = "cover";
      }
    });    
}