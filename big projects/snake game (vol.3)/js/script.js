
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let rectSize = 20;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
let changer = true;
let color = "#00ff00";
let blockColor1 = "green";
let blockColor2 = "blue";
let blockColor3 = "yellow";
let segmentsColor = "Red";
let fontColor = "#edff18"
let intervalTimer;

let background = new Image();
background.src = "img/grass.jpg";


background.onload = function(){
    context.drawImage(background,0,0); 
	
	
}	
//context.fillStyle = "#eee";
//context.fillRect(0, 0, 400, 400);




function changeDefault() {
    return background.src = "img/grass.jpg";
};

function changeFootball() {
	return background.src = "img/football.jpg";
};

function changeWater() {
	return background.src = "img/water.jpg";
};

function changeMetal() {
	return background.src = "img/metal.jpg";	
};

let drawBorder = function () {
	context.fillStyle = "#595959";
	context.fillRect(0, 0, width, blockSize);
	context.fillRect(0, height - blockSize, width, blockSize);
	context.fillRect(0, 0, blockSize, height);
	context.fillRect(width - blockSize, 0, blockSize, height);
};



//  ==========  drawing score


let drawScore = function () {
	context.font = "16px Sans-serif";
	context.fillStyle = fontColor;
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Score: " + score, 15, 20);
};

//drawScore();

let gameOver = function () {
	clearInterval(intervalId);
	context.font = "60px Courier";
	context.fillStyle = "Black";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText("Game Over", width / 2, height / 2);
};

let circle = function (x, y, radius, fillCircle) {
	context.beginPath();
	context.arc(x, y, radius, Math.PI * 2, false);
	if (fillCircle) {
		context.fill();
	} else {
		context.stroke();
	}
};
//  =========  constructor for creating objects


//  constructor
let Block = function(col, row) {
    this.col = col;
	this.row = row;
};


//  ==========  drawing a square


//  adding a method drawSquare to a property of prototype constructor 
Block.prototype.drawSquare = function(color) {
    let x = this.col * blockSize;
	let y = this.row * blockSize;
	context.fillStyle = color;
	context.fillRect(x,y,blockSize, blockSize);
};

//   creating a new object
let sampleBlock = new Block(30,25);

sampleBlock.drawSquare("blue");

//  ========  preparing to create a circle


//  function that creates a circle


// drwaing a circle 

//  adding a method drawCircle to a property of prototype constructor 
Block.prototype.drawCircle = function(color) {
	let centerX = this.col * blockSize + blockSize / 2;
	let centerY = this.row * blockSize + blockSize / 2;
	context.fillStyle = color;
	circle(centerX, centerY, blockSize / 2, true);
};

//   creating a new object
let sampleCircle = new Block(15,25);
	
sampleCircle.drawCircle("#e60000");

/*  creating method equal 
    & adding method equal to prototype property of constructor Block
	now constructor Block has one more method: equal


   the method returns true if there is a collision
   the method returns false if there is no collision
*/
Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
}

//  =========  constructor for creating a snake

let Snake = function () {
	this.segments = [
	    new Block(7, 5),
		new Block(6, 5),
		new Block(5, 5)
	];   //  array made of objects
	
	this.direction = "right";
	this.nextDirection = "right";
};

//  =========  constructor for creating a snake
function nextSegmentsColor(){
	let random = Math.random();
	
	if (random <= 0.3 && color != "LimeGreen" ) {
	segmentsColor = "LimeGreen";
	} else if (random > 0.3 && random <= 0.6 && color != "Red" ) {
	segmentsColor = "Red";	
	} else if (random > 0.6 && color != "Yellow" ) {
	segmentsColor = "Yellow";
	} else if (random > 0.6 && color == "Yellow" ) {
    segmentsColor = "Red";
	} else if (random > 0.3 && random <= 0.6 && color == "Red" ) {
    segmentsColor = "LimeGreen";
	} else if (random <= 0.3 && color == "LimeGreen" ) {
    segmentsColor = "Yellow";
	}
};

let colorArray = ["#1aff1a", "Red", "#ff8000", "#cc00cc", "orange", "blue", "black", "brown"];

