function getLevelInfo(level) {
  console.log(level);
  var tab = document.querySelector(".level-info");
  tab.style.display = "flex";

  tab.querySelector(".time").innerHTML = info[level].tempo;
  tab.querySelector(".n-moduli").innerHTML = info[level].moduli;
  tab.querySelector(".n-max-errori").innerHTML = info[level].errori;
  tab.querySelector(".difficulty").innerHTML = info[level].difficolta;
  tab.querySelector(".level-title").innerHTML = info[level].difficolta;
  tab.querySelector(".level-title").innerHTML = info[level].nome;
  tab.querySelector(".level-desc-1").innerHTML = info[level].desc1;
  tab.querySelector(".level-desc-2").innerHTML = info[level].desc2;
}
