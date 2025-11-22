const bird = document.getElementById("bird");
const container = document.getElementById("game-container");

let birdY = 200;
let gravity = 1;
let velocity = 1;
let isGameOver = false;
let pipes = [];
let score = 0;

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

let isGameStarted = true;

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
    velocity = -20;
    flapSound.play();
  }
});
window.addEventListener("touchstart", () => {
  velocity = -10;
  flapSound.play();
});

function createPipe() {
  const pipeGap = 600;
  const minHeight = 300;
  const maxHeight = window.innerHeight - pipeGap - 100;

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
    left -= 6;
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
      left < 100 &&
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
  updateScore(score);
  location.reload();
}

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  isGameStarted = true;
  setInterval(createPipe, 1700); // Start pipes
  gameLoop(); // Start animation
});
window.onload = function () {
  const profileImg = document.getElementById("profileImg");
  const picInput = document.getElementById("picInput");
  const changePicBtn = document.getElementById("changePicBtn");
  const profileMenu = document.getElementById("profileMenu");
  const profileToggle = document.getElementById("profileToggle");

  // 1) Load or prompt for name
  let playerName =
    localStorage.getItem("playerName") || prompt("Enter your name:") || "Guest";
  localStorage.setItem("playerName", playerName);
  document.getElementById("playerName").textContent = playerName;

  // 2) Load high score
  let highScore = localStorage.getItem("highScore") || 0;
  document.getElementById("highScore").textContent = highScore;

  // 3) Load or set default profile pic
  const storedPic = localStorage.getItem("profilePic");
  if (storedPic) {
    profileImg.src = storedPic;
  }

  // Toggle menu open/close
  profileToggle.addEventListener("click", (e) => {
    profileMenu.classList.toggle("hidden");
    e.stopPropagation();
  });
  profileMenu.addEventListener("click", (e) => e.stopPropagation());
  window.addEventListener("click", () => profileMenu.classList.add("hidden"));

  // When “Change Picture” clicked, open file picker
  changePicBtn.addEventListener("click", () => picInput.click());

  // Handle new picture
  picInput.addEventListener("change", () => {
    const file = picInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataURL = e.target.result;
      profileImg.src = dataURL;
      localStorage.setItem("profilePic", dataURL);
    };
    reader.readAsDataURL(file);
  });

  window.updateScore = function (score) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").textContent = highScore;
    }
  };
};
document.getElementById("highScoreDisplay").textContent = highScore;
