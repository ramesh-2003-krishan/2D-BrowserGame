const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(700, 150, 30, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
ctx.stroke();