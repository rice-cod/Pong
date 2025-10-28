console.log("Pong game initialized");

const canvas = document.getElementById("pongCanvas");

const player1color = "rgba(231, 19, 19, 1)";
const player2color = "rgba(60, 20, 218, 1)";
const ballcolor = "rgba(216, 203, 22, 1)";
const netcolor = "rgba(252, 252, 252, 1)";


const playerspeed = 6;
const player1 = {
  width:20,
  height:100,
  x:10, 
  y:canvas.height / 2 - 50,
  up:"w",
  down:"s", 
  initialX:10, 
  initialY: canvas.height / 2 - 50,
  color: "rgba(231, 19, 19, 1)"
};

const player2 = {
  width:20,
  height:100,
  x:canvas.width - 30,
  y:canvas.height / 2 - 50,
  up:"ArrowUp",
  down:"ArrowDown",
  initialX:canvas.width - 30,
  initialY:canvas.height / 2 - 50, 
  color: "rgba(60, 20, 218, 1)"
};

const ball = {
  x:400,
  y:200,
  radius:10,
  speedX:1,
  speedY:1,
  initialX:canvas.width / 2,
  initialY:canvas.height / 2, 
  initialSpeedX:1,
  initialSpeedY:1,
  color: "rgba(216, 203, 22, 1)"
};

const net = {
  x:canvas.width / 2 - 5,
  y:0,
  width:10,
  height:canvas.height,
  color: "rgba(252, 252, 252, 1)"
};

const keysPressed = {
  player1Up: false,
  player1Down: false,
  player2Up: false,
  player2Down: false
};

const scores = {
  player1: 0,
  player2: 0
};


let isGamePaused = false;



function updateScores() {
  const player1ScoreElement = document.getElementById("player1Score");
  const player2ScoreElement = document.getElementById("player2Score");
  player1ScoreElement.textContent = scores.player1;
  player2ScoreElement.textContent = scores.player2;
}

function updatePlayers() {
  if (keysPressed.player1Up && player1.y > 0) {
    player1.y -= playerspeed;    
  }
  
  if (keysPressed.player1Down && player1.y + player1.height < canvas.height) {
    player1.y += playerspeed;
  }
  
  if (keysPressed.player2Up && player2.y > 0) {
    player2.y -= playerspeed;
  }
  
  if (keysPressed.player2Down && player2.y + player2.height < canvas.height) {
    player2.y += playerspeed;
  }
}

function updateBall() {
  ball.x += ball.speedX + 0.1;
  ball.y += ball.speedY + 0.1;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x - ball.radius < player1.x + player1.width && 
      ball.y > player1.y && 
      ball.y < player1.y + player1.height) {
    ball.speedX = -ball.speedX;
  }

  if (ball.x + ball.radius > player2.x && 
      ball.y > player2.y && 
      ball.y < player2.y + player2.height) {
    ball.speedX = -ball.speedX;
  }

  if (ball.x - ball.radius < 0 && isGamePaused === false) {
    scores.player2 += 1;
    updateScores();
    isGamePaused = true;
    setTimeout(() => {
      isGamePaused = false;
      resetgame();
    }, 3000);
  }

  if (ball.x + ball.radius > canvas.width && isGamePaused === false) {
    scores.player1 += 1;
    updateScores();
    isGamePaused = true;
    setTimeout(() => {
      isGamePaused = false;
      resetgame();
    }, 3000);
  }
 
}

function update() {
  updateBall();
  updatePlayers();
}

function drawBall() {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawNet() {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = net.color;
  ctx.fillRect(net.x, net.y, net.width, net.height);
}

function drawPlayer(player) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x,player.y, player.width, player.height);
}

function draw() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(player1);
  drawPlayer(player2);
  drawNet();
  drawBall()
}


document.addEventListener("keydown", function(event) {
  console.log("Key pressed: " + event.key);
  if (event.key === player1.up) {
    keysPressed.player1Up = true;   
  }
  
  if (event.key === player1.down) {
    keysPressed.player1Down = true;
  }
  
  if (event.key === player2.up) {
    keysPressed.player2Up = true;
  }
  
  if (event.key === player2.down) {
    keysPressed.player2Down = true;
  }
  
});

document.addEventListener("keyup", function(event) {
  console.log("Key released: " + event.key);
  if (event.key === player1.up) {
    keysPressed.player1Up = false;   
  }
  if (event.key === player1.down) {
    keysPressed.player1Down = false;
  }
  if (event.key === player2.up) {
    keysPressed.player2Up = false;
  } 
  if (event.key === player2.down) {
    keysPressed.player2Down = false;
  }
});

function resetgame() {
  ball.x =  ball.initialX;
  ball.y = ball.initialY;
  ball.speedX = ball.initialSpeedX; 
  ball.speedY = ball.initialSpeedY;
  player1.y = player1.initialY;
  player2.y = player2.initialY;
}

const resetButton = document.getElementById("gameResetButton");
resetButton.addEventListener("click", resetgame);


function animate (timestamp) {
  if (!isGamePaused) {
      update();
      draw();
    }

  requestAnimationFrame(animate);
  console.log(timestamp);
}

updateScores();

animate();
