class Player{

	constructor(x, color){
		this.x = x;
		this.y = 0;
		this.speed = 15;
		this.points = 0;

		this.w = 10;
		this.h = 100;

		this.fill = color;

	}

	draw(){
		fill(this.fill);
		rect(this.x, this.y, this.w, this.h);
	}

	up(){
		this.y = this.y - this.speed;
	}

	down(){
		this.y = this.y + this.speed;
	}

	move(y){
		this.y = y;
	}

	givePoints(){
		this.points = this.points + 1;
	}

}

class Ball {

	constructor(){
		this.d = 30;
		this.reset();
		this.moveCount = 0;

		img.resize(30,30);

	}

	draw(){
		fill(100,0,0);

		image(img, this.x, this.y);
		//ellipse(this.x, this.y, this.d);
	}

	move(){
		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;

		if(this.y < 0 || this.y > height) {
			this.speedY = this.speedY * -1;
		}

		this.moveCount = this.moveCount + 1;

		if(this.moveCount > 100) {
			if(this.speedX > 0) {
				this.speedX = this.speedX + 2;
			} else {
				this.speedX = this.speedX - 2;
			}
			this.moveCount = 0;
		}
	}

	reset(){

		this.x = width/2;
		this.y = height/2;

		this.speedY = -1;

		let direction = random(-1,1);

		if(direction < 0){
			this.speedX = - 5;
		}
		else if(direction > 0){
			this.speedX = 5;
		}
	}

}






let player1, player2, ball;

let img;

function preload(){

	img = loadImage('ball.png')

}

function setup(){

	createCanvas(800, 300);

	player1 = new Player(20, color(255, 0, 0, 80));
	player2 = new Player(width - 20, color(0, 0, 255, 80));

	ball = new Ball();


}


function draw(){

	background(0);
	fill(255);


	text("Poeng: " + player1.points + "-" + player2.points , width/2, 20)

	if(keyIsDown(UP_ARROW)){
		player1.up();
	}

	else if(keyIsDown(DOWN_ARROW)){
		player1.down();
	}

	player2.move(mouseY);

	ball.move();


	let = player1Hit = collideRectCircle(player1.x,
		player1.y,
		player1.w,
		player1.h,
		ball.x,
		ball.y,
		ball.d)

	if(player1Hit){
		ball.speedX = ball.speedX * -1;
	}

	let = player2Hit = collideRectCircle(player2.x,
		player2.y,
		player2.w,
		player2.h,
		ball.x,
		ball.y,
		ball.d)

	if(player2Hit){
		ball.speedX = ball.speedX * -1;
	}


	if(ball.x < player1.x) { // utfor på venstre side
		player2.givePoints();
		ball.reset();
	}
	else if(ball.x > player2.x) { // utfor på høyre side
		player1.givePoints();
		ball.reset();
	}





	ball.draw();

	player1.draw();
	player2.draw();




}
