function creaBandiere() {
  let modulo = document.createElement("div");
  modulo.classList.add("bandiere-module");
  
  let bandiere = document.createElement("img");
  bandiere.classList.add("bandieraImg");

  random = Math.floor(Math.random() * nazioni.length);

  bandiere.src = "../../img/modulo/bandiere/" + nazioni[random] + ".png";

  bandiere.setAttribute("draggable", "false");

  let answer = document.createElement("div");
  answer.classList.add("answer");

  let input = document.createElement("input");
  input.type = "text";
  input.setAttribute("list", "capital");

  // Aggiungi un ascoltatore di eventi sull'input
  input.addEventListener("input", function () {
    // Abilita o disabilita il pulsante in base alla presenza della parola nel datalist
    btn.disabled = !isParolaPresente(input.value);
  });

  let btn = document.createElement("input");
  btn.type = "button";
  btn.value = "→";
  modulo.setAttribute("id", "N-" + capitali[random] + "");
  btn.setAttribute("onclick", "checkCapitale('" + capitali[random] + "')");

  // Disabilita il pulsante inizialmente
  btn.disabled = true;

  let led_container = document.createElement("div");
  led_container.classList.add("led-container");

  let led = document.createElement("div");
  led.classList.add("led");

  nazioni.splice(random, 1);
  capitali.splice(random, 1);

  answer.appendChild(input);
  answer.appendChild(btn);
  modulo.appendChild(bandiere);
  modulo.appendChild(answer);
  modulo.appendChild(led_container);
  led_container.appendChild(led);

  return modulo;
}

function isParolaPresente(parola) {
  let datalist = document.getElementById("capital");
  let opzioni = datalist.getElementsByTagName("option");
  for (let i = 0; i < opzioni.length; i++) {
    let opzioneSenzaSpazi = opzioni[i].value.toLowerCase().replace(/\s/g, "");
    if (opzioneSenzaSpazi === parola.toLowerCase().replace(/\s/g, "")) {
      return true;
    }
  }
  return false;
}

function aggiungi_modulo(modulo) {
  var empty = true;
  var containers = document.querySelectorAll(".container-modulo");
  var random_container = Math.floor((Math.random() * containers.length) / 2);
  while (empty) {
    if (containers[random_container].children.length == 0) {
      containers[random_container].appendChild(modulo);
      empty = false;
    } else {
      random_container = Math.floor(Math.random() * containers.length);
    }
  }
}

createDataList();
aggiungi_modulo(creaBandiere());

function checkCapitale(random) {
  var modulo = document.querySelector("#N-" + random + "");
  var text = modulo.querySelector("input[type='text']");
  if (text.value != "") {
    // Remove spaces from both the correct answer and user input
    var correctAnswer = random.toLowerCase().replace(/\s/g, "");
    var userInput = text.value.toLowerCase().replace(/\s/g, "");

    if (userInput === correctAnswer) {
      var led = modulo.querySelector(".led-container .led");
      led.style.backgroundColor = "lime";
      led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw #74FF66ed";
      led.style.boxShadow = "0px 0px 2vw 0.5vw #74FF66";
      for (let i = 0; i < 2; i++) {
        // SPEGNE IL MODULO TRANNE IL LED
        modulo.children[i].classList.add("complete");
      }
      right.play();
    } else {
      if (errori.children.length < parseInt(max_errori.innerHTML)) {
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);

        var led = modulo.querySelector(".led-container .led");
        led.style.backgroundColor = "red";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
        led.style.boxShadow = "0px 0px 2vw 0.5vw red";
        wrong.play();
      } else {
        var x = document.createElement("div");
        x.innerHTML = "X";
        errori.appendChild(x);
        var led = modulo.querySelector(".led-container .led");
        led.style.backgroundColor = "red";
        led.style.webkitBoxShadow = "0px 0px 2vw 0.5vw red";
        led.style.boxShadow = "0px 0px 2vw 0.5vw red";
        click.pause();
        stopTick();
        wrong.play();
        musicLevel.pause()
        explosion.play();
        document.querySelector(".bgvideo").style.display = "none";
        minuteLeft.pause();
        timeLeft.pause()
        sconfitta();
      }
    }
  }
}

