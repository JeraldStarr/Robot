let positionX = 0;
let positionY = 0;
let fieldsLeft = 0;

function init () {
  const board = document.querySelector(".gameBoard");
  const fieldsOnBoard = 36;
  //wstawianie 36 "divów"
  for (let i = 0; i < fieldsOnBoard; i++) {
    createSquare(board, i);
    setSquare(i);
  }
  createRobot(board);
  setInformationAboutLeftDarkFields();
  setListenerToBtnClick()
}

function pointActiveSquare() {
  let nr = positionY / 10 + positionX / 60;
  const square = document.getElementById("sqrt" + nr);
  return square;
}

function setListenerToBtnClick() {
  document.getElementById("up").addEventListener("click", () => {
    moveRobot(0,-1);
  });
  document.getElementById("down").addEventListener("click", () => {
    moveRobot(-1,0);
  });
  document.getElementById("right").addEventListener("click", () => {
    moveRobot(1,0);
  });
  document.getElementById("left").addEventListener("click", () => {
    moveRobot(0,1)
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

function setSquare(i) {
  const id = "sqrt" + i;
  const field = document.getElementById(id);
  const fieldSize = 60;
  const boardSize = 6;
  setSquarePosition(field, boardSize, fieldSize, i);
  drawSquareColor(field);
}

function createSquare (board, i) {
  board.innerHTML += `<div class='gameBoard__square' id='sqrt${i}'> </div>`;
}

function moveRobot(x, y) {
  changeRobotPosition(x, y);
  checkIfSquareCanBeChanged();
  setNewPositionForRobot();
  setInformationAboutLeftDarkFields();
}

init();