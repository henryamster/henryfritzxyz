

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        //$target.classList.toggle('is-active');

      });
    });
  }

});
var sketch = function(p) {
  let r1 = 155;
let r2 = 125;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = .01;
g = g + .81;

let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;
var verts = [];
var lines = [];
var prev;
window.addEventListener("resize", p.setup);

prev = false;
  
    p.setup = function(){
      p.createCanvas(innerWidth , innerHeight);
    a1 = p.PI / 2;
    a2 = p.PI / 2;
    cx = innerWidth / 2;
    cy = innerHeight / 2;



    p.buffer = p.createGraphics(p.width, p.height);
    p.buffer.background(255);
    p.buffer.translate(cx, cy);
    }
   p.draw = function(){
    p.background(175);
    p.imageMode(p.CORNER);
    p.image(p.buffer, 0, 0,innerWidth, innerHeight);

    //if there is not a previous value, set previous value equal to current x,y location
    if (!prev) {
        prev = [p.mouseX, p.mouseY];
    }
    //create vertex and line
    createVert(p.mouseX, p.mouseY);
   createLine(prev[0], prev[1], p.mouseX, p.mouseY);
    //set previous equal to current location for next iteration
    prev = [p.mouseX, p.mouseY];

    //slice verts into a new array
    var t = verts.slice((verts.length - 13), verts.length);
    //iterate through t for the last 12 values, create lines between points
    var s = t.forEach(function() {

        if (verts.length > 12) {
            if (verts[0][1] == verts[10][1] && verts[0][0] == verts[10][0]) {
                return;
            }
            for (var i = 1; i < 12; i++) {
                var diff = 20 * p.sin((t[i][0] - t[i][1] * t[i + 1][0] - t[i + 1][1]));
                p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255));
                p.stroke(p.random(0, 255) * diff, p.random(0, 255), p.random(0, 255));
                p.strokeWeight(1 * diff);
                p.line(t[i][0], t[i][1], t[i + 1][0] - diff, t[i + 1][1] - diff);

            }
        }
    });
    //}
    //    if(!mouseIsPressed){
    //    verts=[];
    //    lines=[];
    //}
    //slice out old values from verts and lines arrays
    verts = verts.slice((verts.length - 50), verts.length);
    lines = lines.slice((lines.length - 50), lines.length);




    function createVert(x, y) {
        //create vertex, push vertex to verts array
        p.ellipse(x, y, 1);
        verts.push([x, y]);
    }

    function createLine(x1, y1, x2, y2) {
        //create line, push line to lines array
        p.line(x1, y1, x2, y2);
        lines.push([x1, y1, x2, y2]);
    }


    let num1 = -g * (2 * m1 + m2) * p.sin(a1);
    let num2 = -m2 * g * p.sin(a1 - 2 * a2);
    let num3 = -2 * p.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 *p.cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * p.sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * p.cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * p.cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;
    if (p.frameCount % 100 == 0) {
        a2_v += .0002;
    }
    p.translate(cx, cy);

    p.stroke(0);
    p.strokeWeight(2);

    let x1 = r1 * p.sin(a1);
    let y1 = r1 * p.cos(a1);

    let x2 = x1 + r2 * p.sin(a2);
    let y2 = y1 + r2 * p.cos(a2);
    //
    //  line(0, 0, x1, y1);
    //  fill(0);
    //  ellipse(x1, y1, m1, m1);
    //
    //  line(x1, y1, x2, y2);
    //  fill(0);
    //  ellipse(x2, y2, m2, m2);

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    // a1_v *= 0.99;
    // a2_v *= 0.99;
    p.buffer.colorMode(p.HSB);
    p.buffer.stroke(p.cos(a1) * 100 * 2, 255, 100);
    if (p.frameCount > 1) {
        p.buffer.strokeWeight(a1_v * 100);
        for (var i = -2; i < 2; i++) {
            p.buffer.line(px2 + i, py2 + i, x2 - i, y2 - i);
            p.buffer.fill(p.sin(a1) * 100, 100, 100);
            //buffer.ellipse(px2+i, py2+i, x2-i, y2-i);
        }
    }

    px2 = x2;
    py2 = y2;

    }
  };
  new p5(sketch, 'container');
//Double pendulum code taken and adapted from Daniel Shiffman
//please visit his website https://shiffman.net/
//And purchse his book, "The Nature of Code,"
//one of my personal favorites!

            //Firebase configuration
           
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBk9TVjG5eHYUbwm6e50fhQvpISSek-8Pg",
    authDomain: "henryfritz-30302.firebaseapp.com",
    databaseURL: "https://henryfritz-30302.firebaseio.com",
    projectId: "henryfritz-30302",
    storageBucket: "henryfritz-30302.appspot.com",
    messagingSenderId: "341982203008"
  };
  firebase.initializeApp(config);

          
   


var submit = document.getElementById('submit');
submit.addEventListener('click', submitMessage);

function submitMessage(){
    var alertContent = '';
  var name = document.getElementById('name').value;
 alertContent += (checkIfEmpty(name))?  '' :'Please include your name. ';
  var message = document.getElementById('message').value;
 alertContent += (checkIfEmpty(name))?  '': 'Please include a message. ';
  var email = document.getElementById('email').value;
   alertContent += (checkIfEmpty(name))?  '': 'Please include your email. ';
  var phone = document.getElementById('tel').value;
  if (!checkIfEmpty(alertContent)){
     document.getElementById('name').value ='';
 document.getElementById('message').value='';
  document.getElementById('email').value='';
  document.getElementById('tel').value='';
  document.getElementById('alert').style.color = 'black';
  document.getElementById('alert').innerHTML = "Submitted. I will be in contact soon!";
  return saveMessage(name, message, email, phone);
  
  }
  else{
      return document.getElementById('alert').innerHTML = alertContent;
  }
}

function saveMessage(name, messageText, email, phone) {
  // Adds a new message entry to the Realtime Database.
    
   return firebase.database().ref('/inquiry').push({
    name: name,
    text: messageText,
    email: email,
    phone: phone
   
  })
}
function checkIfEmpty(x){
    return (x != '')
}

