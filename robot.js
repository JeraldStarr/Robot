//pozycja robota
let positionX = 0;
let positionY = 0;
//ile pól pozostało do zlikwidowania
let fieldsLeft = 0;

init = () => {
  const board = document.getElementById("gameBoard");
  const howMuchFields = 36;
  const fieldSize = 60;
  const boardSize = 6;
  board.innerHTML = "";
  //wstawianie 36 "divów"
  for (let i = 0; i < howMuchFields; i++) {
    let id = "sqrt" + i;
    board.innerHTML += "<div class='square' id='sqrt" + i + "'> </div>";
    const field = document.getElementById(id);
    field.style.left = (i % boardSize) * fieldSize + "px";
    field.style.top = Math.floor(i / boardSize) * fieldSize + "px";
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
  const robot = document.getElementById("robot");
  positionX = 0;
  positionY = 0;
  robot.style.top = positionX + "px";
  robot.style.left = positionY + "px";
  //ustawienie komunikatu o ciemnozielonych polach
  const fieldsLeftHTMLDisplayer = document.getElementById("ile");
  fieldsLeftHTMLDisplayer.innerHTML = fieldsLeft;
}

move = (x, y) => {
  const robot = document.getElementById("robot");

  if (x === 1) positionX += 60;
  if (x === -1) positionX -= 60;
  if (y === 1) positionY += 60;
  if (y === -1) positionY -= 60;

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
    const activeSquare = pointActiveSquare();
    if (activeSquare.style.visibility === "visible") {
      activeSquare.style.visibility = "hidden";
      fieldsLeft -= 1;
      if (fieldsLeft === 0) {
        document.getElementById("result").textContent = "Gratulacje! Wygrałeś!";
      }
    } else {
      activeSquare.style.visibility = "visible";
      fieldsLeft += 1;
    }
  }

  robot.style.left = `${positionX}px`;
  robot.style.top = `${positionY}px`;

  //ustawienie komunikatu o ciemnozielonych polach
  let fieldsLeftHTMLDisplayer = document.getElementById("ile");
  fieldsLeftHTMLDisplayer.innerHTML = fieldsLeft;
}


pointActiveSquare = () => {
  let nr = positionY / 10 + positionX / 60;
  const square = document.getElementById("sqrt" + nr);
  return square;
}

window.addEventListener("load", init);
const upButton = document.getElementById("up");
document.getElementById("up").addEventListener("click", () => {
  move(0,-1);
});
document.getElementById("down").addEventListener("click", () => {
  move(-1,0);
});
document.getElementById("right").addEventListener("click", () => {
  move(1,0);
});
document.getElementById("left").addEventListener("click", () => {
  move(0,1)
})