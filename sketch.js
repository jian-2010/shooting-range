var astronautImage,astronaut
var spaceshipImage,spaceship
var alienImage,alien
var universeImage,universe
var knifeImg
var bulletImg,pistolImg,rifleImg
var rifle,knife,bullet,pistol
var alienGroup
var score=0
var gunshot,riflesound;
var life,lifeIMG;
var gameover,gameoverIMG
var die


function preload(){
astronautImage=loadImage("images/astronaut.png")
spaceshipImage=loadImage("images/spaceshipcrashing.png")
alienImage=loadImage("images/alien.png")
universeImage=loadImage("images/moon bg.jpg")
knifeImg=loadImage("images/knife.png")
pistolImg=loadImage("images/pistol.png")
bulletImg=loadImage("images/bullet.png")
rifleImg=loadImage("images/rifle.png")
gunshot=loadSound("images/gunshot.mp3")
riflesound=loadSound("images/rifle sound.mp3")
lifeIMG=loadImage("images/life.png")
gameoverIMG=loadImage("images/go image.jpg")
die=loadSound("images/die.mp3")



}
function setup() {
  createCanvas(1050,650);

  universe=createSprite(620,325)
  universe.addImage("universe",universeImage)
  universe.scale=4

  astronaut=createSprite(350,500)
  astronaut.addImage("astronaut",astronautImage)
  astronaut.setCollider("rectangle",0,0,80,200)
  //astronaut.debug=true

  spaceship=createSprite(150,450)
  spaceship.addImage("spaceship",spaceshipImage)
  spaceship.scale=3.5

 
 knife=createSprite(420,550)
 knife.addImage("knife",knifeImg)
 knife.scale=0.3
 knife.setCollider("rectangle",0,0,200,80)
 //knife.debug=true

 alienGroup= new Group()

pistol=createSprite(450,550)
pistol.addImage("pistol",pistolImg)
pistol.scale=0.7
pistol.visible=false

bullet=createSprite(450,550)
bullet.addImage("bullet",bulletImg)
bullet.scale=0.3 
bullet.visible=false

life1=createSprite(900,30)
life1.addImage("life",lifeIMG)
life1.scale=0.2


gameover=createSprite(525,325)
gameover.addImage("gameover",gameoverIMG)
gameover.scale=4
gameover.visible=false



 
}

function draw() {
  background(0,0,0);  

 

  if(keyDown(UP_ARROW)){
    astronaut.y=astronaut.y-5
    knife.y=knife.y-5
  }

  
  if(keyDown(DOWN_ARROW)){
    astronaut.y=astronaut.y+5
    knife.y=knife.y+5
  }

  if(keyDown("space")){
    knife.velocityX=5
  
  }

  

  if(knife.isTouching(alienGroup)){
    alienGroup.destroyEach()
    knife.position.x=astronaut.position.x
    knife.velocityX=0
    score+=1
  }
  if(score>10){
    knife.destroy()
    bullet.visible=true
    pistol.visible=true
    pistol.position.y=astronaut.position.y
    bullet.position.y=pistol.position.y
  }

  if(keyDown("s")){
    bullet.velocityX=5
    if(bullet.isTouching(alienGroup)){
      bullet.position.x=pistol.position.x
      bullet.velocityX=0
      gunshot.play()
    }
  }

  if(bullet.isTouching(alienGroup)){
    alienGroup.destroyEach()
    score+=1
  }

  if(alienGroup.isTouching(astronaut)){
    life1.visible=false
    alienGroup.destroyEach()
    life1.velocityY=-1

    gameover.visible=true
    die.play()
  }

  
  

  spawnalien()
  

  drawSprites()

  fill("white")
  textSize(40)
  text("SCORE : "+score,100,100)
}

function spawnalien(){

  if(frameCount%170==0){
    alien=createSprite(950,500)
    alien.addImage("alien",alienImage)
    alien.y=Math.round(random(100,500))
    alien.velocityX=-3
    alien.setCollider("rectangle",0,0,100,220)
    //alien.debug=true

    alienGroup.add(alien)

  }

  if(score>10){
    alien.velocityX=-7
  }

  

}