console.log("Pong game initialized");

const canvas = document.getElementById("pongCanvas");
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.7;


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
  speedX:2,
  speedY:2,
  initialX:canvas.width / 2,
  initialY:canvas.height / 2, 
  initialSpeedX:2,
  initialSpeedY:2,
  color: "rgba(216, 203, 22, 1)",
  acceleration: {
    x: 0.5,
    y: 0.5
  },
};

let isGoingRight = true;

const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.3;

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
  player2: 0,
  winning: 11
};

let resettimeout = null;

let isGamePaused = false;

function startResetTimeout() {
  if (resettimeout !== null) {
    clearTimeout(resettimeout);
  }

  resettimeout = setTimeout(() => {
    resettimeout = null;                
    isGamePaused = false;
    const pauseButton = document.getElementById("gamePauseButton");
    if (pauseButton) pauseButton.textContent = "Pause Game";
    resetgame();
  }, 3000);
}

document.addEventListener('click', function() {
    startBackgroundMusic();
}, { once: true });

const musicToggleButton = document.getElementById("musicToggleButton");
musicToggleButton.addEventListener("click", toggleBackgroundMusic);


function checkandDysplayWinner() {
  if (scores.player1 >= scores.winning) {
    isGamePaused = true;
    alert("Player 1 Wins!");
  }
  else if (scores.player2 >= scores.winning) {
    isGamePaused = true;
    alert("Player 2 Wins!");
  }
}

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
function increaseBallSpeed() {
   if (ball.speedX > 0) {
    ball.speedX += ball.acceleration.x ;
  }
  else {
    ball.speedX -= ball.acceleration.x  ;
  }
  if (ball.speedY > 0) {
    ball.speedY += ball.acceleration.y ;
  }
  else {
    ball.speedY -= ball.acceleration.y ;
  }
}

function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("Music playback failed:", error);
    });
}

function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

function randomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
}


function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }//bounce off top and bottom walls
    if (ball.x - ball.radius < player1.x + player1.width && 
      ball.x + ball.radius > player1.x &&
      ball.y + ball.radius > player1.y && 
      ball.y - ball.radius < player1.y + player1.height) {
    
    const hitLocation = (ball.y - (player1.y + player1.height/2)) / (player1.height/2);
    ball.speedX = Math.abs(ball.speedX); 
    ball.speedY = ball.speedY + (hitLocation * 2); 
    increaseBallSpeed();
    playPaddleHitSound();
    ball.x = player1.x + player1.width + ball.radius; 
  }

    

    if (ball.x + ball.radius > player2.x && 
      ball.x - ball.radius < player2.x + player2.width &&
      ball.y + ball.radius > player2.y && 
      ball.y - ball.radius < player2.y + player2.height) {
    

    const hitLocation = (ball.y - (player2.y + player2.height/2)) / (player2.height/2);
    
    
    ball.speedX = -Math.abs(ball.speedX); 
    ball.speedY = ball.speedY + (hitLocation * 2); 
    
    increaseBallSpeed();
    playPaddleHitSound();
    ball.x = player2.x - ball.radius; 
  }

  if (ball.x - ball.radius < 0 && isGamePaused === false) {
    scores.player2 += 1;
    updateScores();
    isGamePaused = true;
    startResetTimeout();
  }

  if (ball.x + ball.radius > canvas.width && isGamePaused === false) {
    scores.player1 += 1;
    updateScores();
    isGamePaused = true;
    startResetTimeout();
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

function playPaddleHitSound() {
    const sound = document.getElementById('paddleHitSound');
    console.log("Playing paddle hit sound"); 
    sound.currentTime = 0;
    sound.volume = 1.0; 
    sound.play().catch(error => {
        console.error("Error playing sound:", error);
    });
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
  ball.x = ball.initialX;
  ball.y = ball.initialY;
  ball.speedX = ball.initialSpeedX * (isGoingRight ? 1 : -1);
  ball.speedY = ball.initialSpeedY * randomDirection();
  player1.y = player1.initialY;
  player2.y = player2.initialY;
  isGoingRight = !isGoingRight; 
}

function restart() {
  if (resettimeout !== null) {
    clearTimeout(resettimeout);
    resettimeout = null;
  }
  scores.player1 = 0;
  scores.player2 = 0;
  updateScores();
  resetgame();
  isGamePaused = false;
  const pauseButtonEl = document.getElementById("gamePauseButton");
  if (pauseButtonEl) pauseButtonEl.textContent = "Pause Game";
}

const resetButton = document.getElementById("gameResetButton");
resetButton.addEventListener("click", restart);

const pauseButton = document.getElementById("gamePauseButton");
pauseButton.addEventListener("click", function() {
  if (resettimeout !== null) return;
  isGamePaused = !isGamePaused;
  pauseButton.textContent = isGamePaused ? "Resume Game" : "Pause Game";
    if (isGamePaused) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play().catch(error => {
            console.log("Music playback failed:", error);
        });
    }
    
    console.log("Game paused:", isGamePaused); 
});





function animate (timestamp) {
  if (!isGamePaused) {
      update();
      checkandDysplayWinner();
      draw();
    }
  console.log(isGamePaused);
  requestAnimationFrame(animate);
  //console.log(timestamp);
}

updateScores();

animate();
