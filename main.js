const vamp = document.querySelector(".vamp")
const gameOverScreen = document.querySelector(".game-over")
const scoreElement = document.querySelector(".score")
const gameBoard = document.querySelector(".game-board")

const jumpSound = new Audio("./sons/fabric-flap-80054.mp3");
const scoreSound = new Audio("./sons/lighter-6324.mp3");
const gameOverSound = new Audio("./sons/poof-80161.mp3");

let gameStarted = false;
let score = 0;
let vampPosition = 200;
let vampVelocity = 0;
const gravity = -0.4;
const lift = 10; 
const vampWidth = 60;
const boardHeight = 500;
const STAKE_WIDTH = 80;
const STAKE_GAP = 170;
const STAKE_SPEED = 3;
let stakeTimer = 2000;
const STAKE_MIN_HEIGHT = 50;

let activeStakes = []

const startGame = () => {
    gameStarted = true;

    vamp.style.opacity = "1";
    createStakes();
}

const createStakes = () => {
    const stakeInterval = setInterval(generateStake, stakeTimer);
}

const generateStake = () => {
    const maxTopHeight = boardHeight - STAKE_GAP - STAKE_MIN_HEIGHT;

    const topHeight = Math.floor(Math.random () * (maxTopHeight - STAKE_MIN_HEIGHT)) + STAKE_MIN_HEIGHT;

    const bottomHeight = boardHeight - topHeight - STAKE_GAP;

    const stakeContainer = document.createElement('div');
    stakeContainer.classList.add('stake-container');

    const topStake = document.createElement('div')
    topStake.classList.add('stake', 'stake-top');
    topStake.style.height = `${topHeight}px`;

    const bottomStake = document.createElement('div')
    bottomStake.classList.add('stake', 'stake-bottom');
    bottomStake.style.height = `${bottomHeight}px`;

    stakeContainer.appendChild(topStake);
    stakeContainer.appendChild(bottomStake);

    gameBoard.appendChild(stakeContainer);

    activeStakes.push({
        element: stakeContainer,
        passed: false,
        xPosition: gameBoard.offsetWidth
    });
};

const restartGame = () => {
    window.location.reload();
}

const updateScore = () => {
    score +=1;
    scoreElement.textContent = score;

    scoreSound.play();
}

const vampJump = () => {
    if (!gameStarted) {
        startGame(); 
    }
    vampVelocity = lift;

    jumpSound.play();

    vamp.classList.add('vamp-jump');
}

const loop = setInterval(() => {
    if (!gameStarted) return;

    vampVelocity += gravity;
    vampPosition += vampVelocity

    if(vampVelocity < 0) {
        vamp.classList.add9('vamp-jump');
    }

    if (vampPosition <= 0) {
        vampPosition = 0;  
        
        gameOverSound.play();

        clearInterval(loop);
        gameOverScreen.style.display = "flex";
    }

    if (vampPosition >= boardHeight - vampWidth) {
        vampPosition = boardHeight - vampWidth;
        vampVelocity = 0;
    }

    activeStakes.forEach((stake, index) => {
        stake.xPosition -= STAKE_SPEED;
        stake.element.style.left = `${stake.xPosition}px`;

        if (stake.xPosition < -STAKE_WIDTH) {
            stake.element.remove();
            activeStakes.splice(index, 1);
            return;
        }

        if (stake.xPosition < 50 && !stake.passed) {
            updateScore();
            stake.passed = true;
        }

        if (
            stake.xPosition < vampWidth &&
            stake.xPosition + STAKE_WIDTH > 0
        ) {
            const topStakeHeight = stake.element.querySelector('.stake-top').offsetHeight;
            const bottomStakeHeight = stake.element.querySelector('.stake-bottom').offsetHeight;

            const gapStartFromBottom = bottomStakeHeight;

            const gapEndFromBottom = boardHeight - topStakeHeight;

            const vampTopY = vampPosition + vampWidth;
            const vampBottomY = vampPosition;

            const hitsBottom = vampBottomY < gapStartFromBottom;
            const hitsTop = vampTopY > gapEndFromBottom;

            if (hitsBottom || hitsTop) {
                clearInterval(loop)
                gameOverScreen.style.display = 'flex';
                activeStakes.forEach(s => s.element.style.animation = 'none');
            }
        }
    });
    
    vamp.style.bottom = `${vampPosition}px`;
}, 10);

document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") { 
        vampJump();
    }
});
