const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var chao;
var corda;
var fruta;
var link; 
var fundo;
var frutaimg;
var flofi;
var flofiimg;
var botao; 
var idle;
var comer; 
var triste;

var soundsar ;
var soundscomer;
var soundscortar;
var soundstrite;
var soundsfundo;
var balao; 
var muter;
var corda2;
var link2;
var botao2;
var chao2;
function preload (){
  fundo=loadImage ("images/background.png")
  frutaimg=loadImage ("images/melon.png")
  flofiimg=loadImage ("images/rabbit1.png")
  idle=loadAnimation ("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png")
  comer=loadAnimation ('images/eat.png','images/eat_2.png','images/eat_3.png','images/eat_4.png')
  triste=loadAnimation ("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  comer.looping=false 
  triste.looping=false 
  soundsar=loadSound ("sounds/air.wav")
  soundscomer=loadSound ("sounds/eating_sound.mp3")
  soundscortar=loadSound ("sounds/rope_cut.mp3")
  soundstrite=loadSound ("sounds/sad.wav")
  soundsfundo=loadSound ("sounds/sound1.mp3")



}
function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)


  chao = Bodies.rectangle(250,690,500,20,{isStatic: true});
  World.add(world,chao);

  chao2=Bodies.rectangle(250,400,100,10,{isStatic:true });
  World.add(world,chao2);

  corda=new Rope (6,{
    x:250,
    y:30
  })
  fruta=Bodies.circle(250,300,20)
  Composite.add (corda.body,fruta)
  link=new Link (corda,fruta )
  
  idle.frameDelay=15
  comer.frameDelay=15
  triste.frameDelay=15
  
  flofi=createSprite (450,600)
  flofi.addAnimation("bunny",idle)
  flofi.addAnimation("comer",comer)
  flofi.addAnimation("triste",triste)
  flofi.scale = 0.3

  botao=createImg ("images/cut_btn.png")
  botao.size (50,50)
  botao.position(230,30)
  botao.mouseClicked(drope)
  
  balao=createImg ("images/balloon.png")
  balao.size (150,100)
  balao.position (20,300)
  balao.mouseClicked(ventar)

  soundsfundo.play ()
  soundsfundo.setVolume(0.3)

  muter=createImg("images/mute.png")
  muter .size (50,50)
  muter.position (450,30)
  muter.mouseClicked(mutar)
  corda2=new Rope (6,{
    x:450,
    y:300
  })
  link2=new Link (corda2,fruta)

  
  botao2=createImg ("images/cut_btn.png")
  botao2.size (50,50)
  botao2.position(450,300)
  botao2.mouseClicked(drope2
    )
  }

function draw(){
  background(50);
  Engine.update(engine);

  
  image(fundo,250,350,500,700)
  corda.show()
if (fruta!=null){
  image(frutaimg,fruta.position.x,fruta.position.y,60,60)
}

if (fruta !=null && fruta.position.y>650){
  flofi.changeAnimation ("triste")
  fruta=null 
  soundstrite.play ()
}

    if (colised(fruta,flofi)==true){
      flofi.changeAnimation ("comer")
      soundscomer.play ()
    }
    corda2.show()
    rect(chao2.position.x,chao2.position.y,100,10);

drawSprites()


}

function drope (){
  corda.break()
  link.break()
  link=null 
  soundscortar.play()
}

function colised(body,sprite){
if (fruta!=null){
  var distancia = dist (body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distancia<=80){
    World.remove (world,fruta)
    fruta=null 
    return true 
  }
  else{
    return false 
  }
}
}
function ventar (){
  Matter.Body.applyForce(fruta,{
    x:0,y:0
  },{
    x:0.05,y:0
  })  
  soundsar.play()
}

function mutar (){
  if (soundsfundo.isPlaying()){
    soundsfundo.stop ()
  }
  else {
    soundsfundo.play ()
  }
}
function drope2 (){
  corda2.break()
  link2.break()
  link2=null 
  soundscortar.play()
}
  