//board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;

//ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
  x: shipX,
  y: shipY,
  width: shipWidth,
  height: shipHeight
}

let shipImg;
let shipVelocityX = tileSize; // ship moving speed

//aliens
let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; // number of aliens to defeat
let alienVelocityX = 1; // alien moving speed

//bullets
let bulletArray = [];
let bulletVelocityY = -10 //bullet moving speed

let score = 0;
let gameOver = false;

window.onload = function() {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d"); //used for drawing on the board

  shipImg = new Image();
  shipImg.src = "./ship.png";
  shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
    }


  alienImg = new Image();
  alienImg.src = "./alien-barbiepink.png";
  createAliens();

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip); //key can be held down
  document.addEventListener("keyup", shoot); //key needs to be released
}

function update() {
  requestAnimationFrame(update);

  context.clearRect(0, 0, board.width, board.height);

  if (gameOver) {
    context.fillStyle = "red"
    context.font = "60px Arial";
    context.fillText("Game Over", boardWidth / 2 - 155, boardHeight / 2);
    return;
  }

  context.clearRect(0, 0, board.width, board.height)

  //ship
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

  //aliens
  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
      alien.x += alienVelocityX

      //if alien touches the borders
      if (alien.x +alien.width >= board.width || alien.x <= 0) {
        alienVelocityX *= -1;
        alien.x += alienVelocityX*2;

        //move all aliens up by one row
        for (let j = 0; j < alienArray.length; j++) {
          alienArray[j].y += alienHeight;
        }
      }
      context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

      if (alien.y >= ship.y) {
        gameOver = true;
      }
    }
  }

  //bullets
  for (let i = 0; i < bulletArray.length; i++) {
      let bullet = bulletArray[i];
      bullet.y += bulletVelocityY;
      context.fillStyle="pink";
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    //bullet collision with aliens
    for (let j = 0; j < alienArray.length; j++) {
      let alien = alienArray[j];
      if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
        bullet.used = true;
        alien.alive = false;
        alienCount--;
        score += 100;
      }
    }
  }

    //clear bullets
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
      bulletArray.shift(); //removes first element of the array
    }

    //next level
    if (alienCount == 0) {
        //increase the number of aliens in columns and rows by 1
        alienColumns = Math.min(alienColumns + 1, columns/2 -2); //each alien width is two tile sizes and minus two so that the alien can move left at right, the cap is at 16/2 -2 = 6
        alienRows = Math.min(alienRows + 1, rows-4); // cap at 16-4 = 12
        alienVelocityX += 0.2; //increase the alien movement speed
        alienArray = [];
        bulletArray = []; //if you keep firing and clear the aliens, one of the previously fired bullets might touch an aliens, so the alien group might have one missing
        createAliens();
  }

  //score
  context.fillStyle="white";
  context.font="16px courier";
  context.fillText(score, 5, 20);
}

function moveShip(e) {
  if (gameOver) {
    return;
  }

  if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
    ship.x -= shipVelocityX; //move left on tile
  }
  else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
    ship.x += shipVelocityX; //move right one tile
  }
}

function createAliens() {
  let alienColors = ["./alien-barbiepink.png", "./alien-lightpink.png", "./alien-purple.png"];
  let numColors = alienColors.length;

  for (let c = 0; c < alienColumns; c++) {
    for (let r = 0; r < alienRows; r++) {
      let randomColorIndex = Math.floor(Math.random() * numColors);
      let randomColorImg = alienColors[randomColorIndex];

      let alien = {
        img : new Image(), // Create a new image element
        x : alienX + c * alienWidth,
        y : alienY + r * alienHeight,
        width : alienWidth,
        height : alienHeight,
        alive : true
      };

      alien.img.onload = function() {
        console.log("Alien "+ alien.img.src +" loaded successfully");
        context.drawImage(this, alien.x, alien.y, alien.width, alien.height);
      }

      alien.img.src = randomColorImg; // Set the src of the image element
      alienArray.push(alien);
    }
  }
  alienCount = alienArray.length;
}

function shoot(e) {
  if (gameOver) {
    return; 
  }

  if (e.code == "Space") {
    //shoot
    let bullet = {
      x : ship.x + shipWidth*15/32,
      y : ship.y,
      width : tileSize/8,
      height: tileSize/2,
      used : false
    }
    bulletArray.push(bullet);
  }
}

function detectCollision(a, b) {
  return a.x < b.x + b.width && // a's top left corner doesn't reach b's right corner
    a.x + a.width > b.x && //a's top left corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}