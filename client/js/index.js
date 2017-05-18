window.addEventListener("resize", setup);
var minute = new Date();
var minutes = minute.getMinutes();
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(160, 45, 200);

  
}

function draw() {
  translate(width * .5, height * .5);

  scale(sin(frameCount) * .30);
  rotate(frameCount % 360) * PI / 60;

  var x = random(0, windowWidth);
  var y = random(0, windowHeight);
  var t = frameCount % x;
  var movey = atan2(cos(y), min(8.79, x * 2.72)) * max(9.91 + y, -cos(x + 5.50)) * cos(x) * cos(t * y) - max(1.35, y / 3) + sin(t * x) * atan2(y, x) + .28 + t * floor(sqrt(.0042));
  var proj = random(25, 195);
  for (var i = 5; i < proj; i++) {
    fill((25 * movey / proj + i) + 180 % 255, 40, 160);
    stroke((25 * movey / proj + i) + 180 % 255, 40, 120);
    for (var p = 0; p < 17; p++) {
      shootingSquare(x + i, y + i, i, movey, p % 3);
    }

  }

}

function shootingSquare(x, y, i, movey, factor) {
  
if (minutes % 2 == 0){
  ellipse(x + i * 3 + y, y + i * 3 - x, movey + i, movey + i);
}
else {
   rect(x + i * 3 + y, y + i * 3 - x, movey + i, movey + i);
}
}

//Henry Fritz Design & Development
//HenryAmsterFritz@gmail.com
//p5 sketch for index, resize listener (if you're reading this, how can
//I also accomodate for min/max behavior? )