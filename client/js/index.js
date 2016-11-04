function Mover(m, x, y) {
  this.loc = createVector(x, y)
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m * 3;

  this.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.limit(5);
    this.acc.mult(.008);
  }

  this.display = function() {
    //stroke(0);
    //strokeWeight(12);
    var date = new Date();
   if (date.getDay() == 5)
    {colorMode(HSB);
     
    fill(random(0,299),255,255);
    noStroke();
    }
    var p = random(0.99, 1.01)
     ellipse(this.loc.y, this.loc.x, this.mass  * 1.5, this.mass * 1.5);
    ellipse(this.loc.x, this.loc.y, this.mass  * p, this.mass * p);

  }
  this.applyForce = function(force) {
    var f = p5.Vector.lerp(force, this.mass);
    this.acc.sub(f);
    this.acc.dot(f);
  }
  this.checkEdges = function() {
    if (this.loc.x > width) {
      this.loc.x = width;
      this.vel.x *= -1;
    } else if (this.loc.x < 0) {
      this.loc.x = 0;
      this.vel.x *= -1;

    }
    if (this.loc.y > height) {
      this.loc.y = height;
      this.vel.y *= -1;

    } else if (this.loc.y < 0) {
      this.loc.x = 0;
      this.vel.x *= -1;

    }
  };
}
var movers = [];
var can;

function setup() {
  var can = createCanvas(windowWidth, windowHeight);
  background(0);
  pixelDensity(1);
  for (var i = 0; i < 2000; i++) {
    movers[i] = new Mover(random(.5, 8), random(0, width * 2), random(0, height * 2));

  }
}

function draw() {
  //background(0);
  //noStroke();
  translate(-cos(PI * frameRate % 5));
  for (var i = 0; i < movers.length; i++) {
    rotate(-sin(PI * movers[i].mass ^ 2));
    var wind = createVector(0.05 * movers[i].mass / frameCount, -.002 * sqrt(movers[i].mass));
    var gravity = createVector(-3.6, -88.1 * movers[i].mass ^ 2);

    movers[i].applyForce(wind);
    movers[i].applyForce(wind);
    movers[i].update();
    movers[i].display();

    if (frameCount < 300) {
      movers[i].checkEdges();

    }
    /*if (frameCount === 1200) {
      var booly = true
    }
    if (booly === true) {
      saveCanvas(can, 'rtxx', 'jpg');
      booly === false;
    }*/
  }

}