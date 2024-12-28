//check id all document has loaded then log "loaded"
function checkEmptyModule() {
  var moduli = document.querySelectorAll(".bomba .container-modulo");
  console.log(moduli);
    moduli.forEach(modulo => {
      console.log(modulo.hasChildNodes());
    
      if (!modulo.hasChildNodes()) {
        modulo.style.backgroundImage = "url('/img/modulo/placca.jpg')";
        modulo.style.backgroundSize = "cover";
      }
    });

    console.log("Luca Marelli - Check avvenuto");
    
}