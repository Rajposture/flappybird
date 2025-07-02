const bird = document.getElementById("bird");
const container = document.getElementById("game-container");

let birdY = 200;
let gravity = 1;
let velocity = 1;
let isGameOver = false;
let pipes = [];
let score = 0;

function gameLoop() {
  if (isGameOver) return;

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

function createPipe() {
  const pipeGap = 170;
  const minHeight = 50;
  const maxHeight = window.innerHeight - pipeGap - 200;

  let pipeTopHeight =
    Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
  let pipeBottomTop = pipeTopHeight + pipeGap;

  const pipeTop = document.createElement("img");
  pipeTop.src = "pipetop.png";
  pipeTop.className = "pipe";
  pipeTop.style.top = "px";
  pipeTop.style.left = window.innerWidth + "px";
  pipeTop.style.height = pipeTopHeight + "px";
  container.appendChild(pipeTop);
  pipeTop.style.position = "absolute";

  const pipeBottom = document.createElement("img");
  pipeBottom.src = "pipebottom.png";
  pipeBottom.className = "pipe";
  pipeBottom.style.top = pipeBottomTop + "px";
  pipeBottom.style.left = window.innerWidth + "px";
  pipeBottom.style.height = window.innerHeight - pipeBottomTop + "px";
  container.appendChild(pipeBottom);
  pipeBottom.style.position = "absolute";

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
      console.log("Score:", score);
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

setInterval(createPipe, 2000);
gameLoop();
