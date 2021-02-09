class Game{
    
     constructor(){

     }
    getState(){
        var GSref=database.ref('gameState');
        GSref.on("value",function(data){
            GS=data.val();
        })

    }
    updateGS(state){
        database.ref('/').update({
          'gameState':state  
        })
    }
   async start(){
        if(GS===0){
            runner=new Player();
            var pcref=await database.ref('playerCount').once("value");
            if(pcref.exists()){
                pc=pcref.val();
                runner.getCount();
            }
            form=new Form();
            form.display();
        }
    runner1=createSprite(50,50);
    runner1.addAnimation("run",runner1img);

    runner2=createSprite(50,150);
    runner2.addAnimation("running",runner2img);

    runner3=createSprite(50,300);
    runner3.addAnimation("runner",runner3img);
    runner3.scale=0.5;

    runner4=createSprite(50,500);
    runner4.addAnimation("runs",runner4img);
    runner4.scale=0.26;
    runners=[runner1,runner2,runner3,runner4]
        
        finish=false;
    }
    play(){
        form.formHide();
                Player.getPlayerinfo();
                runner.getPlayersAtEnd();
        if(allPlayers!==undefined){
            background(46)
            image(trackimg,-displayWidth,0,displayWidth*5,displayHeight)
            var index=0;
            var x=-displayWidth+200;
            var y=100;
            for( var plr in allPlayers){
                index=index+1
                 y=y+150;
                 x=0;
                x = allPlayers[plr].distance-displayWidth+300;
                
                 runners[index-1].x=x
                 runners[index-1].y=y
                 fill("white");  
              if(index===runner.index){
                  strokeWeight(10);
                  fill("green");
                 // ellipse(x,y,60,60);
                  runners[index-1].shapeColor="red";
                  camera.position.x=runners[index-1].x;
                  camera.position.y=displayHeight/2;
              }
              textAlign(CENTER);
              textSize(20);
              text(allPlayers[plr].name, runners[index - 1].x, runners[index - 1].y + 75);
   
            }
        }
      if(keyIsDown(RIGHT_ARROW)&&player.index!==null&&finish!==true){
          runner.distance+=50;
          runner.update();
      }  
      if(runner.distance>7300&&finish===false){
          runner.rank+=1
          finishedPlayers=player.rank
         // GS=2;
          Player.updatePlayersAtEnd(player.rank)
          console.log("Rank:"+player.rank)
          finish=true;
      }
    drawSprites();
    }
    displayRank(){
        camera.position.x=0;
        camera.position.y=0;
        imageMode(CENTER);
        Player.getPlayerinfo();
        image(bronzeimg,displayWidth/-4,-100+displayHeight/9,200,240)
        image(silverimg,displayWidth/4,-100+displayHeight/10,225,270)
        image(goldimg,0,-100,250,300)
        textAlign(CENTER)
        textSize(50)
        for(var plr in allPlayers){
            if(allPlayers[plr].rank===1){
                text("1st :"+allPlayers[plr].name,-25,85);
            }
            else
            if(allPlayers[plr].rank===2){
                text("2nd :"+allPlayers[plr].name,displayWidth/4,displayHeight/9+73);
            }
            else if(allPlayers[plr].rank===3){
                text("3rd :"+allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);
            }
            else{
                textSize(30);
                text("Honourable Mention: "+allPlayers[plr].name,0,225)
            } 
        }

    }
    
}