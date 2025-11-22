// Form submission handler
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    // Add loading animation to button
    const btn = document.querySelector(".login-btn");
    const originalText = btn.textContent;
    btn.textContent = "LOADING...";
    btn.style.background = "linear-gradient(45deg, #666, #999)";
    btn.disabled = true;

    // Simulate login process
    setTimeout(() => {
      alert(`Welcome back, ${username}! Ready to play Flappy Bird?`);

      // Reset button
      btn.textContent = originalText;
      btn.style.background = "linear-gradient(45deg, #FF6B35, #F7931E)";
      btn.disabled = false;

      // Here you would typically redirect to the game
      // window.location.href = 'game.html';
    }, 1500);
  } else {
    alert("Please fill in all fields!");
  }
});

// Social login handlers
document.querySelector(".google-btn").addEventListener("click", function () {
  // Add loading effect
  this.textContent = "Loading...";
  this.disabled = true;

  setTimeout(() => {
    alert("Google login would be implemented here");
    this.textContent = "Google";
    this.disabled = false;
  }, 1000);
});

document.querySelector(".facebook-btn").addEventListener("click", function () {
  // Add loading effect
  this.textContent = "Loading...";
  this.disabled = true;

  setTimeout(() => {
    alert("Facebook login would be implemented here");
    this.textContent = "Facebook";
    this.disabled = false;
  }, 1000);
});

// Guest play handler
document.querySelector(".guest-btn").addEventListener("click", function () {
  const originalText = this.textContent;
  this.textContent = "STARTING...";
  this.disabled = true;

  setTimeout(() => {
    alert("Starting game as guest...");
    this.textContent = originalText;
    this.disabled = false;
    // window.location.href = 'game.html?guest=true';
  }, 1000);
});

// Input field enhancements
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

inputs.forEach((input) => {
  // Add focus and blur effects
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });

  // Add typing sound effect simulation (visual feedback)
  input.addEventListener("input", function () {
    this.style.boxShadow = "0 0 15px rgba(255, 107, 53, 0.5)";
    setTimeout(() => {
      this.style.boxShadow = "0 0 10px rgba(255, 107, 53, 0.3)";
    }, 100);
  });
});

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const activeElement = document.activeElement;

    if (activeElement.id === "username") {
      document.getElementById("password").focus();
    } else if (activeElement.id === "password") {
      document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    }
  }

  if (e.key === "Escape") {
    // Clear all inputs
    inputs.forEach((input) => {
      input.blur();
    });
  }
});

// Add particle effects on button hover
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "#FFD700";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "1000";

  document.body.appendChild(particle);

  // Animate particle
  const animation = particle.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${Math.random() * 100 - 50}px, ${
          Math.random() * 100 - 50
        }px) scale(0)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  );

  animation.onfinish = () => {
    particle.remove();
  };
}

// Add particle effects to login button
document
  .querySelector(".login-btn")
  .addEventListener("mouseover", function (e) {
    const rect = this.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createParticle(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height
        );
      }, i * 100);
    }
  });

// Add score counter animation
let scoreCounter = 0;
const scoreElement = document.querySelector(".score-info");

function updateScore() {
  scoreCounter = (scoreCounter + 1) % 10000;
  const formattedScore = scoreCounter.toString().padStart(4, "0");
  scoreElement.innerHTML = `HIGH<br>${formattedScore}`;
}

// Update score every 3 seconds
setInterval(updateScore, 3000);

// Add welcome message based on time of day
function showWelcomeMessage() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const gameTitle = document.querySelector(".game-title");
  gameTitle.setAttribute("title", `${greeting}, ready to fly?`);
}

// Initialize welcome message
showWelcomeMessage();

// Add smooth scroll effect for better UX (if page becomes scrollable)
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".login-container");
  const speed = scrolled * 0.5;

  parallax.style.transform = `translateY(${speed}px)`;
});
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;

  // Save username to localStorage
  localStorage.setItem("gameUser", username);

  // Redirect to game page
  window.location.href = "game.html";
});
