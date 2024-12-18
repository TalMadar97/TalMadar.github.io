document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const scoreDisplay = document.getElementById("score");

  const upBtn = document.getElementById("up");
  const downBtn = document.getElementById("down");
  const leftBtn = document.getElementById("left");
  const rightBtn = document.getElementById("right");

  let snake = [{ x: 150, y: 150 }];
  let food = { x: 100, y: 100 };
  let direction = "RIGHT";
  let gameInterval = null;
  let score = 0;

  function createGameElement(className, x, y) {
    const element = document.createElement("div");
    element.classList.add(className);
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    return element;
  }

  function drawBoard() {
    board.innerHTML = "";
    snake.forEach((segment) => {
      board.appendChild(createGameElement("snake", segment.x, segment.y));
    });
    board.appendChild(createGameElement("food", food.x, food.y));
  }

  function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "RIGHT") head.x += 10;
    if (direction === "LEFT") head.x -= 10;
    if (direction === "UP") head.y -= 10;
    if (direction === "DOWN") head.y += 10;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreDisplay.textContent = score;
      generateFood();
    } else {
      snake.pop();
    }

    if (checkCollision(head)) {
      clearInterval(gameInterval);
      gameInterval = null;
      alert("Game Over! Your score: " + score);
    }
  }

  function checkCollision(head) {
    if (
      head.x < 0 ||
      head.x >= board.offsetWidth ||
      head.y < 0 ||
      head.y >= board.offsetHeight
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * (board.offsetWidth / 10)) * 10;
    food.y = Math.floor(Math.random() * (board.offsetHeight / 10)) * 10;
  }

  function handleKeyPress(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  }

  function handleTouchControls(newDirection) {
    if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
    if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
    if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";

    moveSnake();
    drawBoard();
  }

  function startGame() {
    if (gameInterval !== null) return;

    snake = [{ x: 150, y: 150 }];
    direction = "RIGHT";
    score = 0;
    scoreDisplay.textContent = score;
    generateFood();
    drawBoard();
    gameInterval = setInterval(() => {
      moveSnake();
      drawBoard();
    }, 100);
  }

  function resetGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    snake = [{ x: 150, y: 150 }];
    direction = "RIGHT";
    score = 0;
    scoreDisplay.textContent = score;
    drawBoard();
  }

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);

  document.addEventListener("keydown", handleKeyPress);

  upBtn.addEventListener("click", () => handleTouchControls("UP"));
  downBtn.addEventListener("click", () => handleTouchControls("DOWN"));
  leftBtn.addEventListener("click", () => handleTouchControls("LEFT"));
  rightBtn.addEventListener("click", () => handleTouchControls("RIGHT"));
});
