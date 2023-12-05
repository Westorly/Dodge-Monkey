//variabler til border
let borderX = innerWidth / 6
let borderY = innerHeight / 4
let borderW = 1050
let borderH = 450

//variabler til player
let sPlayer;
let player;

//Score
let timer = 0
let stopAndResetTimerID = undefined

//varibaler til enemy
let sEnemy;
let enemies
let enemySpeed = 2


//Player Objekt 
class Player {
  constructor(playerX, playerY, speed, img) {
    this.playerX = playerX;
    this.playerY = playerY;
    this.speed = speed;
    this.img = img;
    
  }

  move() {
    if (keyIsDown(65) && this.playerX > borderX ) { //A
      this.playerX -= this.speed;

    }

    if (keyIsDown(68) && this.playerX < borderX + borderW - this.img.width) { //D
      this.playerX += this.speed;
    }

    if (keyIsDown(87) && this.playerY > borderY) { //W
      this.playerY -= this.speed;
    }

    if (keyIsDown(83) && this.playerY < borderY + borderH - this.img.height) { //S
      this.playerY += this.speed;
    }

    
      
  }   

  checkCollision(enemy) {
    let playerL = this.playerX;
    let playerR = this.playerX + this.img.width;
    let playerT = this.playerY;
    let playerB = this.playerY + this.img.height

    let enemyL = enemy.enemyX;
    let enemyR = enemy.enemyX + enemy.img.width;
    let enemyT = enemy.enemyY;
    let enemyB = enemy.enemyY + enemy.img.height;

    if (
      playerR > enemyL + 7 &&
      playerL < enemyR - 7 &&
      playerB > enemyT + 7 &&
      playerT < enemyB - 7
    ) {
      gameOver();
    }

  }
  


  display() {
    image(this.img, this.playerX, this.playerY);
  }
}



//Enemy Objekt
class Enemy {
  constructor(enemyX, enemyY, speed, img) {
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.speed = speed;
    this.img = img;
    this.direction = createVector(1.5 * this.speed, 1* this.speed)
        
  }

  move(){
    this.enemyX += this.direction.x * this.speed;
    this.enemyY += this.direction.y * this.speed;

    if (this.enemyX < borderX || this.enemyX > borderX + borderW - this.img.width){
      this.direction.x *= -1
                
    }

    if (this.enemyY < borderY || this.enemyY > borderY + borderH - this.img.height){
      this.direction.y *= -1
    }
    
  }


  checkCollision(player) {
    let enemyL = this.enemyX;
    let enemyR = this.enemyX + this.img.width;
    let enemyT = this.enemyY;
    let enemyB = this.enemyY + this.img.height

    let playerL = player.playerX;
    let playerR = player.playerX + player.img.width;
    let playerT = player.playerY;
    let playerB = player.playerY + player.img.height;

    if (
      enemyR > playerL + 7 &&
      enemyL < playerR - 7 &&
      enemyB > playerT + 7 &&
      enemyT < playerB - 7
    ) {
      gameOver();
    }

  }

  display(){
    image(this.img, this.enemyX, this.enemyY)
  }

}



//funktion til at få billeder ind på programmet
function preload() {
  sPlayer = loadImage("sPlayer.png");
  sEnemy = loadImage("sEnemy.png");

}

function setupEntities(){
  player = new Player(innerWidth / 2, innerHeight / 2, 4, sPlayer);

  enemies = [
  new Enemy(borderX + 200, borderY + 100, enemySpeed, sEnemy),
  new Enemy(borderX + 800, borderY + 300, enemySpeed, sEnemy),
  new Enemy(borderX + 200, borderY + 300, enemySpeed + 0.5, sEnemy),
  new Enemy(borderX + 800, borderY + 100, enemySpeed + 0.5, sEnemy)
  ]
  if(stopAndResetTimerID){
    clearInterval(stopAndResetTimerID)
    timer = 0
  }
    stopAndResetTimerID=setInterval(()=>{timer++}, 1)

}

function setup() {
  createCanvas(innerWidth, innerHeight);
  setupEntities() 
}




function draw() {
  background(255);
  
  fill("#68AF49");
  rect(borderX, borderY, borderW, borderH);
  
  player.move();
  player.display();

  for (let i = 0; i < enemies.length; i++){
    enemies[i].move();
    enemies[i].display();

    player.checkCollision(enemies[i])

    for (let j = 0; j < enemies.length; j++){
      if (i !== j) {
        enemies[i].checkCollision(enemies[j]);
      }
    }

  }

  drawScore();
 

}


function drawScore(){
  push();
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("SCORE: " + timer, width/2, height/5);
  pop();
}

function gameOver(){
  
  push();
  fill("Red");
  textAlign(CENTER, CENTER);
  textSize(124);
  text("GAME OVER", width/2, height/2);
  textSize(28);
  text("PRESS 'R' TO RESTART", width/2, height/2 + 200);
  
  pop();

  noLoop();
  console.log("Game Over");
}


function keyPressed(){
  if(keyCode === 82){
    // restart game
    setupEntities()
    loop()
    
  }
}
