var GS=0;
var pc=0;
var form,runner,game;
var database;
var allPlayers;
var runners=[],runner1,runner2,runner3,runner4;
var finishedPlayers=0;
var finish;
function preload(){
    bronzeimg=loadImage("images/bronze.png");
    goldimg=loadImage("images/gold.png");
    silverimg=loadImage("images/silver.png");

   runner1img=loadAnimation("images/p1a.png","images/p1b.png","images/p1c.png");
   runner2img=loadAnimation("images/p2a.png","images/p2c.png","images/p2b.png");
   runner3img=loadAnimation("images/p3b.png","images/p3a.png","images/p3c.png");
   runner4img=loadAnimation("images/p4a.png","images/p4c.png","images/p4b.png");

   obstacleimg=loadImage("images/o1.png");
   trackimg=loadImage("images/track.jpg");
}
function setup(){
    database=firebase.database();
    createCanvas(displayWidth-100,displayHeight-220);
    
    
    game = new Game();
    game.getState();
    game.start();
    
   }

function draw(){
    background("white");
  //  drawSprites();
    
   if(pc===4&&finishedPlayers===0){
       game.updateGS(1)
   }
   if(GS===1){
       clear();
       game.play();
   }
   if(finishedPlayers===4){
       game.updateGS(2);
   }
   if(GS===2&&finishedPlayers===4){
      // game.end();
       game.displayRank();
   }

}

