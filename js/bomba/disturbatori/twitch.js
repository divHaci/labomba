function createDataList() {
  let div = document.createElement("div");
  div.innerHTML =
    "<datalist id='streamer'>" +
    "<option value='Tumblurr'>" +
    "<option value='TheRealMarza'>" +
    "<option value='Mollu'>" +
    "<option value='Freneh'>" +
    "<option value='Dario Moccia'>" +
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

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.setAttribute("list", "streamer");
  let submit = document.createElement("button");
  submit.classList.add("submit");
  submit.innerText = "→";
  submit.addEventListener("click", () => {
    if (inputText.value == streamer[random]) {
      console.log("wins");
    } else {
      console.log("lose");
    }
  });

  inputContainer.appendChild(inputText);
  inputContainer.appendChild(submit);

  moduloTwitch.appendChild(inputContainer);
  moduloTwitch.appendChild(spectText);
  moduloTwitch.appendChild(subText);
  moduloTwitch.appendChild(viewsText);
  moduloTwitch.appendChild(followersText);

  return moduloTwitch;
}

createDataList();

aggiungi_modulo(creaTwitch());
