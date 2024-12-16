const gridSize = 12; 
const mineCount = 20; 
let gameOver = false; 
const gameContainer = document.getElementById("game-container");
let grid = [];

function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      gameContainer.appendChild(cell);
      grid[i][j] = {
        element: cell,
        revealed: false,
        mine: false,
        adjacentMines: 0,
      };
    }
  }
}

function placeMines() {
  let placedMines = 0;
  while (placedMines < mineCount) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    if (!grid[row][col].mine) {
      grid[row][col].mine = true;
      placedMines++;
    }
  }
}

function calculateAdjacentMines() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].mine) continue;
      let mineCount = 0;
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const newRow = i + r;
          const newCol = j + c;
          if (
            newRow >= 0 &&
            newRow < gridSize &&
            newCol >= 0 &&
            newCol < gridSize &&
            grid[newRow][newCol].mine
          ) {
            mineCount++;
          }
        }
      }
      grid[i][j].adjacentMines = mineCount;
    }
  }
}

function handleCellClick(event) {
  if (gameOver) return; 

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  const cell = grid[row][col];

  if (cell.revealed) return; 

  cell.revealed = true;
  cell.element.classList.add("revealed");

  if (cell.mine) {
    cell.element.classList.add("mine");
    alert("Game Over! Restarting game...");
    restartGame(); 
  } else {
    if (cell.adjacentMines > 0) {
      cell.element.textContent = cell.adjacentMines;
    } else {
      revealSurroundingCells(row, col);
    }
  }
}

function revealSurroundingCells(row, col) {
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = parseInt(row) + r;
      const newCol = parseInt(col) + c;
      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize &&
        !grid[newRow][newCol].revealed
      ) {
        handleCellClick({ target: grid[newRow][newCol].element });
      }
    }
  }
}


function restartGame() {

  gameContainer.innerHTML = "";

 
  gameOver = false;
  createGrid();
  placeMines();
  calculateAdjacentMines();
}

function startGame() {
  createGrid();
  placeMines();
  calculateAdjacentMines();
}

startGame();
