/*global abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate, rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */

//Many pieces of code are commented out so i have the option to use them if i want

// create global variables up here
var foobar = 500;
var bubbles = [];
var marks = [];
var player;
var scene = 0;
var start, winSound, loseSound;
var speed;
var bubbleAmount = 20;
var winScore = 3;

function preload() {
winSound = new Audio("https://cdn.glitch.com/d436ea2f-9d48-4131-9dcb-4d9fe8f710a0%2FTa%20Da-SoundBible.com-1884170640.mp3?v=1569332160611"); 
loseSound = new Audio("https://cdn.glitch.com/d436ea2f-9d48-4131-9dcb-4d9fe8f710a0%2FSad_Trombone-Joe_Lamb-665429450.mp3?v=1569331951966");
}

function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
  speed = width/400;
}


function draw(){ // this is a built-in forever loop
 
  
  
  if (scene == 0) {
for(var i =0; i < bubbleAmount; i++) {   
  var x = random(width / 2, width - width / 20)
  var y = random( height / 20, height / 10);
  var r = random(width/130, width/27);
  var downSpeed = random(0, speed);  
  bubbles[i] = new Bubble( x, y, r, downSpeed);
  print(bubbles[i].x, bubbles[i].y);
  }
    
  player = new Hero(width/20, height/2, width/19.5, height/2.05, width/15, height/ 2 );   
  background("yellow");
  textSize(width/20);
  text("Press Enter To Play", width/4, height/2)
  fill(0, 0, 0); 
  if(keyIsDown(ENTER)) {
    scene = 1;
  }
}
  
  
if (scene == 1) { 
    if (player.x3 >= width) {
      player.x1 = width/20;
      player.x2 = width/19.5;
      player.x3 = width/15;
      player.point++;
      speed = speed * 1.5
      bubbles.length = 0;
          for (var i = 0; i < 20; i++) {
              var x = random(width / 2, width - width / 20)
              var y = random( height / 20, height / 10);
              var r = random(width/130, width/27);
              var downSpeed = random(0, speed);  
              bubbles[i] = new Bubble( x, y, r, downSpeed);
              print(bubbles[i].x, bubbles[i].y);
          }
  } 
  for(var i =0; i < bubbles.length; i++) {
   for(var j =0; j < bubbles.length; j++) {
     var d = dist(bubbles[i].x, bubbles[i].y, bubbles[j].x, bubbles[j].y);
     if(d < bubbles[i].r + bubbles[j].r && i != j) {
       var coin =  random(2);
       if(coin > 1) {
           bubbles[i].x += (bubbles[i].x - bubbles[j].x) / 50;
       } else {
         bubbles[i].y += (bubbles[i].y - bubbles[j].y) / 50;
       }
     }
   }
 }
  
  if(player.point <  winScore) {
  background(0);
  for(var i = 0; i < bubbles.length; i++){
    var d2 = dist(player.centerX, player.centerY, bubbles[i].x, bubbles[i].y)
    if(d2 < player.centerR + bubbles[i].r) {
      scene = 2;
      loseSound.play()
    } 
    bubbles[i].move();
    bubbles[i].show();
     
  }    
 player.show();
 } else  if( player.point ==  winScore){
  winSound.play(); 
      scene = 3;           
 }
}
  
  
  if (scene ==2) {
      background("red");
      textSize(width/20);
      fill(0, 0, 0);
      text("YOU LOSE!", width/2, height/2);
      textSize(width/50);
      text("Press Backspace To Play Again", width/2, height/ 2 + width/10);
      if(keyIsDown(BACKSPACE)) {
      scene = 0;
  }
  }
  if (scene == 3) {
   background("green");
      textSize(width/20);
      fill(0, 0, 0);
      text("YOU WIN!", width/2, height/2);
      textSize(width/50);
      text("Press Backspace To Play Again", width/2, height/ 2 + width/10);    
      if(keyIsDown(BACKSPACE)) {
      scene = 0;
  }  
  }
}




class Bubble {
  constructor(x, y, r, downSpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.downSpeed = downSpeed
    this.xSpeed;
 }
  move() {
    if(keyIsDown(RIGHT_ARROW)) {
      this.xSpeed = random(-1, -2)
    } else {
      this.xSpeed = (-0.5, -1)
    }
    this.x += this.xSpeed;
    this.y += this.downSpeed;  
}
  
  show() {
    stroke(225);
    strokeWeight(4);
    noFill();
    if(this.x >= width || this.x <= 0 || this.y >= height || this.y<= 0) {
      this.x = random(width / 20, width - width / 20);
      this.y = random( height / 20, height / 10);
       }
    ellipse(this.x, this.y, this.r, this.r);
  }
}


class Hero {
 constructor(x1, y1, x2, y2, x3, y3) {
   this.x1 = x1;
   this.y1 = y1;
   this.x2 = x2;
   this.y2 = y2;
   this.x3 = x3;
   this.y3 = y3;
   this.point = 0;
   this.centerX = (x1 -x3)/2 + x1 + width/75;
   this.centerY = (y1- y2)/2 + y2;
   this.centerR = width/275;
 }  
 show() {
   if(keyIsDown(UP_ARROW)) {
     if (this.y2 <= 0) {
       this.y1 = this.y1;
       this.y2 = this.y2;
       this.y3 = this.y3;
     }
     this.y1 -= height/325;
     this.y2 -= height/325;
     this.y3 -= height/325; 
   }
   if(keyIsDown(RIGHT_ARROW)) {
     this.x1 += width/650;
     this.x2 += width/650;
     this.x3 += width/650;
   }
   if(keyIsDown(LEFT_ARROW)) {
     if (this.x1 <= 0) {
       this.x1 = this.x1;
       this.x2 = this.x2;
       this.x3 = this.x3;
     } else{
     this.x1 -= width/650;
     this.x2 -= width/650;
     this.x3 -= width/650;
     }
     }
   if(keyIsDown(DOWN_ARROW)) {
     if (this.y1 >= height) {
       this.y1 = this.y1;
       this.y2 = this.y2;
       this.y3 = this.y3;
     } else {
     this.y1 += height/325;
     this.y2 += height/325;
     this.y3 += height/325; 
     }
   }
   fill("white");
   triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
   fill("red");
   this.centerX = (this.x1 -this.x3)/2 + this.x1 + width/75;
   this.centerY = (this.y1- this.y2)/2 + this.y2;
   ellipse(this.centerX, this.centerY, this.centerR, this.centerR);
   noFill();
 } 
}  







