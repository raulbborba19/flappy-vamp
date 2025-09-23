// --- Elementos do DOM e Configurações Iniciais ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const controlsMessage = document.getElementById('controls');
const gameOverMessage = document.getElementById('gameOver');

// Configurações do jogo
const gameSpeed = 5;
let score = 0;
let isGameOver = false;
let isGameStarted = false;

// --- Imagens do Jogo (Pixel Art) ---
const batImg = new Image();
batImg.src = 'https://i.ibb.co/68nL3jX/bat-pixel.png'; // Exemplo de URL de imagem de morcego
const stakeImg = new Image();
stakeImg.src = 'https://i.ibb.co/hK31z2z/stake-pixel.png'; // Exemplo de URL de imagem de estaca
const backgroundImg = new Image();
backgroundImg.src = 'https://i.ibb.co/F8tF8sZ/background-pixel.png'; // Exemplo de URL de imagem de fundo

// --- Objeto do Morcego (Personagem) ---
const bat = {
    x: 100,
    y: canvas.height / 2,
    width: 50,
    height: 35,
    gravity: 0.5,
    lift: -10,
    velocity: 0,
    draw() {
        ctx.drawImage(batImg, this.x, this.y, this.width, this.height);
    },
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Limita o movimento do morcego dentro da tela
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    fly() {
        this.velocity += this.lift;
    }
};

// --- Gerenciamento das Estacas (Obstáculos) ---
let stakes = [];
const stakeWidth = 50;
const stakeGap = 180;
const stakeSpacing = 350;

function createStake() {
    // A altura da estaca superior é aleatória
    const topStakeHeight = Math.random() * (canvas.height - stakeGap - 100) + 50;
    
    stakes.push({
        x: canvas.width,
        y: 0,
        height: topStakeHeight,
        passed: false
    });
    
    stakes.push({
        x: canvas.width,
        y: topStakeHeight + stakeGap,
        height: canvas.height - topStakeHeight - stakeGap,
        passed: false
    });
}

function updateStakes() {
    // Remove estacas que saíram da tela para otimização
    stakes = stakes.filter(stake => stake.x + stakeWidth > 0);

    for (let i = 0; i < stakes.length; i++) {
        stakes[i].x -= gameSpeed;
    }

    // Adiciona novas estacas
    if (stakes.length > 0 && stakes[stakes.length - 1].x < canvas.width - stakeSpacing) {
        createStake();
    }
}

function drawStakes() {
    for (let i = 0; i < stakes.length; i++) {
        // Desenha a estaca usando a imagem pixelada
        ctx.drawImage(stakeImg, stakes[i].x, stakes[i].y, stakeWidth, stakes[i].height);
    }
}

// --- Detecção de Colisão e Lógica do Jogo ---
function checkCollision() {
    for (let i = 0; i < stakes.length; i++) {
        // Verifica colisão com o morcego
        if (
            bat.x < stakes[i].x + stakeWidth &&
            bat.x + bat.width > stakes[i].x &&
            bat.y < stakes[i].y + stakes[i].height &&
            bat.y + bat.height > stakes[i].y
        ) {
            endGame();
        }
    }

    // Verifica colisão com o chão ou teto
    if (bat.y + bat.height > canvas.height || bat.y < 0) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    gameOverMessage.style.display = 'block';
    controlsMessage.style.display = 'none';
    scoreDisplay.style.display = 'none';
}

// --- Atualização do Placar ---
function updateScore() {
    for (let i = 0; i < stakes.length; i++) {
        if (!stakes[i].passed && stakes[i].x + stakeWidth < bat.x) {
            stakes[i].passed = true;
            // Apenas uma das estacas do par (superior ou inferior) precisa marcar o ponto
            if (i % 2 === 0) {
                score++;
                scoreDisplay.textContent = score;
            }
        }
    }
}

// --- Loop Principal do Jogo ---
function gameLoop() {
    if (isGameOver) {
        return;
    }

    // Desenha o fundo e limpa a tela para cada frame
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    if (isGameStarted) {
        // Lógica de jogo em execução
        bat.update();
        updateStakes();
        checkCollision();
        updateScore();
    }
    
    // Desenha todos os elementos
    bat.draw();
    drawStakes();
    
    requestAnimationFrame(gameLoop);
}

// --- Eventos de Controle ---
function startGame(event) {
    if (!isGameStarted && !isGameOver) {
        isGameStarted = true;
        controlsMessage.style.display = 'none';
        scoreDisplay.style.display = 'block';
        createStake(); // Inicia a criação das estacas
        gameLoop();
    }
    // Permite o voo do morcego apenas se o jogo já tiver começado
    if (isGameStarted && event.type === 'click') {
        bat.fly();
    }
    if (isGameStarted && event.type === 'keydown' && event.code === 'Space')
