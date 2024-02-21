function creaCavi() {
  var last_digit = serialcode.charAt(serialcode.length - 1);
  var colors = [
    "orange",
    "purple",
    "green",
    "red",
    "blue",
    "yellow",
    "brown",
    "white",
  ];
  let modulo = document.createElement("div");
  modulo.classList.add("cables-module");

  //Math.floor(Math.random() * (7 - 4 + 1)) + 4;
  var cables_n = 7;

  var cables = [];
  for (let i = 0; i < cables_n; i++) {
    cables.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  var cables_to_cut = [];

  switch (cables_n) {
    case 4:
      if (cables.indexOf("orange") == -1) {
        cables_to_cut.push(1);
      } else if (cables[cables_n - 1] == "purple") {
        cables_to_cut.push(0);
        cables_to_cut.push(3);
      } else if (cables.indexOf("green") != -1) {
        console.log(cables.indexOf("green"));
        cables_to_cut.push(cables.indexOf("green"));
      } else {
        cables_to_cut.push(0);
        cables_to_cut.push(1);
        cables_to_cut.push(2);
        cables_to_cut.push(3);
      }
      break;

    case 5:
      if (
        cables.filter((color) => color === "red").length >= 2 &&
        last_digit % 2 == 0
      ) {
        cables_to_cut.push(cables.indexOf("red", cables.indexOf("red") + 1));
      } else if (
        cables[cables_n - 1] == "blue" &&
        cables.indexOf("green") == -1
      ) {
        cables_to_cut.push(0);
      } else if (cables.filter((color) => color === "yellow").length == 2) {
        cables_to_cut.push(cables.indexOf("yellow"));
      } else if (cables.filter((color) => color === "purple").length >= 2) {
        cables_to_cut.push(1);
      } else {
        cables_to_cut.push(2);
      }
      break;

    case 6:
      if (cables[cables_n - 1] == "brown" && last_digit % 2 != 0) {
        cables_to_cut.push(4);
      } else if (
        cables.filter((color) => color === "green").length == 2 &&
        cables.filter((color) => color === "purple").length >= 2
      ) {
        cables_to_cut.push(cables.indexOf("green"));
      } else if (cables.indexOf("brown") == -1) {
        cables_to_cut.push(1);
        cables_to_cut.push(5);
      } else if (
        cables.indexOf("red") != -1 &&
        cables.indexOf("yellow") != -1 &&
        cables.indexOf("blue") != -1
      ) {
        cables_to_cut.push(0);
        cables_to_cut.push(2);
        cables_to_cut.push(4);
      } else {
        cables_to_cut.push(2);
      }
      break;
    case 7: {
      if (cables.indexOf("yellow") == -1 && last_digit % 2 != 0) {
        cables_to_cut.push(3);
      } else if (
        cables.filter((color) => color === "yellow").length == 2 &&
        cables.indexOf("white") != -1
      ) {
        cables_to_cut.push(cables.indexOf("yellow"));
      } else if (cables.indexOf("red") == -1) {
        cables_to_cut.push(2);
        cables_to_cut.push(6);
      } else if (
        cables.indexOf("blue") == -1 &&
        cables.filter((color) => color === "red").length == 1 &&
        cables.filter((color) => color === "yellow").length >= 2
      ) {
        cables_to_cut.push(1);
        cables_to_cut.push(2);
        cables_to_cut.push(5);
      } else {
        cables_to_cut.push(4);
      }
      break;
    }
    default:
      console.log("suca");
      break;
  }

  console.log(cables);
  console.log(cables_to_cut);
}

creaCavi();
