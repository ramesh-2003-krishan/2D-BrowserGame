const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 200;

let dx = 2;
let dy = -2;

function draw() {
ctx.beginPath();
ctx.arc(x, y, 20, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.stroke();
}

function moveBall() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
draw();

x += dx;
y += dy;

requestAnimationFrame(moveBall);
}

moveBall();
