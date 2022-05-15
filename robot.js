let positionX = 0;
let positionY = 0;
let fieldsLeft = 0;
let moves = 0;
let squaresToRemove = 0;


function init () {
  const board = document.querySelector(".gameBoard");
  const fieldsOnBoard = 36;

  for (let i = 0; i < fieldsOnBoard; i++) {
    createSquare(board, i);
    setSquare(i);
  }
  createRobot(board);
  setInformationAboutLeftFields();
  setListenerToBtnClick();
  setListenerToArrowKeyPress();
  squaresToRemove = fieldsLeft;
}

function pointActiveSquare() {
  let nr = positionY / 10 + positionX / 60;
  const square = document.getElementById("sqrt" + nr);
  return square;
}

function setListenerToBtnClick() {
  document.querySelector("[data-direction=up]").addEventListener("click", () => {
    moveUp();
  });
  document.querySelector("[data-direction=left]").addEventListener("click", () => {
    moveLeft();
  });
  document.querySelector("[data-direction=right]").addEventListener("click", () => {
    moveRight();
  });
  document.querySelector("[data-direction=down]").addEventListener("click", () => {
    moveDown();
  })
}

function setListenerToArrowKeyPress() {
  document.addEventListener("keydown", e => {
    switch(e.keyCode) {
      case 38:
        moveUp();
        showPressedKey("up");
      break;
      case 40:
        moveDown();
        showPressedKey("down");
      break;
      case 39:
        moveRight();
        showPressedKey("right");
      break;
      case 37:
        moveLeft();
        showPressedKey("left");
      break;
      default:
        console.log("Unhandled key");
      break;
    }
  })
}

function changeRobotPosition(x, y) {
  if (x === 1) positionX += 60;
  if (x === -1) positionX -= 60;
  if (y === 1) positionY += 60;
  if (y === -1) positionY -= 60;
}

function checkIfSquareCanBeChanged() {
  if (positionX > 300) {
    positionX = 300;
    moves--;
  } else if (positionX < 0) {
    positionX = 0
    moves--;
  } else if (positionY > 300) {
    positionY = 300;
    moves--;
  } else if (positionY < 0) {
    positionY = 0;
    moves--;
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

  const result = squaresToRemove;
  document.querySelector(".UIwrapper__result").innerHTML = `
    <div>Gratulacje! Wygrałeś!<div/>
    <div>Twój wynik: ${result}</div>
  `;
}

function createRobot(board) {
  board.innerHTML += "<div class='gameBoard__robot'><img src='robot.png'></div>";
  const robot = document.querySelector(".gameBoard__robot");
  positionX = 0;
  positionY = 0;
  robot.style.top = positionX + "px";
  robot.style.left = positionY + "px";
}

function setInformationAboutLeftFields() {
  const fieldsLeftHTMLDisplayer = document.getElementById("ile");
  if(fieldsLeftHTMLDisplayer) {
    fieldsLeftHTMLDisplayer.textContent = fieldsLeft;
  }
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
  setInformationAboutLeftFields();
}

function displayMoves() {
  const uiWrapperMoves = document.querySelector(".UIwrapper__moves");
  if (uiWrapperMoves) {
    uiWrapperMoves.textContent = moves;
  }

}

function moveUp() {
  moveRobot(0,-1);
  moves++;
  displayMoves();
}

function moveDown() {
  moveRobot(0, 1);
  moves++;
  displayMoves();
}

function moveLeft() {
  moveRobot(-1,0)
  moves++;
  displayMoves();
}

function moveRight() {
  moveRobot(1,0);
  moves++;
  displayMoves();
}

function showPressedKey(direction) {
  const modifier = "UIwrapper__button--active";
  const directionKeyClassList = document.querySelector(`[data-direction=${direction}]`).classList;
  directionKeyClassList.add(modifier);
  setTimeout(() => {
    directionKeyClassList.remove(modifier);
  }, 150);
}

init();