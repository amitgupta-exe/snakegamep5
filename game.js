let snake;
let food;
let scl = 20; // Scale for the grid

let gameOver = false;
let gameStarted = false;

let highscore = 0;

function setup() {
    const canvas = createCanvas(windowWidth / 2, windowHeight / 2);
    canvas.parent('canvas-container');
    frameRate(10); // Set the frame rate
    snake = new Snake();
    foodLocation();
}

function startGame() {
    snake = null;
    snake = new Snake();
    foodLocation();
    snake.setDir(1, 0);
    console.log("gamestarted");
    gameStarted = true;
    gameOver = false; // Reset the game over flag
    const dialogue = document.getElementById('dialogue');
    dialogue.classList.add('hidden'); // Hide the Game Over message
}

function foodLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

}

function draw() {
    document.getElementById('start-button').addEventListener('click', startGame);

    if (gameOver) {
        showGameOver();
        return;
    }
    background(0);

    if (gameStarted) {
        snake.update();
        snake.show();
        if (snake.eat(food)) {
            foodLocation();
        }
        fill(150, 50, 175);
        rect(food.x, food.y, scl, scl);
    }


    if (snake.endGame()) {
        showGameOver();
        gameStarted = false;
        gameOver = true;
        if (snake.body.length > highscore) {
            highscore = snake.body.length - 1;
        }
        // Stop the draw loop
    }
}

function showGameOver() {

    const dialogue = document.getElementById('dialogue');
    const dialogueText = document.getElementById('dialogue-text');
    dialogue.classList.remove('hidden'); // Remove the hidden class to show the Game Over message
    const text = `Game Over<br>
    Your Score : ${snake.body.length - 1}
    <br> Highest Score : ${highscore}`;

    dialogueText.innerHTML = text;

    const button = document.getElementById('start-button');
    button.textContent = 'Replay';


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.xdir = 0;
        this.ydir = 0;
        this.xspeed = 1;
        this.yspeed = 1;
        this.len = 0;
    }

    setDir(x, y) {
        // Prevent snake from reversing direction
        if (this.xdir !== -x || this.ydir !== -y) {
            this.xdir = x * this.xspeed;
            this.ydir = y * this.yspeed;
        }
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        head.x += this.xdir * scl;
        head.y += this.ydir * scl;
        this.body.push(head); // Add the new head
        if (this.body.length > this.len + 1) {
            this.body.shift(); // Remove the tail
        }
    }

    grow() {
        this.len++;
    }

    endGame() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x > width - scl || x < 0 || y > height - scl || y < 0) {
            return true; // Game over
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i];
            if (part.x === x && part.y === y) {
                return true; // Game over
            }
        }
        return false;
    }

    eat(pos) {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x === pos.x && y === pos.y) {
            this.grow();
            return true;
        }
        return false;
    }

    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(35, 135, 135);
            noStroke();
            rect(this.body[i].x, this.body[i].y, scl, scl);
        }
    }
}

function keyPressed() {
    if (gameStarted) {

        if (keyCode === LEFT_ARROW) {
            snake.setDir(-1, 0);
        } else if (keyCode === RIGHT_ARROW) {
            snake.setDir(1, 0);
        } else if (keyCode === DOWN_ARROW) {
            snake.setDir(0, 1);
        } else if (keyCode === UP_ARROW) {
            snake.setDir(0, -1);
        }
    }

}