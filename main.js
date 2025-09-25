const vamp = document.querySelector(".vamp")
const startButton = document.querySelector(".start")
const gameOverScreen = document.querySelector(".game-over")
const scoreElement = document.querySelector(".score")

audioStart = new Audio("");
const gameOverSound = new Audio("");

let gameStarted = false;
let birdPosition = 200;
let birdVelocity = 0;
const gravity = -0.5;
const lift = 10; 

const startGame = () => {
    gameStarted = true;
    audioStart.play();

    vamp.style.opacity = "1";
    stake.style.opacity = "1";
}

const updateScore = () => {
    score +=1;
    scoreElement.textContent = score;
    const animationSpeed = 1.5/ (1 + score/500);
    stake.style.animation = `stake-animation ${animationSpeed}s infinite linear`; 
}

const loop = setInterval(() => {
const stakePosition = stake.offsetLeft;
const vampPosition = +window.getComputedStyle(vamp).bottom.replace("px", "");

    if(stakePosition <= 120 && stakePosition > 0 && vampPosition < 80) {
        stake.style.animation = "none";
        stake.style.left = `${stakePosition}px`;

        vamp.style.animation = "none";
        vamp.style.left = `${marioPosition}px`;

        vamp.src = "./img/game-over.png";
        vamp.style.width = "75px";
        vamp.style.marginLeft = "50px";

        audioStart.pause();
        gameOverSound.play();

        clearInterval(loop);
        gameOverScreen.style.display = "flex";
    } else if (stakePosition < 0 && gameStard) {
        updateScore();
        stake.style.left = '';
    }
},10);
document.addEventListener("keydown", jump);


const restartGame = () => {
    window.location.reload();
}