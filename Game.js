const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let gameStarted = false;

let x = canvas.width / 2;
let y = canvas.height - 200;

let dx = 2;
let dy = -2;


let bgImage = new Image();
bgImage.src = "gam.png";

let bgImageStart = false;
bgImage.onload = function() {
    bgImageStart = true;
    moveBall();
};


let bgMusic = new Audio("backmu.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.2;


let musicStart = false;

function startMusic() {
if(!musicStart && soundOn) {
    bgMusic.play();
    musicStart = true;
}
}

let hitSound = new Audio("hit.mp3");

let loseSound = new Audio("lose.mp3");
loseSound.volume = 0.5;

let soundOn = true;

document.getElementById("soundToggle").addEventListener("click", function() {
    soundOn = !soundOn;
    if(soundOn) {
        this.innerText = "Sound: ON";
        bgMusic.play();
    } else {
        this.innerText = "Sound: OFF";
        bgMusic.pause();
    }
});

let ballColor = "#ffffff";


let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScore = parseInt(highScore);


let level = 1;
let nextLevelScore = 10;
let increment = 10;


let isPaused = false;


const ballWidth = 50;
const ballHeight = 50;

const paddleWidth = 150;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

function draw() {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}





function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {

 startMusic();

if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
}
}
function keyUpHandler(e) {

 startMusic();

 if(e.key == "p" || e.key == "P") {
    isPaused = !isPaused;
    if(!isPaused) {
        moveBall();
    }
    return;
}  
    


if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
}
}


function drawScore() {

ctx.font = "32px Arial";
ctx.fillStyle = "#ffffff";
ctx.fillText("Score: "+score, 70, 30);
ctx.fillText("High Score: "+highScore, 128, 70);
ctx.fillText("Level: "+level, 70, 110);
}


function updateLevel() {
if(score >= nextLevelScore) {
    level++;

    let speed = 1.5 * level;
    dx = Math.sign(dx)* speed;
    dy = Math.sign(dy)* speed;

    nextLevelScore += increment;

    if(increment < 100) {
        increment *=2;
    }
}
}
  



function moveBall() {

    if(isPaused) {
        ctx.font = "48px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        return;
    }


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

if(!gameStarted) {
    ctx.font = "48px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    
    return;
}

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
    if(soundOn) {
        hitSound.play();
    }
    dy *= -1;
    score++;
    updateLevel();
}else if( y+20 > canvas.height){
    if(score > highScore){
        localStorage.setItem("highScore", score);
        highScore = score;
    }
    

    bgMusic.pause();
    bgMusic.currentTime = 0;
    loseSound.play();
    alert("Game Over");
    document.location.reload();
    return;
}

requestAnimationFrame(moveBall);
}

document.getElementById("startButton").addEventListener("click", function() {

    console.log("Start button clicked");

    gameStarted = true;
    startMusic();
    moveBall();
    
    document.querySelector(".menu").style.display = "none";

});

document.getElementById("highScoresButton").addEventListener("click", function() {
    let highScore = localStorage.getItem("highScore") || 0;
    alert("High Score: " + highScore);
});

document.getElementById("optionsButton").addEventListener("click", function() {
    document.querySelector(".menu").style.display = "none";
    document.getElementById("optionsMenu").style.display = "block";
    
});

document.getElementById("backBtn").addEventListener("click", function() {
    document.getElementById("optionsMenu").style.display = "none";
    document.querySelector(".menu").style.display = "block";
});

document.getElementById("ballColor").addEventListener("change", function() {
    ballColor = this.value;
});

document.getElementById("highScoresButton").addEventListener("click", function() {
    document.querySelector(".menu").style.display = "none";
    document.getElementById("highScoresMenu").style.display = "block";

    let highScore = localStorage.getItem("highScore") || 0;
    document.getElementById("highScoresList").innerHTML = "<li>🏆 High Score: " + highScore + "</li>";
    
    }

);

document.getElementById("backBtn2").addEventListener("click", function() {
    document.getElementById("highScoresMenu").style.display = "none";
    document.querySelector(".menu").style.display = "block";
});



moveBall();
