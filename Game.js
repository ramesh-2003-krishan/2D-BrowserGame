const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 200;

let dx = 2;
let dy = -2;

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


function moveBall() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

draw();
drawPaddle();


x += dx;
y += dy;

if ( x  > canvas.width || x < 0){
    dx *= -1;
}
if( y < 0){
    dy *= -1;
}
if( y > canvas.height){
    alert("Game Over");
    document.location.reload();
    return;
}

requestAnimationFrame(moveBall);
}

moveBall();
