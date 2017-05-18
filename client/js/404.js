

var x1, x2, y1, y2, prevSize;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  x1=windowWidth/2;
  y1=windowWidth/2;
  colorMode(HSB);
  //frameRate(4);
}

function draw() {
  //background(255);
  for (var i=0;i<3;i++){
    /*fill(cos(frameCount%255)*255,25,180);
    stroke(cos(frameCount%255)*255,25,180);
    */
    drawEl();
  }
  var v = (.1*frameCount+windowWidth)%255;
  stroke(v,15,180);
  fill(v,15,180);
  rect((frameCount%windowWidth),0, 1,windowHeight);
 
  
}

function drawEl(){
  if (x1<windowWidth && x1>0 && y1 <windowHeight && y1 >0){
    var size = random(1,25);
   for (var b =0;b<3;b++) {
      fill(cos(frameCount+b%255)*255,25,size*4+50%255);
    stroke(cos(frameCount
               +b%255)*255,25,size*4+50%255);
     ellipse(x1+b,y1+b, size-b);
   }
    fill(cos(frameCount%255)*255,25,size*4+50);
    stroke(cos(frameCount%255)*255,25,size*4+50);
  x2= x1+ sin(x1^2*PI)*25+random(-20,20);
   y2= y1+ cos(y1^2*PI)*25+random(-20,20);
   line(x1,y1,x2,y2);
   if (prevSize > size){
   line(x1+(size/3),y1+(size/3),x2+(size/3),y2+(size/3));
   line(x1-(size/3),y1-(size/3),x2-(size/3),y2-(size/3));
   }
   x1=x2;
   y1=y2;
   prevSize = size;
  }
  else{
    x1=windowWidth/2;
    y1=windowWidth/2;
  }
  
   
}

//Henry Fritz Design & Development
//HenryAmsterFritz@gmail.com
//404 sketch