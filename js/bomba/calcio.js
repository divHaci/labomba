var calcio = "Modulo Rigori";
function creaClacio() {
  let randomPose = Math.floor(Math.random() * combinations.length);
  let modulo = document.createElement("div");
  modulo.classList.add("penalty-module");

  let container = document.createElement("div");
  container.classList.add("penalty-container");

  let post = document.createElement("img");
  post.classList.add("post");
  post.src = "/img/modulo/calcio/porta.png";
  post.setAttribute("draggable", "false");

  let hamb = document.createElement("img");
  hamb.classList.add("hamb");
  hamb.src =
    "/img/modulo/calcio/" + combinations[randomPose]["combination"] + ".png";
  hamb.setAttribute("draggable", "false");

  var targets = document.createElement("div");
  targets.classList.add("targets");

  for (let i = 0; i < 9; i++) {
    let target = document.createElement("div");
    target.classList.add("target");
    targets.appendChild(target);
    target.addEventListener("click", () => {
      if (i == combinations[randomPose]["shot"]) {
        led.style.backgroundColor = "lime";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
        led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
        modulo.children[0].classList.add("complete");
        right.play();

        //CHECK FOR WIN
        checkForWin();
      } else {
        if (errori.children.length < parseInt(max_errori.innerHTML)) {
          var x = document.createElement("div");
          x.innerHTML = "X";
          errori.appendChild(x);

          led.style.backgroundColor = "red";
          led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
          led.style.boxShadow = "0px 0px 2vw 0.5vw red";
          wrong.play();
        } else {
          led.style.backgroundColor = "red";
          led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
          led.style.boxShadow = "0px 0px 2vw 0.5vw red";
          click.pause();
          stopTick();
          wrong.play();
          musicLevel.pause();
          explosion.play();
          minuteLeft.pause();
          timeLeft.pause();
          sconfitta(calcio);
        }
      }
    });
    if (i == 4 || i == 1 || i == 7) {
      target.classList.add("invisible");
    }
  }

  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");
  led_container.appendChild(led);

  container.appendChild(targets);
  container.appendChild(hamb);
  container.appendChild(post);
  modulo.appendChild(container);
  modulo.appendChild(led_container);

  return modulo;
}

aggiungi_modulo(creaClacio());
