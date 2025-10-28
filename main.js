console.log("Pong game initialized");

const player1color = "rgba(231, 19, 19, 1)";
const player2color = "rgba(60, 20, 218, 1)";
const ballcolor = "rgba(216, 203, 22, 1)";
const netcolor = "rgba(252, 252, 252, 1)";

const player1width = 20;
const player1height = 100; 
const player2width = 20;
const player2height = 100; 
const player1x = 10;
let player1y = 150;
const player2x = 770;
let player2y = 150;
const player1up = "w"
const player1down = "s"
const player2up = "ArrowUp"
const player2down = "ArrowDown"
const playerspeed = 5;

let ballX = 400;
let ballY = 200;
const ballRadius = 10;
let ballSpeedX = 1;
let ballSpeedY = 1;


const canvas = document.getElementById("pongCanvas");

function draw() {
  
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player1color;
  ctx.fillRect(player1x,player1y, player1width, player1height);

  ctx.fillStyle = player2color;
  ctx.fillRect(player2x,player2y, player2width, player2height);

  ctx.fillStyle = netcolor;
  ctx.fillRect(400, 0, 10, 400);
}

draw();

function drawBall() {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = ballcolor;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  ctx.fill();
}
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballRadius < player2x + player2width &&
      ballY > player2y &&
      ballY < player2y + player2height) {
    ballSpeedX = -ballSpeedX;
  }

}


document.addEventListener("keydown", function(event) {
  console.log("Key pressed: " + event.key);
  if (event.key === player1up && player1y > 0) {
    player1y -= playerspeed;    
  }
  
  if (event.key === player1down && player1y + player1height < canvas.height) {
    player1y += playerspeed;
  }
  
  if (event.key === player2up && player2y > 0) {
    player2y -= playerspeed;
  }
  
  if (event.key === player2down && player2y + player2height < canvas.height) {
    player2y += playerspeed;
  }
  
});

function animate (timestamp) {
  draw();
  updateBall();
  drawBall();
  requestAnimationFrame(animate);
  console.log(timestamp);
}

animate();
