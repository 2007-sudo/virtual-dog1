//Create variables here
var dog,foodS,foodStock, database, happyDog1, happyDog2;
function preload()
{
	//load images here
  happyDog1=loadImage("images/dogImg.png");
  happyDog2=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);

  dog=createSprite(300,300,150,150);
  dog.addImage(happyDog1)
  dog.scale= 0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

}


function draw() {  

background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog2);
}
  drawSprites();
  //add styles here
  textSize(20);
  text("food remaining"+ foodS,200,200);

  text("press up arrow key to feed the dog",130,10,300,20);

  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0) {
    x=0;
  } else {
    x=x-1
  }
  database.ref("/").update({
    food:x
  })
}



