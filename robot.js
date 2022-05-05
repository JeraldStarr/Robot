//pozycja robota
let positionX = 0;
let positionY = 0;
//ile pól pozostało do zlikwidowania
let fieldsLeft = 0;

function init () {
  const board = document.querySelector(".gameBoard");
  const fieldsOnBoard = 36;
  const fieldSize = 60;
  const boardSize = 6;
  board.innerHTML = "";
  //wstawianie 36 "divów"
  for (let i = 0; i < fieldsOnBoard; i++) {
    let id = "sqrt" + i;
    board.innerHTML += "<div class='gameBoard__square' id='sqrt" + i + "'> </div>";
    const field = document.getElementById(id);
    setSquarePosition(field, boardSize, fieldSize, i);
    drawSquareColor(field);
  }
  createRobot(board);
  setInformationAboutLeftDarkFields();
  setListenerToBtnClick()
}

function move(x, y) {
  const robot = document.querySelector(".gameBoard__robot");
  changeRobotPosition(x, y);
  checkIfSquareCanBeChanged();
  setNewPositionForRobot();

  robot.style.left = `${positionX}px`;
  robot.style.top = `${positionY}px`;

  //ustawienie komunikatu o ciemnozielonych polach
  // let fieldsLeftHTMLDisplayer = document.getElementById("ile");
  // fieldsLeftHTMLDisplayer.textContent = fieldsLeft;
  setInformationAboutLeftDarkFields();
}


function pointActiveSquare() {
  let nr = positionY / 10 + positionX / 60;
  const square = document.getElementById("sqrt" + nr);
  return square;
}

function setListenerToBtnClick() {

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
}

function changeRobotPosition(x, y) {
  console.log(positionX, positionY)
  if (x === 1) positionX += 60;
  if (x === -1) positionX -= 60;
  if (y === 1) positionY += 60;
  if (y === -1) positionY -= 60;
}

function checkIfSquareCanBeChanged() {
  if (positionX > 300) {
    positionX = 300;
  } else if (positionX < 0) {
    positionX = 0
  } else if (positionY > 300) {
    positionY = 300;
  } else if (positionY < 0) {
    positionY = 0;
  } else {
    changeSquare();
  }
}
function setNewPositionForRobot() {
  const robot = document.querySelector(".gameBoard__robot");
  robot.style.left = `${positionX}px`;
  robot.style.top = `${positionY}px`;
}

function changeSquare() {
  const activeSquare = pointActiveSquare();
  if (activeSquare.style.visibility === "visible") {
    changeSquareForUnvisible(activeSquare);
    if (fieldsLeft === 0) {
      showVictoryMessage();
    }
  } else {
    changeSquareForVisible(activeSquare);
  }
}

function changeSquareForVisible (square) {
  square.style.visibility = "visible";
  fieldsLeft += 1;
}

function changeSquareForUnvisible (square) {
  square.style.visibility = "hidden";
  fieldsLeft -= 1;
}

function showVictoryMessage() {
  document.querySelector(".UIwrapper__result").textContent = "Gratulacje! Wygrałeś!";
}

function createRobot(board) {
  board.innerHTML += "<div class='gameBoard__robot'><img src='robot.png'></div>";
  const robot = document.querySelector(".gameBoard__robot");
  positionX = 0;
  positionY = 0;
  robot.style.top = positionX + "px";
  robot.style.left = positionY + "px";
}

function setInformationAboutLeftDarkFields() {
  let fieldsLeftHTMLDisplayer = document.getElementById("ile");
  fieldsLeftHTMLDisplayer.textContent = fieldsLeft;
}

function drawSquareColor(field) {
  if (Math.random() < 0.5)
  field.style.visibility = "hidden";
  else {
    changeSquareForVisible(field);
  }
}

function setSquarePosition(field, boardSize, fieldSize, i) {
  field.style.left = (i % boardSize) * fieldSize + "px";
  field.style.top = Math.floor(i / boardSize) * fieldSize + "px";
}

init();