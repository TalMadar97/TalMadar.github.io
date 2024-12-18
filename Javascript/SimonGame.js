document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");
  const levelTitle = document.getElementById("level-title");

  let sequence = [];
  let userSequence = [];
  let level = 0;

  function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300);
  }

  function nextSequence() {
    userSequence = [];
    level++;
    levelTitle.textContent = `Level ${level}`;
    const colors = ["red", "blue", "green", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);

    sequence.forEach((color, index) => {
      setTimeout(() => {
        flashButton(color);
      }, 600 * index);
    });
  }

  function checkSequence(currentIndex) {
    if (userSequence[currentIndex] !== sequence[currentIndex]) {
      levelTitle.textContent = "Game Over! Press Restart to Try Again.";
      disableButtons(true);
      return;
    }

    if (userSequence.length === sequence.length) {
      setTimeout(nextSequence, 1000);
    }
  }

  function disableButtons(disable) {
    buttons.forEach((button) => {
      button.disabled = disable;
    });
  }

  function startGame() {
    levelTitle.textContent = "Get Ready!";
    sequence = [];
    userSequence = [];
    level = 0;
    disableButtons(false);
    startButton.disabled = true;
    restartButton.disabled = false;
    setTimeout(nextSequence, 1000);
  }

  function restartGame() {
    levelTitle.textContent = "Game Restarted! Get Ready!";
    sequence = [];
    userSequence = [];
    level = 0;
    disableButtons(false);
    setTimeout(nextSequence, 1000);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (level === 0) return;

      const color = button.id;
      userSequence.push(color);
      flashButton(color);
      checkSequence(userSequence.length - 1);
    });
  });

  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
});