function createDataList() {
  let div = document.createElement("div");
  div.innerHTML =
    "<datalist id='capital'>" +
    "<option value='AbuDhabi'>" +
    "<option value='Accra'>" +
    "<option value='AddisAbeba'>" +
    "<option value='Algeri'>" +
    "<option value='Amman'>" +
    "<option value='AndorraLaVella'>" +
    "<option value='Ankara'>" +
    "<option value='Antananarivo'>" +
    "<option value='Apia'>" +
    "<option value='Ashgabat'>" +
    "<option value='Asmara'>" +
    "<option value='Astana'>" +
    "<option value='Asunción'>" +
    "<option value='Atene'>" +
    "<option value='Baku'>" +
    "<option value='Bamako'>" +
    "<option value='BandarSeriBegawan'>" +
    "<option value='Bangkok'>" +
    "<option value='Bangui'>" +
    "<option value='Yaoundé'>" +
    "<option value='Banjul'>" +
    "<option value='Basseterre'>" +
    "<option value='Pechino'>" +
    "<option value='Beirut'>" +
    "<option value='Belgrado'>" +
    "<option value='Belmopan'>" +
    "<option value='Berlino'>" +
    "<option value='Bern'>" +
    "<option value='Bishkek'>" +
    "<option value='Bissau'>" +
    "<option value='Bogotà'>" +
    "<option value='Brasilia'>" +
    "<option value='Bratislava'>" +
    "<option value='Brazzaville'>" +
    "<option value='Bridgetown'>" +
    "<option value='Bruxelles'>" +
    "<option value='Bucarest'>" +
    "<option value='Budapest'>" +
    "<option value='BuenosAires'>" +
    "<option value='IlCairo'>" +
    "<option value='Canberra'>" +
    "<option value='Caracas'>" +
    "<option value='Castries'>" +
    "<option value='Cayenne'>" +
    "<option value='Chisinau'>" +
    "<option value='Moroni'>" +
    "<option value='Seul'>" +
    "<option value='Colombo'>" +
    "<option value='Conakry'>" +
    "<option value='Copenaghen'>" +
    "<option value='Dakar'>" +
    "<option value='Damasco'>" +
    "<option value='Dacca'>" +
    "<option value='Dili'>" +
    "<option value='Erevan'>" +
    "<option value='Gibuti'>" +
    "<option value='Dodoma'>" +
    "<option value='Doha'> " +
    "<option value='Dublino'>" +
    "<option value='Dushanbe'>" +
    "<option value='Funafuti'>" +
    "<option value='Gaborone'>" +
    "<option value='GeorgeTown'>" +
    "<option value='Gibilterra'>" +
    "<option value='Bujumbura'>" +
    "<option value='CittàDelGuatemala'>" +
    "<option value='Gustavia'>" +
    "<option value='Hagåtña'>" +
    "<option value='Hamilton'>" +
    "<option value='Hanoi'>" +
    "<option value='Harare'>" +
    "<option value='Lavana'>" +
    "<option value='Helsinki'>" +
    "<option value='Honiara'>" +
    "<option value='Islamabad'>" +
    "<option value='Giacarta'>" +
    "<option value='Jamestown'>" +
    "<option value='Baghdad'>" +
    "<option value='Gerusalemme'>" +
    "<option value='Juba'>" +
    "<option value='Kabul'>" +
    "<option value='LaValletta'>" +
    "<option value='Kampala'>" +
    "<option value='Kathmandu'>" +
    "<option value='Khartum'>" +
    "<option value='Kiev'>" +
    "<option value='Kigali'>" +
    "<option value='Kingston'>" +
    "<option value='Kingstown'>" +
    "<option value='Kinshasa'>" +
    "<option value='KualaLumpur'>" +
    "<option value='KuwaitCity'>" +
    "<option value='Kiev'>" +
    "<option value='Libreville'>" +
    "<option value='Lilongwe'>" +
    "<option value='Lima'>" +
    "<option value='Lisbona'>" +
    "<option value='Lubiana'>" +
    "<option value='Sucre'>" +
    "<option value='Lomé'>" +
    "<option value='Londra'>" +
    "<option value='Luanda'>" +
    "<option value='Lusaka'>" +
    "<option value='Lussemburgo'>" +
    "<option value='Madrid'>" +
    "<option value='Majuro'>" +
    "<option value='Malabo'>" +
    "<option value='Malé'>" +
    "<option value='Managua'>" +
    "<option value='Manama'>" +
    "<option value='Manila'>" +
    "<option value='Maputo'>" +
    "<option value='Mariehamn'>" +
    "<option value='Maseru'>" +
    "<option value='MataUtu'>" +
    "<option value='Mbabane'>" +
    "<option value='CittàDelMessico'>" +
    "<option value='Minsk'>" +
    "<option value='Mogadiscio'>" +
    "<option value='Monaco'>" +
    "<option value='Monrovia'>" +
    "<option value='Montevideo'>" +
    "<option value='Moroni'>" +
    "<option value='Mosca'>" +
    "<option value='Muscat'>" +
    "<option value='NDjamena'>" +
    "<option value='Nairobi'>" +
    "<option value='Nassau'>" +
    "<option value='Naypyidaw'>" +
    "<option value='NuovaDelhi'>" +
    "<option value='Ngerulmud'>" +
    "<option value='Niamey'>" +
    "<option value='Nicosia'>" +
    "<option value='Nouakchott'>" +
    "<option value='Nouméa'>" +
    "<option value='NukuAlofa'>" +
    "<option value='Nuuk'>" +
    "<option value='Oranjestad'>" +
    "<option value='Oslo'>" +
    "<option value='Ottawa'>" +
    "<option value='Ouagadougou'>" +
    "<option value='PagoPago'>" +
    "<option value='Palikir'>" +
    "<option value='PanamaCity'>" +
    "<option value='Papeete'>" +
    "<option value='Paramaribo'>" +
    "<option value='Parigi'>" +
    "<option value='PhnomPenh'>" +
    "<option value='Podgorica'>" +
    "<option value='PortLouis'>" +
    "<option value='PortMoresby'>" +
    "<option value='PortVila'>" +
    "<option value='PortAuPrince'>" +
    "<option value='PortOfSpain'>" +
    "<option value='HongKong'>" +
    "<option value='PortoNovo'>" +
    "<option value='Praga'>" +
    "<option value='Praia'>" +
    "<option value='Pretoria'>" +
    "<option value='Pristina'>" +
    "<option value='Pyongyang'>" +
    "<option value='Qatar'>" +
    "<option value='Quito'>" +
    "<option value='Rabat'>" +
    "<option value='Reykjavik'>" +
    "<option value='Cardiff'>" +
    "<option value='Riga'>" +
    "<option value='Riyad'>" +
    "<option value='Roma'>" +
    "<option value='Roseau'>" +
    "<option value='Saipan'>" +
    "<option value='SanJose'>" +
    "<option value='SanMarino'>" +
    "<option value='SanSalvador'>" +
    "<option value='Sanaa'>" +
    "<option value='Santiago'>" +
    "<option value='SantoDomingo'>" +
    "<option value='SãoTomé'>" +
    "<option value='Sarajevo'>" +
    "<option value='Seoul'>" +
    "<option value='Singapore'>" +
    "<option value='Skopje'>" +
    "<option value='Sofia'>" +
    "<option value='SriJayawardenepuraKotte'>" +
    "<option value='SaintGeorges'>" +
    "<option value='SaintHelier'>" +
    "<option value='SaintJohns'>" +
    "<option value='SaintPeterPort'>" +
    "<option value='Stanley'>" +
    "<option value='Stepanakert'>" +
    "<option value='Stoccolma'>" +
    "<option value='Sucre'>" +
    "<option value='Sukhumi'>" +
    "<option value='Suva'>" +
    "<option value='Taipei'>" +
    "<option value='Tallinn'>" +
    "<option value='Tarawa'>" +
    "<option value='Tashkent'>" +
    "<option value='Tbilisi'>" +
    "<option value='Tegucigalpa'>" +
    "<option value='Tehran'>" +
    "<option value='TheValley'>" +
    "<option value='Thimphu'>" +
    "<option value='Tirana'>" +
    "<option value='Tokyo'>" +
    "<option value='Torshavn'>" +
    "<option value='Tripoli'>" +
    "<option value='Tunisi'>" +
    "<option value='UlanBator'>" +
    "<option value='Vaduz'>" +
    "<option value='Valletta'>" +
    "<option value='CittàDelVaticano'>" +
    "<option value='Victoria'>" +
    "<option value='Vienna'>" +
    "<option value='Vientiane'>" +
    "<option value='Vilnius'>" +
    "<option value='Varsavia'>" +
    "<option value='Washington'>" +
    "<option value='Wellington'>" +
    "<option value='WestIsland'>" +
    "<option value='Willemstad'>" +
    "<option value='Windhoek'>" +
    "<option value='Yamoussoukro'>" +
    "<option value='Yerevan'>" +
    "<option value='Zagabria'>" +
    "</datalist>";

  document.querySelector("body").appendChild(div);
}
