function getLevelInfo(level) {
  console.log(level);
  var tab = document.querySelector(".level-info");
  tab.style.display = "flex";

  tab.querySelector(".max-time").innerHTML = info[level - 1].tempo;
  tab.querySelector(".n-moduli").innerHTML = info[level - 1].moduli;
  tab.querySelector(".n-max-errori").innerHTML = info[level - 1].errori;
  tab.querySelector(".difficulty").innerHTML = info[level - 1].difficolta;
  tab.querySelector(".level-title").innerHTML = info[level - 1].difficolta;
  tab.querySelector(".level-title").innerHTML = info[level - 1].nome;
  tab.querySelector(".level-desc-1").innerHTML = info[level - 1].desc1;
  tab.querySelector(".level-desc-2").innerHTML = info[level - 1].desc2;
  tab
    .querySelector(".level-link")
    .setAttribute("href", "/html/bomba/livello" + level + ".html");

  var minutesKey = "level" + level + "Minutes";
  var secondsKey = "level" + level + "Seconds";

  // Get the previously saved best time
  var savedMinutes = localStorage.getItem(minutesKey);
  var savedSeconds = localStorage.getItem(secondsKey);

  console.log(
    "Best time for level " + level + ": " + savedMinutes + ":" + savedSeconds
  );

  if (
    localStorage.getItem("level" + level + "Minutes") != null &&
    localStorage.getItem("level" + level + "Seconds") != null
  ) {
    const formattedMinutes =
      savedMinutes < 10 ? "0" + savedMinutes : savedMinutes;
    const formattedSeconds =
      savedSeconds < 10 ? "0" + savedSeconds : savedSeconds;

    tab.querySelector(".record-for-level").innerHTML =
      formattedMinutes + ":" + formattedSeconds;
  } else {
    tab.querySelector(".record-for-level").innerHTML = "NOT SET";
  }
}
