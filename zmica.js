var app = new PIXI.Application(1200, 720, {antialias: true});
document.body.appendChild(app.view);
var snakeArray = [];
var m = 45;
var n = 45;
var squareSize = 10;
var matrix = [];
var matrixContainer = new PIXI.Container();
var wall_color = 0xFFFFFF;
var snake_color = 0x00cc00;
var snakeHead_color = 0x1aff1a;
var food_color = 0xe60000;
var emptyField_color = 0x000000;
var snakeStartSize = 10;
var right = 0;
var down = -1;
var frame = 0;
var numOfFood=100;
var frequency = 3;
var gameOver_bool = false;
var score = 0 ;
var style = new PIXI.TextStyle({
	fill: ['#FFFFFFFF'],
	align: 'center',
	fontFamily: 'Arial',
    fontSize: 36
})
var score_text = new PIXI.Text('0', style);
score_text.x = app.screen.width /2;
score_text.y = 40;
score_text.anchor.set(0.5);

app.stage.addChild(score_text);
app.stage.addChild(matrixContainer);

// GRID DRAWING
// GRID DRAWING
// GRID DRAWING


	for (var i = 0; i < m; i++) {
	matrix[i] = []
	for (var j = 0; j < n; j++) {
		// var graphics = new PIXI.Graphics();
		// graphics.beginFill(0xFFFFFF,1);
		// graphics.lineStyle(0);
		// graphics.drawRect(0,0, squareSize, squareSize);
		// graphics.endFill();
		// matrix[i][j] = new PIXI.Sprite(graphics.generateTexture());

		matrix[i][j] = new PIXI.Sprite(PIXI.Texture.WHITE);
		matrix[i][j].width = squareSize;
		matrix[i][j].height = squareSize;
		matrix[i][j].x = j * squareSize;
		matrix[i][j].y = i * squareSize;
		matrix[i][j].i = i;
		matrix[i][j].j = j;
		matrixContainer.addChild(matrix[i][j]);
	}
}
matrixContainer.x = app.screen.width/2 - matrixContainer.width/2;
matrixContainer.y = app.screen.height/2 - matrixContainer.height/2;


function startGame() {

	gameOver_bool = false;
	score = 0;
	score_text.text = score;


// SNAKE DRAWING
// SNAKE DRAWIN
// SNAKE DRAWING

snakeArray = [];
right = 0;
down = -1;

for (var i = 0; i < snakeStartSize; i++) {
	snakeArray.push(matrix[(Math.floor(m/2)) + i][Math.floor(n/2)]);

if (i === 0) {
	snakeArray[i].tint = snakeHead_color;
} else {
	snakeArray[i].tint = snake_color;
	}
}

// FIELD COLORS
// FIELD COLORS
// FIELD COLORS

for (var i = 0; i < m; i++) {
	for (var j = 0; j < n; j++) {
	if (i === 0 || j === 0 || i === m - 1 || j === n - 1) {
			matrix[i][j].tint = wall_color
		} else {
			matrix[i][j].tint = emptyField_color;
		}
	}
}

for (var i=0; i<numOfFood;i++)
{
	foodPositioning()
}
	frame = 0;

}

// TICKER
// TICKER
// TICKER

	app.ticker.add(function(delta) {
		if (gameOver_bool) { 
			return
		}
		if (frame % frequency === 0) {
			moveSnake()
		} 
			frame++
	});

// FOOD DRAWING
// FOOD DRAWING
// FOOD DRAWING


function foodPositioning() {

	var i,j;

	do {
		 i = Math.floor(Math.random() * (m - 2)) + 1;
		 j = Math.floor(Math.random() * (n - 2)) + 1;

	} while (matrix[i][j].tint !== emptyField_color);

	matrix[i][j].tint = food_color;

}

function moveSnake() {
		var tail = snakeArray[snakeArray.length - 1]
		snakeArray[snakeArray.length - 1].tint = emptyField_color;
		for (var i = snakeArray.length - 1 ; i > 0; i--) {
			snakeArray[i] = snakeArray[i-1];
			snakeArray[i].tint = snake_color;
		}

		if (matrix[snakeArray[0].i + down][snakeArray[0].j + right].tint === food_color) {
			//foodPositioning()
			snakeArray.push(tail);
			tail.tint = snake_color;
			score++;
			score_text.text = score;
		}

		if (matrix[snakeArray[0].i + down][snakeArray[0].j + right].tint === snake_color || 
		matrix[snakeArray[0].i + down][snakeArray[0].j + right].tint === wall_color ) {
			gameOver()
		}

		snakeArray[0] = matrix[snakeArray[0].i + down][snakeArray[0].j + right]
		snakeArray[0].tint = snakeHead_color;



}


document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {
	
 // RIGHT Key is 39
 if (key.keyCode === 39 && right === 0 ) {
 	right = 1
 	down = 0
 }
 // LEFT Key is 37
 if (key.keyCode === 37 && right === 0) {
 	right = -1
 	down = 0
 	}
// Down arrow is 40
if (key.keyCode === 40 && down === 0) {
	down = 1
	right = 0
	}
// Up arrow is 87
 if (key.keyCode === 38 && down === 0) {
 	down = -1
 	right = 0
 		}

}

function gameOver() {
	gameOver_bool = true
	setTimeout(startGame, 3000);

}






startGame()






























