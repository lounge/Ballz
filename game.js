var arena, player, ctx, WIDTH, HEIGHT;
var ballz = [];

var BASE_COLORS = ['#007766', '#225599', '#665599', '#acac00'];
//var BORDER_COLORS = ['#005C4E', '#1D4B86', '#5C4C8A', '#949400'];
var START_COORDS_X = [];
var START_COORDS_Y = [];

(function () {

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	START_COORDS_X = [0, WIDTH];
	START_COORDS_Y = [0, HEIGHT];

	arena = document.getElementById('arena');
	arena.width = WIDTH;
	arena.height = HEIGHT;

	ctx = arena.getContext('2d');

	//ctx.beginPath();
	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	//ctx.closePath();

	window.addEventListener('mousemove', onMouseMove, false);
	

	//ctx.beginPath();

	for (var i = 0; i < 50; i++) {
		var ball = new Ball;
		ball.draw();
		ballz.push(ball);

	}
	
	player = new Player;
	player.draw();

	setInterval(loop, 1000/60);

})();

function onMouseMove (e) {
	
	player.x = e.clientX;
	player.y = e.clientY;



}


function loop () {

    //ctx.beginPath();
	ctx.clearRect (0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#222";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	//ctx.closePath();

	for (var i = 0; i < ballz.length; i++) {
		var ball = ballz[i];

		// if (ball.x - ball.radius > WIDTH ||
  //           ball.x + ball.radius < 0 ||
  //           ball.y - ball.radius > HEIGHT ||
  //           ball.y + ball.radius < 0) {
  //         	ballz.splice(i, 1);
  // 		} else {
  // 			ball.x += ball.vx;
  //       	ball.y += ball.vy;
		// 	ball.draw();
  // 		}

  		//screen wrapping


        if (ball.x - ball.radius * 2 > WIDTH || ball.x + ball.radius * 2 < 0 || ball.y - ball.radius * 2 > HEIGHT || ball.y < 0 - ball.radius * 2) {
         	ballz.splice(i, 1);

        	var ball = new Ball((START_COORDS_X[Math.round(Math.random() * 1)]), START_COORDS_Y[Math.round(Math.random() * 1)]);
			ball.draw();
			ballz.push(ball);
        }


        //collision detection
        var dx = ball.x - player.x,
            dy = ball.y - player.y,
            dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ball.radius + player.radius) {

        	if (ball.radius >= player.radius && player.score > 0) {
        		//die
        		//player.color = 'red';
        		player.radius -= 0.4;
        		updateScore(Math.round(ball.radius), false);
        	} else if (ball.radius < player.radius) {
        		player.radius += 0.4;
        		updateScore(Math.round(ball.radius), true);
        	}

        	ballz.splice(i, 1);

        	var ball = new Ball(START_COORDS_X[Math.round(Math.random() * 1)], (START_COORDS_Y[Math.round(Math.random() * 1)]));
			ball.draw();
			ballz.push(ball);
			//player.color = '#ffffff';
        } 

         

        ball.direction === 1 ? ball.x += ball.vx : ball.x -= ball.vx 
        ball.direction === 0 ? ball.y += ball.vy : ball.y -= ball.vy 
        ball.draw();

	}

	player.draw();

	//updateScore(1);

	

}

function updateScore (score, add) {
	var scoreHolder = document.getElementById('score');
	var currentScore = parseInt(scoreHolder.innerHTML);
	var newScore;
	
	
	if (add) {
		newScore = currentScore += score
	} else {
		newScore = currentScore -= score
	}

	if (newScore < 0) { newScore = 0 }

	player.score = newScore;
	scoreHolder.innerHTML = newScore;
}


function Player () {

	this.x = 0;
	this.y = 0;
	this.score = 0;
	this.radius = 6;
	this.color = '#B22'

	Player.prototype.draw = function () {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI, false);
		ctx.fill();

		ctx.lineWidth = 1;
        ctx.strokeStyle = '#2E2E2E';
        ctx.stroke();

		//ctx.closePath();
	}

}

function Ball (x, y, color) {

	this.direction = Math.round(Math.random() * 1);
	this.radius = (Math.random() * 80) + 2
	this.speed = Math.random() * 3 + 1;
	this.colorNumber = Math.round(Math.random() * 4);
	this.x = x != null ? x : Math.round(Math.random() * WIDTH);
	this.y = y != null ? y : Math.round(Math.random() * HEIGHT);
	this.vx = Math.random() * this.speed;
    this.vy = Math.random() * this.speed;

    Ball.prototype.draw = function () {

    	// if (this.vx === 0) { this.vx = 1 }
    	// if (this.vy === 0) { this.vy = 1 }




    	ctx.beginPath();
		ctx.fillStyle = BASE_COLORS[this.colorNumber];
		ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI, false);
		ctx.fill();

		ctx.lineWidth = 1;
        ctx.strokeStyle = '#2E2E2E';
        ctx.stroke();

		//ctx.closePath();

		

		//ctx.closePath();


	}
}

