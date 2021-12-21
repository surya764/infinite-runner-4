var path,boy,money,treasure,gold,obstacle;
var pathImg,boyImg,moneyImg,treasureImg,goldImg,obstacleImg;
var treasureCollection = 0;
var moneyG,treasureG,goldG,obstacleGroup;
var restart, restartImg, gameOver, gameOverImg;
var cycleBell;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("boy1.png","boy2.png");
  moneyImg = loadImage("money.png");
  treasureImg = loadImage("treasure.png");
  goldImg = loadImage("gold.png");
  obstacleImg = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
  cycleBell = loadSound("bell.mp3");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);

path=createSprite(width,height-500);
path.addImage(pathImg);
path.velocityX = -15;

boy = createSprite(120,height-20,20,20);
boy.addAnimation("boyRunning",boyImg);
boy.scale = 0.20;
boy.setCollider("rectangle",0,0,40,40);
  
gameOver = createSprite(width/2,height/2-15);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.9;
gameOver.visible = false;

restart = createSprite(width/2,height/2+50);
restart.addImage(restartImg);
restart.scale = 0.8;
restart.visible = false;
  
moneyG = new Group();
treasureG = new Group();
goldG = new Group();
obstacleGroup = new Group();


}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);

  if(path.x < 0 ){
    path.x = width/2;
   }

   if(keyDown("space")) {
    cycleBell.play();
  }
  
    createmoney();
    createtreasure();
    creategold();
    createobstacle();

    if (moneyG.isTouching(boy)) {
      moneyG.destroyEach();
      treasureCollection=treasureCollection + 150;
    }
    
    if (treasureG.isTouching(boy)) {
      treasureG.destroyEach();
      treasureCollection=treasureCollection + 200;
      
    }
    
    if(goldG.isTouching(boy)) {
      goldG.destroyEach();
      treasureCollection= treasureCollection + 350;
      
    }

    if(obstacleGroup.isTouching(boy)){
      gameState = END;
    }
  }

else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    path.velocityX = 0;
    boy.velocityY = 0;
    boy.visible = false

    moneyG.setVelocityXEach(0);
    treasureG.setVelocityXEach(0);
    goldG.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    moneyG.destroyEach();
    treasureG.destroyEach();
    goldG.destroyEach();
    obstacleGroup.destroyEach();

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width/2-30,30);
}

function createmoney() {
  if (World.frameCount % 290 == 0) {
  var money = createSprite(1600,Math.round(random(450, 250)));
  money.addImage(moneyImg);
  money.scale = 0.3;
  money.velocityX = -8;
  money.lifetime = 990;
  moneyG.add(money);
  }
}

function createtreasure() {
  if (World.frameCount % 320 == 0) {
  var treasure = createSprite(1300,Math.round(random(260,350)));
  treasure.addImage(treasureImg);
  treasure.scale = 0.3;
  treasure.velocityX = -8;
  treasure.lifetime = 990;
  treasureG.add(treasure);
  }
}

function creategold() {
  if (World.frameCount % 410 == 0) {
  var gold = createSprite(1100,Math.round(random(100, 300)));
  gold.addImage(goldImg);
  gold.scale = 0.17;
  gold.velocityX = -8;
  gold.lifetime = 990;
  goldG.add(gold);
  }
}

function createobstacle(){
  if (World.frameCount % 530 == 0) {
  var obstacle = createSprite(1700,Math.round(random(250, 500)));
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.2;
  obstacle.velocityX = -8;
  obstacle.lifetime = 990;
  obstacleGroup.add(obstacle);
  }

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  boy.visible = true
      
  obstacleGroup.destroyEach();
  goldG.destroyEach();
  treasureG.destroyEach();
  moneyG.destroyEach();

  path.velocityX = -15;

  treasureCollection = 0;
}
