var messaggio = "Disturbatore Messagio";

function disturb(frequenza, speed, cooldown) {
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

  banIcon.setAttribute("draggable", "false");
  timeoutIcon.setAttribute("draggable", "false");
  vipIcon.setAttribute("draggable", "false");

  var icons = document.createElement("div");
  icons.classList.add("icons");
  icons.appendChild(banIcon);
  icons.appendChild(timeoutIcon);
  icons.appendChild(vipIcon);

  var textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  var solution;
  var clicked = false;

  for (let i = 0; i < frequenza; i++) {
    speed = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
    if (!esploso) {
      var messagesInterval = setTimeout(() => {
        clicked = false;
        var randomIndex = Math.floor(Math.random() * messages.length);
        var randomMessage = messages[randomIndex]["message"];
        solution = messages[randomIndex]["type"];
        messages.splice(randomIndex, 1);
        textContainer.innerHTML =
          "<span>" +
          nicknames[Math.floor(Math.random() * nicknames.length)] +
          "</span>: " +
          randomMessage;
        textContainer.querySelector("span").style.color =
          chat_colors[Math.floor(Math.random() * chat_colors.length)];
        notification.play();
        messageContainer.style.animation = "appear-message ease-in-out 0.4s";
        messageContainer.classList.add("show");
        setTimeout(() => {
          messageContainer.style.right = "0%";
        }, 400);
        setTimeout(() => {
          messageContainer.classList.remove("show");
        }, cooldown * 1000);
        setTimeout(() => {
          if (!clicked && !esploso) {
            messageContainer.style.animation =
              "disappear-message ease-in-out 0.4s";
            messageContainer.style.right = "-45%";
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
              document.querySelector(".bgvideo").style.display = "none";
              minuteLeft.pause();
              timeLeft.pause();
              sconfitta(messaggio);
            }
          }
        }, cooldown * 1000 + 4);
      }, i * speed * 1000); // Multiply by i to stagger the execution
    }
  }

  banIcon.addEventListener("click", () => {
    handleButtonClick("ban");
  });

  timeoutIcon.addEventListener("click", () => {
    handleButtonClick("timeout");
  });

  vipIcon.addEventListener("click", () => {
    handleButtonClick("vip");
  });

  function handleButtonClick(buttonType) {
    messageContainer.style.animation = "disappear-message ease-in-out 0.4s";
    messageContainer.style.right = "-45%";
    clicked = true;
    if (buttonType == solution) {
      right.play();
    } else {
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
        document.querySelector(".bgvideo").style.display = "none";
        minuteLeft.pause();
        timeLeft.pause();
        sconfitta(messaggio);
      }
    }
  }

  messageContainer.appendChild(icons);
  messageContainer.appendChild(textContainer);
  document.querySelector("body").appendChild(messageContainer);
}

var frequenza = 5;
var speed = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
var cooldown = 15;

setTimeout(() => {
  disturb(frequenza, speed, cooldown);
}, speed * 1000);
