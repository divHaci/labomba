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
  inputText.disabled = true;
  inputText.style.cursor = "default";
  inputContainer.style.filter = "blur(0.3vw)";
  inputText.setAttribute("list", "streamer");

  var clicked = false;

  inputText.addEventListener("input", () => {
    // Check if the timer has expired
    if (display.innerHTML !== "") {
      clicked = true;
    }
  });

  var twitch = setInterval(() => {
    if (esploso) {
      clearInterval(twitch);
    }
    followersText.classList.remove("hidden");
    viewsText.classList.remove("hidden");
    spectText.classList.remove("hidden");
    subText.classList.remove("hidden");
    inputContainer.style.filter = "";
    inputText.disabled = false;
    inputText.style.cursor = "text";
    soundStart.pause();
    soundStart.currentTime = 0;
    soundStart.play();

    // SECONDS
    var i = 25; //25 seconds
    var timer = setInterval(() => {
      display.innerHTML = i;
      if (i === 0) {
        clearInterval(timer);
        // Moved input validation outside setTimeout block
        if (inputText.value.trim() === "") {
          // No input provided
          display.innerHTML = "ERROR";
          display.style.background =
            "radial-gradient(50% 50% at 50% 50%, #311414 0%, #851111 100%)";
          setTimeout(() => {
            display.innerHTML = "";
            display.style.background =
              "radial-gradient(50% 50% at 50% 50%, #292929 0%, #000000 100%)";
          }, 1000);

          if (errori.children.length < parseInt(max_errori.innerHTML)) {
            var x = document.createElement("div");
            x.innerHTML = "X";
            errori.appendChild(x);
            wrong.pause();
            wrong.currentTime = 0;
            wrong.play();
          } else {
            var x = document.createElement("div");
            x.innerHTML = "X";
            errori.appendChild(x);
            click.pause();
            stopTick();
            wrong.pause();
            wrong.currentTime = 0;
            wrong.play();
            musicLevel.pause();
            explosion.pause();
            explosion.currentTime = 0;
            explosion.play();
            minuteLeft.pause();
            timeLeft.pause();
            sconfitta(twitchDisturbatore);
          }
        } else if (
          inputText.value.toLowerCase() === streamer[random].toLowerCase()
        ) {
          // Handle correct input after the timer expires
          display.style.background =
            "radial-gradient(50% 50% at 50% 50%, #34452b 0%, #17570e 100%)";
          setTimeout(() => {
            display.style.background =
              "radial-gradient(50% 50% at 50% 50%, #292929 0%, #000000 100%)";
          }, 1000);
          display.innerHTML = "";
          right.pause();
          right.currentTime = 0;
          right.play();
        } else {
          // Handle incorrect input after the timer expires
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
            wrong.pause();
            wrong.currentTime = 0;
            wrong.play();
          } else {
            var x = document.createElement("div");
            x.innerHTML = "X";
            errori.appendChild(x);
            click.pause();
            stopTick();
            wrong.pause();
            wrong.currentTime = 0;
            wrong.play();
            musicLevel.pause();
            explosion.pause();
            explosion.currentTime = 0;
            explosion.play();
            minuteLeft.pause();
            timeLeft.pause();
            sconfitta(twitchDisturbatore);
          }
        }

        inputText.value = "";
        followersText.classList.add("hidden");
        viewsText.classList.add("hidden");
        spectText.classList.add("hidden");
        subText.classList.add("hidden");
        inputText.disabled = true;
        inputContainer.style.filter = "blur(0.3vw)";
        inputText.style.cursor = "default";
      }
      i = i - 1;
    }, 1000);

    random = Math.floor(Math.random() * streamer.length);
    spectText.innerHTML =
      spettatori[random] + "<img src='/img/modulo/spect.svg'/>";
    subText.innerHTML = sub[random] + "<img src='/img/modulo/sub.svg'/>";
    viewsText.innerHTML = views[random] + "<img src='/img/modulo/views.svg'/>";
    followersText.innerHTML =
      followers[random] + "<img src='/img/modulo/followers.svg'/>";
  }, 90000);

  inputContainer.appendChild(inputText);
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
