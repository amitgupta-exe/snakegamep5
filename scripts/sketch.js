var s;
var scl = 20;
var food;

function setup(){
    createCanvas(600, 600);
    s = new Snake();
    pickLocation();
    frameRate(10);
}

function pickLocation(){
    food = createVector(floor(random(width/scl)), floor(random(height/scl)));
    food.mult(scl);
}

function draw(){
    background(51);
    s.update();
    s.show();
    if(s.eat(food)){
        pickLocation();
    }
    fill(222, 100, 100);
    rect(food.x, food.y, scl, scl);   
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0,-1);
    } else if(keyCode === DOWN_ARROW){
        s.dir(0,1);
    }else if(keyCode === LEFT_ARROW){
        s.dir(-1,0);
    }else if(keyCode === RIGHT_ARROW){
        s.dir(1,0);
    }
}