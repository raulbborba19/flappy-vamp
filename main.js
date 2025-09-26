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

const vampJump = () => {
    if (!gameStarted) {
        startGame(); 
    }
    vampVelocity = lift;
}

const updateScore = () => {
    score +=1;
    scoreElement.textContent = score;
    const animationSpeed = 1.5/ (1 + score/500);
    stake.style.animation = `stake-animation ${animationSpeed}s infinite linear`; 
}

document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") { 
        vampJump();
    }
});

const restartGame = () => {
    window.location.reload();
}