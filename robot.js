//pozycja robota
var poz_x = 0;
var poz_y = 0;
//ile pól pozostało do zlikwidowania
var ile_jeszcze = 0;
var historia = [];
var poprzednia_x = 0;
var poprzednia_y = 0;

function ini() {
  var plansza = document.getElementById("plansza");
  plansza.innerHTML = "";
  //wstawianie 36 "divów"
  for (var i = 0; i < 36; i++) {
    var id = "k" + i;
    plansza.innerHTML += "<div class='kwadrat' id='k" + i + "'> </div>";
    var kw = document.getElementById(id);
    kw.style.left = (i % 6) * 60 + "px";
    kw.style.top = Math.floor(i / 6) * 60 + "px";
    //losowanie koloru i zliczanie ciemnozielonych pól
    if (Math.random() < 0.5)
      kw.style.visibility = "hidden";
    else {
      kw.style.visibility = "visible";
      ile_jeszcze += 1;
    }
  }
  //dodanie robota
  plansza.innerHTML += "<div id='robot'><img src='robot.png'></div>";
  var robot = document.getElementById("robot");
  poz_x = 0;
  poz_y = 0;
  robot.style.top = poz_x + "px";
  robot.style.left = poz_y + "px";
  //ustawienie komunikatu o ciemnozielonych polach
  var ile = document.getElementById("ile");
  ile.innerHTML = ile_jeszcze;
}

function ruch(x, y) {
  var robot = document.getElementById("robot");

  if (x == 1) poz_x += 60;
  if (x == -1) poz_x -= 60;
  if (y == 1) poz_y += 60;
  if (y == -1) poz_y -= 60;

  if (poz_x > 300) {
    poz_x = 300;
  } else if (poz_x < 0) {
    poz_x = 0
  } else if (poz_y > 300) {
    poz_y = 300;
  } else if (poz_y < 0) {
    poz_y = 0;
  } else {
    // zmiana widoczności
    var k = wskazAktywnyKwadrat();
    if (k.style.visibility == "visible") {
      k.style.visibility = "hidden";
      ile_jeszcze -= 1;
      if (ile_jeszcze == 0) {
        document.getElementById("koniec").textContent = "Gratulacje! Wygrałeś!";
      }
    } else {
      k.style.visibility = "visible";
      ile_jeszcze += 1;
    }
  }

  robot.style.left = poz_x + "px";
  robot.style.top = poz_y + "px";

  //ustawienie komunikatu o ciemnozielonych polach
  var ile = document.getElementById("ile");
  ile.innerHTML = ile_jeszcze;
}


function wskazAktywnyKwadrat() {
  var nr = poz_y / 10 + poz_x / 60;
  var kwadrat = document.getElementById("k" + nr);
  return kwadrat;
}

window.onload = function () {
  ini();
}