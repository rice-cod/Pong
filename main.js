console.log("Pong game initialized");

const player1color = "rgba(194, 21, 21, 1)";
const player2color = "rgba(51, 25, 171, 1)";
const ballcolor = "rgba(255, 0, 0, 1)";
const netcolor = "rgba(3, 3, 3, 1)";

const player1width = 20;
const player1height = 100; 
const player2width = 20;
const player2height = 100; 
const player1x = 10;
const player1y = 150;
const player2x = 770;
const player2y = 150;

function draw() {
  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = player1color;
  ctx.fillRect(player1x,player1y, player1width, player1height);

  ctx.fillStyle = player2color;
  ctx.fillRect(player2x,player2y, player2width, player2height);

  ctx.fillStyle = netcolor;
  ctx.fillRect(400, 0, 10, 400);
}
draw();

