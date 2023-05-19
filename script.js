const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
const playerTurnText = document.getElementById('playerTurn');
const playerXWinCountElement = document.getElementById('playerXWinCount');
const playerOWinCountElement = document.getElementById('playerOWinCount');
let isPlayer_O_Turn = false;
let playerXWinCount = 0;
let playerOWinCount = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isPlayer_O_Turn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
      incrementWinCounter(currentClass);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }
  

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `${isPlayer_O_Turn ? "O" : "X"} Player Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
    playerTurnText.innerText = `Player O's turn to go`;
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
    playerTurnText.innerText = `Player X's turn to go`;
  }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        const cell = cellElements[index];
        return cell.classList.contains(currentClass);
      });
    });
  }

  function incrementWinCounter(currentClass) {
    if (currentClass === PLAYER_X_CLASS) {
      playerXWinCount++;
      playerXWinCountElement.innerText = playerXWinCount;
    } else if (currentClass === PLAYER_O_CLASS) {
      playerOWinCount++;
      playerOWinCountElement.innerText = playerOWinCount;
    }
  }