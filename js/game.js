//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject(canvas.width/2, canvas.height - 50, 250, 40, "cyan");
	ball = new GameObject(canvas.width/2, canvas.height/2, 80, 80, "magenta");

	ball.vx = 5;
	ball.vy = 5;

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	
	//Move the Player to the right
	if(d)
	{
		//console.log("Moving Right");
		player.x += 2;
	}
	if(a)
	{
		//console.log("Moving Left");
		player.x += -2;
	}

	if (ball.x + ball.width/2 >= canvas.width || ball.x - ball.width/2 <= 0)
        {
            ball.vx *= -1;
        }

        if(ball.y + ball.height/2 >= canvas.height || ball.y - ball.height/2 <= 0)
        {
            ball.vy *= -1;
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

	//Update the Screen
	player.drawRect();
	ball.drawCircle();
}

