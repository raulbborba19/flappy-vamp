const vamp = document.querySelector(".vamp")
const gameOverScreen = document.querySelector(".game-over")
const scoreElement = document.querySelector(".score")
const gameBoard = document.querySelector(".game-board")

audioStart = new Audio("");
const gameOverSound = new Audio("");

let gameStarted = false;
let score = 0;
let vampPosition = 200;
let vampVelocity = 0;
const gravity = -0.6;
const lift = 10; 
const vampWidth = 60;
const boardHeight = 500;

const startGame = () => {
    gameStarted = true;
    audioStart.play();

    vamp.style.opacity = "1";
}

const restartGame = () => {
    window.location.reload();
}

const updateScore = () => {
    score +=1;
    scoreElement.textContent = score;
}

const vampJump = () => {
    if (!gameStarted) {
        startGame(); 
    }
    vampVelocity = lift;
}

const loop = setInterval(() => {
    if (!gameStarted) return;

    vampVelocity += gravity;
    vampPosition += vampVelocity

    if (vampPosition <= 0) {
        vampPosition = 0;

        clearInterval(loop);
        gameOverScreen.style.display = "flex";
    }

    if (vampPosition >= boardHeight - vampWidth) {
        vampPosition = boardHeight - vampWidth;
        vampVelocity = 0;
    }
    
    vamp.style.bottom = `${vampPosition}px`;
}, 10);

document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") { 
        vampJump();
    }
});
