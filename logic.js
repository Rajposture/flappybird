const bird = document.getElementById("bird");
const container = document.getElementById("game-container");

let birdY = 300;
let gravity = 1;
let velocity = 1;
let isGameOver = false;
let pipes = [];
let score = 0;
let highScore = localStorage.getItem("flappyHighScore") || 0;
highScore = parseInt(highScore);

// Display scores when game starts
document.getElementById("score").innerText = "Score: " + score;
document.getElementById("high-score").innerText = "High Score: " + highScore;

function increaseScore() {
  score++;
  document.getElementById("score").innerText = "Score: " + score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("flappyHighScore", highScore);
    document.getElementById("high-score").innerText =
      "High Score: " + highScore;
  }
}

let isGameStarted = false;

function gameLoop() {
  if (isGameOver || !isGameStarted) return;

  velocity += gravity;
  birdY += velocity;
  bird.style.top = birdY + "px";

  if (birdY > window.innerHeight || birdY < 0) {
    endGame();
  }

  movePipes();
  requestAnimationFrame(gameLoop);
}
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    velocity = -10;
  }
});
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    velocity = -10;
    flapSound.play();
  }
});
window.addEventListener("touchstart", () => {
  velocity = -10;
  flapSound.play();
});

function createPipe() {
  const pipeGap = 190;
  const minHeight = 50;
  const maxHeight = window.innerHeight - pipeGap - 50;

  let pipeTopHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  let pipeBottomTop = pipeTopHeight + pipeGap;

  const pipeTop = document.createElement("img");
  pipeTop.src = "green.jpg";
  pipeTop.className = "pipe";
  pipeTop.style.top = "0px";
  pipeTop.style.left = window.innerWidth + "px";
  pipeTop.style.height = pipeTopHeight + "px";
  container.appendChild(pipeTop);

  const pipeBottom = document.createElement("img");
  pipeBottom.src = "green.jpg";
  pipeBottom.className = "pipe";
  pipeBottom.style.top = pipeBottomTop + "px";
  pipeBottom.style.left = window.innerWidth + "px";
  pipeBottom.style.height = window.innerHeight - pipeBottomTop + "px";
  container.appendChild(pipeBottom);

  pipes.push({ top: pipeTop, bottom: pipeBottom });
}

function movePipes() {
  pipes.forEach((pipe, index) => {
    let left = parseInt(pipe.top.style.left);
    left -= 3;
    pipe.top.style.left = left + "px";
    pipe.bottom.style.left = left + "px";

    if (left < -60) {
      pipe.top.remove();
      pipe.bottom.remove();
      pipes.splice(index, 1);
      score++;
      document.getElementById("score").innerText = "Score: " + score;
    }

    if (
      left < 150 &&
      left + 60 > 100 &&
      (birdY < parseInt(pipe.top.style.height) ||
        birdY + 40 > parseInt(pipe.bottom.style.top))
    ) {
      endGame();
    }
  });
}

function endGame() {
  alert("Game Over! Score: " + score);
  isGameOver = true;
  location.reload();
}

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  isGameStarted = true;
  setInterval(createPipe, 1700); // Start pipes
  gameLoop(); // Start animation
});
