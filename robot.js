//pozycja robota
var positionX = 0;
var positionY = 0;
//ile pól pozostało do zlikwidowania
var fieldsLeft = 0;

function init() {
  var board = document.getElementById("gameBoard");
  board.innerHTML = "";
  //wstawianie 36 "divów"
  for (var i = 0; i < 36; i++) {
    var id = "k" + i;
    board.innerHTML += "<div class='kwadrat' id='k" + i + "'> </div>";
    var field = document.getElementById(id);
    field.style.left = (i % 6) * 60 + "px";
    field.style.top = Math.floor(i / 6) * 60 + "px";
    //losowanie koloru i zliczanie ciemnozielonych pól
    if (Math.random() < 0.5)
    field.style.visibility = "hidden";
    else {
      field .style.visibility = "visible";
      fieldsLeft += 1;
    }
  }
  //dodanie robota
  board.innerHTML += "<div id='robot'><img src='robot.png'></div>";
  var robot = document.getElementById("robot");
  positionX = 0;
  positionY = 0;
  robot.style.top = positionX + "px";
  robot.style.left = positionY + "px";
  //ustawienie komunikatu o ciemnozielonych polach
  var fieldsLeftHTMLDisplayer = document.getElementById("ile");
  fieldsLeftHTMLDisplayer.innerHTML = fieldsLeft;
}

function move(x, y) {
  var robot = document.getElementById("robot");

  if (x == 1) positionX += 60;
  if (x == -1) positionX -= 60;
  if (y == 1) positionY += 60;
  if (y == -1) positionY -= 60;

  if (positionX > 300) {
    positionX = 300;
  } else if (positionX < 0) {
    positionX = 0
  } else if (positionY > 300) {
    positionY = 300;
  } else if (positionY < 0) {
    positionY = 0;
  } else {
    // zmiana widoczności
    var activeSquare = pointActiveSquare();
    if (activeSquare.style.visibility === "visible") {
      activeSquare.style.visibility = "hidden";
      fieldsLeft -= 1;
      if (fieldsLeft === 0) {
        document.getElementById("koniec").textContent = "Gratulacje! Wygrałeś!";
      }
    } else {
      activeSquare.style.visibility = "visible";
      fieldsLeft += 1;
    }
  }

  robot.style.left = positionX + "px";
  robot.style.top = positionY + "px";

  //ustawienie komunikatu o ciemnozielonych polach
  var ile = document.getElementById("ile");
  ile.innerHTML = fieldsLeft;
}


function pointActiveSquare() {
  var nr = positionY / 10 + positionX / 60;
  var kwadrat = document.getElementById("k" + nr);
  return kwadrat;
}

window.onload = function () {
  init();
}