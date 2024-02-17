function creaParoleDoppie() {
    let lvl = 0;
    let moduloParoleDoppie = document.createElement("div")
    moduloParoleDoppie.classList.add("modulo-parole-doppie")

    let displayParoleDoppie = document.createElement("div")
    displayParoleDoppie.classList.add("display-parole-doppie")

    var correctWordIndex = Math.floor(Math.random()*scritta_display.length);
    var correctWord = scritta_display[correctWordIndex];

    displayParoleDoppie.innerText = correctWord["word"]

    let ledContainerParoleDoppie = document.createElement("div")
    ledContainerParoleDoppie.classList.add("led-container-parole-doppie")

    for(let i = 0; i < 4; i = i + 1){
        let led = document.createElement("div")
        led.classList.add("led")
        ledContainerParoleDoppie.appendChild(led);
    }

    let containerParoleDoppie = document.createElement("div")
    containerParoleDoppie.classList.add("container-parole-doppie")

    for(let i = 0; i < 6; i = i + 1){
        let button = document.createElement("button")
        button.classList.add("button-parole-doppie")
        button.innerText = scritta_display[Math.floor(Math.random()*scritta_display.length)]["word"]
        button.setAttribute("id", "wrong")
        button.addEventListener("click", function () {
            var result = button.getAttribute("id");

            if (result == "right") {
                // Provide visual feedback for correct selection
                ledContainerParoleDoppie.children[lvl].style.backgroundColor = "#fde910";
                ledContainerParoleDoppie.children[lvl].style.webkitBoxShadow = "0px 0px 2vw 0.5vw #fde910";
                ledContainerParoleDoppie.children[lvl].style.boxShadow = "0px 0px 2vw 0.5vw #fde910";
                lvl = lvl + 1;
                correctWordIndex = Math.floor(Math.random()*scritta_display.length);
                correctWord = scritta_display[correctWordIndex];

                displayParoleDoppie.innerText = correctWord["word"]
                for(let i = 0; i < 6; i = i + 1){
                    containerParoleDoppie.children[i].innerText = scritta_display[Math.floor(Math.random()*scritta_display.length)]["word"]; 
                    containerParoleDoppie.children[i].setAttribute("id", "wrong")
                }
                for(let i = 0; i < 6; i = i + 1){
                    if(soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)].indexOf(containerParoleDoppie.children[i].innerHTML) != -1){
                        containerParoleDoppie.children[i].innerHTML  = soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)][Math.floor(Math.random()*soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)].length)]
                        containerParoleDoppie.children[i].setAttribute("id", "right");
                        break;
                    }
                }
                if (lvl == 4) {
                    // All words guessed correctly, prepare for the next level
                    for (let i = 0; i < ledContainerParoleDoppie.children.length; i++) {
                        ledContainerParoleDoppie.children[i].style.backgroundColor = "lime";
                        ledContainerParoleDoppie.children[i].style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
                        ledContainerParoleDoppie.children[i].style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
                    }
                    for (let i = 1; i <= 2; i++) {
                        //SPEGNE IL MODULO TRANNE IL LED
                        moduloParoleDoppie.children[i].classList.add("complete");
                    }
                    checkForWin();
                }
            }else if(result == "wrong"){
                for(let i = 0; i < 4; i = i + 1){
                    ledContainerParoleDoppie.children[i].style.backgroundColor = "gray"
                    ledContainerParoleDoppie.children[i].style.boxShadow = "none";
                }
                if (errori.children.length < parseInt(max_errori.innerHTML)) {
                    var x = document.createElement("div");
                    x.innerHTML = "X";
                    errori.appendChild(x);
                    wrong.play()
                  }else{
                    var x = document.createElement("div");
                    x.innerHTML = "X";
                    errori.appendChild(x);
                    click.pause()
                    stopTick();
                    wrong.play()
                    musicLevel.pause()
                    explosion.play()
                    document.querySelector(".bgvideo").style.display = "none";
                    sconfitta();
                  }

                ledContainerParoleDoppie.children[lvl].style.backgroundColor = "red"
                ledContainerParoleDoppie.children[lvl].style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
                ledContainerParoleDoppie.children[lvl].style.boxShadow = "0px 0px 2vw 0.5vw red";
                lvl = 0;
            }
        })
        containerParoleDoppie.appendChild(button);
    }

    console.log(soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)]);

    for(let i = 0; i < 6; i = i + 1){
        if(soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)].indexOf(containerParoleDoppie.children[i].innerHTML) != -1){
            containerParoleDoppie.children[i].innerHTML  = soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)][Math.floor(Math.random()*soluzioni_parole[word_indexes.indexOf(containerParoleDoppie.children[correctWord["key"]].innerHTML)].length)]
            containerParoleDoppie.children[i].setAttribute("id", "right");
            break;
        }
    }

    moduloParoleDoppie.appendChild(displayParoleDoppie)
    moduloParoleDoppie.appendChild(containerParoleDoppie)
    moduloParoleDoppie.appendChild(ledContainerParoleDoppie)
    return moduloParoleDoppie;
}

aggiungi_modulo(creaParoleDoppie())