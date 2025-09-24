const telaDoJogo = document.getElementById('');
const contexto = telaDoJogo.getContext('2d');

let passaroX = 50;
let passaroY = 150;
let velocidadeY = 0;
const gravidade = 0.6;

const larguraColuna = 80;
const espacoEntreColunas = 200;
let colunas = [];

let pontuacao = 0;
let jogoAtivo = true;