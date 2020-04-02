
'use strict';

let char, charImg;
let state = 'titlePage';
let vb1 = [];
let cnv;
let virus;
let lf = 0;
let rt;
let cSpeed = 0.5;
let rSpeed = 1.5;
let w = 1024;
let h = 740;
let points = 2;
let die;

function preload() {
  charImg = createImg('asset/images/char.gif');
  virus = loadImage('asset/images/virus.png');
}

function setup() {
  cnv = createCanvas(w, h);
  char = new Char();
  rt = width;
}

function draw() {
  switch (state) {
    case 'titlePage':
      titlePage();
      cnv.touchStarted(function(){
        state = 'game';
      });
      break;
    case 'game':
      game();
      break;
    case 'game over':
      vb1 = [];
      vb2 = [];
      points = 2;
      cnv.touchStarted(function(){
        die.stop();
        state = 'game';
      });
      gameOver();
      break;
    default:
      break;
  }
}

function titlePage(){
  background(50, 150, 255);
  // c();
  // road();
  // fill(200, 0, 0);
  textStyle(BOLD);
  textSize(120);
  text("Mindful", 190, 240);
  fill(random(50, 100), 0, 0, 30);
  textSize(40);
  text("~Enter or Click~ to Start", 270, 600);
}

function game() {
  background (255);

    if (random(1) <= 0.009) {
      vb1.push(new Vb1());
    }
    //horizontal book1
    for (let i = 0; i < vb1.length; i++) {
      vb1[i].display();
      vb1[i].move();
    }
    for (let i = vb1.length - 1; i >= 0; i--){
      if(dist(char.x, char.y, vb1[i].x, vb1[i].y) <= (char.r + vb1[i].r) / 3) {
        die.play();
        vb1.splice(i,1);
        // console.log("book1 gone");
        state = 'game over';
      } else if (vb1[i].y > h){
        vb1.splice(i,1);
      }
      char.show();
      char.move();
  }
}


function gameOver() {
  fill(200, 0, 0, 10);
  textStyle(BOLD);
  textSize(130);
  text("Quarantinee!", 100, 250);
  fill(random(50, 200));
  textSize(30)
  text(" R to Restart", 400, 350);
  text(" ESC to return Title Page", 320, 400);
  //hit the book for certain amount
}
