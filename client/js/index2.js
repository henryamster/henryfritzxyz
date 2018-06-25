var verts = [];
var lines = [];
var prev;
window.addEventListener("resize", setup);
function setup() {

    createCanvas(windowWidth, windowHeight);
    background(255);
    color(255, 0, 0);
    stroke(255);
    //prev is initiated as a bool to prevent a null pointer 
    prev = false;
}

function draw() {
     background(255);
    // removed mousepress behavior
    // if (mouseIsPressed) {
    
    //if there is not a previous value, set previous value equal to current x,y location
    if (!prev) {
        prev = [mouseX, mouseY];
    }
    //create vertex and line
    createVert(mouseX, mouseY);
    createLine(prev[0], prev[1], mouseX, mouseY);
    //set previous equal to current location for next iteration
    prev = [mouseX, mouseY];

    //slice verts into a new array
    var t = verts.slice((verts.length - 13), verts.length);
    //iterate through t for the last 12 values, create lines between points
    var s = t.forEach(function () {
        if (verts.length > 12) {
            for (var i = 1; i < 12; i++) {
                var diff = 20 * sin((t[i][0] - t[i][0] * t[i + 1][0] - t[i + 1][1]));
                color(random(0, 255), random(0, 255), random(0, 255));
                stroke(random(0, 255) * diff, random(0, 255), random(0, 255));
                strokeWeight(1 * diff);
                line(t[i][0], t[i][1], t[i + 1][0] - diff, t[i + 1][1] - diff);

            }
        }
    });
    //}
    //    if(!mouseIsPressed){
    //    verts=[];
    //    lines=[];
    //}
}


function createVert(x, y) {
    //create vertex, push vertex to verts array
    ellipse(x, y, 1);
    verts.push([x, y]);
}

function createLine(x1, y1, x2, y2) {
    //create line, push line to lines array
    line(x1, y1, x2, y2);
    lines.push([x1, y1, x2, y2]);
}