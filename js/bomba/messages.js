function disturb() {
  let messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  var banIcon = document.createElement("img");
  var timeoutIcon = document.createElement("img");
  var vipIcon = document.createElement("img");

  banIcon.classList.add("icon");
  timeoutIcon.classList.add("icon");
  vipIcon.classList.add("icon");

  banIcon.src = "/img/modulo/messages/ban.svg";
  timeoutIcon.src = "/img/modulo/messages/timeout.svg";
  vipIcon.src = "/img/modulo/messages/vip.svg";

  var icons = document.createElement("div");
  icons.classList.add("icons");
  icons.appendChild(banIcon);
  icons.appendChild(timeoutIcon);
  icons.appendChild(vipIcon);

  var textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      var randomIndex = Math.floor(Math.random() * messages.length);
      var randomMessage = messages[randomIndex]["message"];
      messages.splice(randomIndex, 1);
      console.log(messages.length);
      textContainer.innerHTML = randomMessage;
      messageContainer.style.animation = "appear-message ease-in-out 0.4s";
      messageContainer.classList.add("show");
      setTimeout(() => {
        messageContainer.style.right = "0%";
      }, 400);
      setTimeout(() => {
        messageContainer.classList.remove("show");
      }, 10000);
      setTimeout(() => {
        messageContainer.style.animation = "disappear-message ease-in-out 0.4s";
        messageContainer.style.right = "-30%";
      }, 10400);
    }, i * Math.floor(Math.random() * 30000) + 20000);
  }

  messageContainer.appendChild(icons);
  messageContainer.appendChild(textContainer);
  document.querySelector("body").appendChild(messageContainer);
}

disturb();
