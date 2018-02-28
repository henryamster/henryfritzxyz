function setup() {
    frameRate(9);
  createCanvas(windowWidth, windowHeight);
  background(221,211,221);
}
function draw() {
  if (frameCount % 16 == 0){
   // background(0,122,122);
  }
 
  var walker = new Walker();
  var walker2 = new Walker();
  for (var i = 0; i < 8; i++) {
    colorMode(HSB);
    strokeWeight(random(0.25, 25));
    stroke(frameCount % 200, 12, 15);

    fill(frameCount % 200, 12, 15);
    walker.move();
    //translate(-windowWidth/6,-windowHeight/6);
    walker2.move();
    //scale(-cos(PI/.4)*PI^2)
    rect(walker.locx, walker2.locy, random(2, 20));
    
  }
}

function Walker() {
  //temp nx, ny value holders
  var nxloc;
  var nyloc;
  //rotate(sin(frameCount*.01));

  //original values
  this.xloc = windowWidth / 2;
  this.yloc = windowHeight / 2;
  //generate walker direction
  this.move = function() {
    //choose integer 1-8 for direction: 1- 0 degrees, 2- 45 degrees, 3- 90 degrees etc.
    var dir = floor(random(1, 46));
    var t = random(4000);
    //generate temp nx, ny values based on dir
    switch (dir) {
      case 1:
        nxloc = this.xloc + t;
        break;
      case 2:
        nxloc = this.xloc + t;
        nyloc = this.yloc + t;
        break;
      case 3:
        nyloc = this.yloc + t;
        break;
      case 4:
        nyloc = this.yloc + t;
        nxloc = this.xloc - t;
        break;
      case 5:
        nxloc = this.xloc - t;
        break;
      case 6:
        nxloc = this.xloc - t;
        nyloc = this.yloc - t;
        break;
      case 7:
        nyloc = this.yloc - t;
        break;
      case 8:
        nxloc = this.xloc + t;
        nyloc = this.yloc - t;
    }
    //draw line
    line(this.locx, this.locy, nxloc, nyloc);
    //nofill();
    var rSize = random(.25,25);
    ellipse(nxloc,nyloc, nyloc);
    colorMode(RGB);
    fill(221,211,221);
    ellipse(nxloc-5,nyloc-5, rSize-(.8*rSize));
    //scaled 2x line
    //line(this.locx * 2, this.locy * 2, nxloc * 2, nyloc * 2);
    //ensure walker does not go off of canvas
    if (
      this.xloc < 0 ||
      this.nxloc < 0 ||
      this.xloc > windowWidth ||
      this.nxloc > windowWidth ||
      this.yloc < windowHeight / 3 ||
      this.nyloc < windowHeight / 3 ||
      this.yloc > windowHeight ||
      this.nyloc > windowHeight
    ) {
      this.xloc = windowWidth / 2;
      this.yloc = windowHeight / 2;
      this.nxloc = windowWidth / 2;
      this.nyloc = windowHeight / 2;
    }
    //re-enter walker with new x,y values
    this.locx = nxloc;
    this.locy = nyloc;
  };
}