Snake.prototype.draw = function() {
    


	for (let i = 0; i < this.segments.length; i++ ) {
		this.segments[i].drawSquare(colorArray[i%8]);
	
		let random = Math.random();
	if(random <= 0.3) {
	this.segments[i].drawSquare("blockColor1");
	} else if (random > 0.3 && random <= 0.6) {
	this.segments[i].drawSquare("blockColor2");	
	} else {
	this.segments[i].drawSquare("blockColor3");
	} 
	
}
};

	






//snake.move();

Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
};

//  =========  constructor for creating a snake





Snake.prototype.move = function () {
	let head = this.segments[0];
	let newHead;
	
	this.direction = this.nextDirection;
	
	if (this.direction === "right") {
		newHead = new Block(head.col + 1, head.row);
	} else if (this.direction === "down") {
		newHead = new Block(head.col, head.row + 1);
	} else if (this.direction === "left") {
		newHead = new Block(head.col - 1, head.row);
	} else if (this.direction === "up") {
		newHead = new Block(head.col, head.row - 1);
	}
	
	if (this.checkCollision(newHead)) {
		gameOver();
		return;
	}
	
	this.segments.unshift(newHead);
    
	if (newHead.equal(apple.position)) {
		score++;
		apple.move();
		
	} else {
		this.segments.pop();
	}
	
};

Snake.prototype.checkCollision = function (head) {
	let leftCollision = (head.col === 0);
	let topCollision = (head.row === 0);
	let rightCollision = (head.col === widthInBlocks - 1);
	let bottomCollision = (head.row === heightInBlocks - 1);
	
	let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
	
	let selfCollision = false;
	
	for (let i = 0; i < this.segments.length; i++) {
		if (head.equal(this.segments[i])) {
			selfCollision = true;
		}
	}
	
	return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function (newDirection) {
	if (this.direction === "up" && newDirection === "down") {
		return;
	} else if (this.direction === "right" && newDirection === "left") {
		return;
	} else if (this.direction === "down" && newDirection === "up") {
	    return;
	} else if (this.direction === "left" && newDirection === "right") {
		return;
	}
	
	this.nextDirection = newDirection;
};

let Apple = function () {
	this.position = new Block(10,10);
};
Apple.prototype.draw = function () {
	this.position.drawCircle(color);
};

/*function makeColor() {
	let random = Math.random();
	
	if(random <= 0.3) {
	return "LimeGreen";
	} else if (random > 0.3 && random <= 0.6) {
	return "Red";	
	} else {
	return "Yellow";
	}
}
*/
/*Apple.prototype.draw = function () {
	this.position.drawCircle("LimeGreen");
	let random = Math.random();
	if(random <= 0.3) {
	this.position.drawCircle("LimeGreen");
	} else if (random > 0.3 && random <= 0.6) {
	this.position.drawCircle("Red");	
	} else {
	this.position.drawCircle("Yellow");
	}
};
*/

function nextColor(){
	let random = Math.random();
	
	if (random <= 0.3 && color != "#00ff00" ) {
	color = "#00ff00";
	} else if (random > 0.3 && random <= 0.6 && color != "Red" ) {
	color = "Red";	
	} else if (random > 0.6 && color != "Yellow" ) {
	color = "Yellow";
	} else if (random > 0.6 && color == "Yellow" ) {
    color = "Red";
	} else if (random > 0.3 && random <= 0.6 && color == "Red" ) {
    color = "#00ff00";
	} else if (random <= 0.3 && color == "#00ff00" ) {
    color = "Yellow";
	}
};

Apple.prototype.move = function () {
	let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
	let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
	this.position = new Block(randomCol, randomRow);
	nextColor();
};

let snake = new Snake();
let apple = new Apple();

function setEasy() {
	return intervalTimer = 500;
	
}

function getTimerValue() {
	let random = Math.random;
	if(random < 0.4 ){
		return 150;
	}
	if(random >= 0.4){
		return 300;
	}	
}

let intervalId = setInterval(function() {	
	context.clearRect(0, 0, width, height);
	background.onload();
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
	drawBorder();
	
}, getTimerValue());


let directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

$("body").keydown(function(event) {
	let newDirection = directions[event.keyCode];
	if (newDirection !== undefined) {
		snake.setDirection(newDirection);
	}
});

function restart(){
	location.reload();
};

