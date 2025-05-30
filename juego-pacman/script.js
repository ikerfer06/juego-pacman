const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const size = 10;
let pacmanPos = 22;
let score = 0;
let totalPoints = 0;
const cells = [];

function createBoard() {
  board.innerHTML = "";
  cells.length = 0;
  score = 0;
  scoreDisplay.textContent = score;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (i !== pacmanPos) {
      const rand = Math.random();
      if (rand < 0.2) {
        cell.textContent = "🔹";
        cell.classList.add("point");
        totalPoints++;
      } else if (rand < 0.25) {
        cell.textContent = "🔴";
        cell.classList.add("trap");
      }
    }

    board.appendChild(cell);
    cells.push(cell);
  }

  cells[pacmanPos].classList.add("pacman");
}

function movePacman(e) {
  cells[pacmanPos].classList.remove("pacman");

  let x = pacmanPos % size;
  let y = Math.floor(pacmanPos / size);

  if (e.key === "ArrowUp" && y > 0) y--;
  else if (e.key === "ArrowDown" && y < size - 1) y++;
  else if (e.key === "ArrowLeft" && x > 0) x--;
  else if (e.key === "ArrowRight" && x < size - 1) x++;

  pacmanPos = y * size + x;

  if (cells[pacmanPos].classList.contains("trap")) {
    alert("¡Caíste en una trampa roja! Reiniciando el juego...");
    location.reload();
    return;
  }

  if (cells[pacmanPos].classList.contains("point")) {
    cells[pacmanPos].classList.remove("point");
    cells[pacmanPos].textContent = "";
    score++;
    scoreDisplay.textContent = score;

    if (score === totalPoints) {
      alert("🎉 ¡Has comido todos los puntos! Fin del juego.");
      document.removeEventListener("keydown", movePacman);
      return;
    }
  }

  cells[pacmanPos].classList.add("pacman");
}

document.addEventListener("keydown", movePacman);
createBoard();
