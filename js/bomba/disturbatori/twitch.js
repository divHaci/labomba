var twitchDisturbatore = "Disturbatore Streamer Twitch";
var soundStart = new Audio("/sounds/effects/twitch.mp3");

function createDataList() {
  let div = document.createElement("div");
  div.innerHTML =
    "<datalist id='streamer'>" +
    "<option value='Tumblurr'>" +
    "<option value='TheRealMarza'>" +
    "<option value='Mollu'>" +
    "<option value='Freneh'>" +
    "<option value='Dario Moccia'>" +
    "<option value='ilMasseo'>" +
    "<option value='JTaz'>" +
    "<option value='Kurolily'>" +
    "<option value='NanniTwitch'>" +
    "<option value='DavidRubino'>" +
    "<option value='Zazzone230'>" +
    "<option value='ZanoXVII'>" +
    "<option value='Xiuder_'>" +
    "</datalist>";

  document.querySelector("body").appendChild(div);
}

function creaTwitch() {
  let moduloTwitch = document.createElement("div");
  moduloTwitch.classList.add("twitch-module");
  var display = document.createElement("div");
  display.classList.add("twitch-display");

  var random = Math.floor(Math.random() * streamer.length);

  var spectText = document.createElement("div");
  spectText.classList.add("spect-text");
  var subText = document.createElement("div");
  subText.classList.add("sub-text");
  var viewsText = document.createElement("div");
  viewsText.classList.add("views-text");
  var followersText = document.createElement("div");
  followersText.classList.add("followers-text");

  spectText.innerHTML =
    spettatori[random] + "<img src='/img/modulo/spect.svg'/>";
  subText.innerHTML = sub[random] + "<img src='/img/modulo/sub.svg'/>";
  viewsText.innerHTML = views[random] + "<img src='/img/modulo/views.svg'/>";
  followersText.innerHTML =
    followers[random] + "<img src='/img/modulo/followers.svg'/>";

  followersText.classList.add("hidden");
  viewsText.classList.add("hidden");
  spectText.classList.add("hidden");
  subText.classList.add("hidden");

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.setAttribute("list", "streamer");
  let submit = document.createElement("button");
  submit.classList.add("submit");
  submit.innerText = "→";
  var clicked = false;
  var twitch = setInterval(() => {
    if (esploso) {
      clearInterval(twitch);
    }
    followersText.classList.remove("hidden");
    viewsText.classList.remove("hidden");
    spectText.classList.remove("hidden");
    subText.classList.remove("hidden");
    soundStart.pause();
    soundStart.currentTime = 0;
    soundStart.play();

    //SECONDS
    var i = 40;
    var timer = setInterval(() => {
      display.innerHTML = i;
      if (i == 0) clearInterval(timer);
      i = i - 1;
    }, 1000);
    setTimeout(() => {
      if (!clicked) {
        display.innerHTML = "ERROR";
        display.style.background =
          "radial-gradient(50% 50% at 50% 50%, #311414 0%, #851111 100%)";
        setTimeout(() => {
          display.innerHTML = "";
          display.style.background =
            "radial-gradient(50% 50% at 50% 50%, #292929 0%, #000000 100%)";
        }, 1000);

        clicked = false;
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        wrong.play();
      } else {
        display.innerHTML = "";
      }
      followersText.classList.add("hidden");
      viewsText.classList.add("hidden");
      spectText.classList.add("hidden");
      subText.classList.add("hidden");
    }, 41500);
    random = Math.floor(Math.random() * streamer.length);
    spectText.innerHTML =
      spettatori[random] + "<img src='/img/modulo/spect.svg'/>";
    subText.innerHTML = sub[random] + "<img src='/img/modulo/sub.svg'/>";
    viewsText.innerHTML = views[random] + "<img src='/img/modulo/views.svg'/>";
    followersText.innerHTML =
      followers[random] + "<img src='/img/modulo/followers.svg'/>";
  }, 90000);

  submit.addEventListener("click", () => {
    clicked = true;
    if (inputText.value == streamer[random]) {
      display.style.background =
        "radial-gradient(50% 50% at 50% 50%, #34452b 0%, #17570e 100%)";
      setTimeout(() => {
        display.style.background =
          "radial-gradient(50% 50% at 50% 50%, #292929 0%, #000000 100%)";
      }, 1000);
      right.play();
    } else {
      display.style.background =
        "radial-gradient(50% 50% at 50% 50%, #311414 0%, #851111 100%)";
      setTimeout(() => {
        display.style.background =
          "radial-gradient(50% 50% at 50% 50%, #292929 0%, #000000 100%)";
      }, 1000);
      if (errori.children.length < parseInt(max_errori.innerHTML)) {
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        wrong.play();
      } else {
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        click.pause();
        stopTick();
        wrong.play();
        musicLevel.pause();
        explosion.play();
        minuteLeft.pause();
        timeLeft.pause();
        sconfitta(twitchDisturbatore);
      }
    }

    inputText.value = "";
  });
  inputContainer.appendChild(inputText);
  inputContainer.appendChild(submit);

  moduloTwitch.appendChild(display);
  moduloTwitch.appendChild(inputContainer);
  moduloTwitch.appendChild(spectText);
  moduloTwitch.appendChild(subText);
  moduloTwitch.appendChild(viewsText);
  moduloTwitch.appendChild(followersText);

  return moduloTwitch;
}
createDataList();

aggiungi_modulo(creaTwitch());
