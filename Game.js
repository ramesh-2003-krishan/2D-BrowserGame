const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 200;

let dx = 2;
let dy = -2;


let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScore = parseInt(highScore);


let level = 1;
let nextLevelScore = 10;
let increment = 10;


const ballWidth = 50;
const ballHeight = 50;

const paddleWidth = 150;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

function draw() {
ctx.beginPath();
ctx.arc(x, y, 20, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.closePath();
}



function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = 'black';
ctx.fill();
ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
}
}
function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
}
}


function drawScore() {
ctx.font = "32px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 30);
ctx.fillText("High Score: "+highScore, 8, 70);
ctx.fillText("Level: "+level, 8, 110);
}


function updateLevel() {
if(score >= nextLevelScore) {
    level++;

    let speed = 1 * level;
    dx = Math.sign(dx)* speed;
    dy = Math.sign(dy)* speed;

    nextLevelScore += increment;

    if(increment < 100) {
        increment *=2;
    }
}
}
  



function moveBall() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

draw();
drawPaddle();
drawScore();


x += dx;
y += dy;

if(rightPressed) {
    paddleX = Math.min( canvas.width - paddleWidth, paddleX + 7);
}
if(leftPressed) {
    paddleX = Math.max( 0, paddleX - 7);
}


if ( x+20 > canvas.width || x < 0){
    dx *= -1;
}
if( y-20 < 0 ){
    dy *= -1;
}

if(y + 20 > canvas.height - paddleHeight && x > paddleX && x < paddleX + paddleWidth){
    dy *= -1;
    score++;
    updateLevel();
}else if( y+20 > canvas.height){
    if(score > highScore){
        localStorage.setItem("highScore", score);
        highScore = score;
    }
    alert("Game Over");
    document.location.reload();
    return;
}

requestAnimationFrame(moveBall);
}

moveBall();
