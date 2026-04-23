//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

var frictionX = .5;	
var frictionY = .3;
var gravity = .5;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject(canvas.width/2, canvas.height - 50, 250, 40, "cyan");
	ball = new GameObject(canvas.width/2, canvas.height/2, 80, 80, "magenta");

	ball.vx = 0;
	ball.vy = 2;

	//Set the Animation Timer
	timer = setInterval(animate, interval);
	let scoreCount = 0;

function animate()
{
	//console.log(ball.x, player.x)
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);

	player.x += player.vx;
	player.vx *= frictionX;

	//Move the Player to the right
	if(d)
	{
		//console.log("Moving Right");
		if (player.x + player.width/2 >= canvas.width)
		{
			player.vx = 0;
		}
		else
		{
			player.vx +=  player.ax * player.force;
		}
	}
	if(a)
	{
		//console.log("Moving Left");
		if(player.x - player.width <= -125)
		{
			player.vx = 0;
		}
		else
		{
			player.vx += player.ax * -player.force;
		}
	}

	ball.vy += gravity;
	ball.x += ball.vx;
    ball.y += ball.vy;

	let collision = player.hitTestObject(ball);

	if(collision && ball.vy > 0)
	{
		ball.y = player.top() - ball.height/2; //sets the ball y to the top of the paddle on contact to stop it from phasing through after a lot of hits 
		ball.vy = -35;
		if(ball.x < player.x - player.width/3)
		{
			if(ball.x < player.x - player.width/6)
			{
				ball.vx = -ball.force * 5;
			}
			else
			{
				ball.vx = -ball.force;
			}
		}

		if(ball.x > player.x + player.width/3)
		{
			if(ball.x < player.x + player.width/6)
			{
				ball.vx = ball.force * 5;
			}
			else
			{
				ball.vx = ball.force;
			}
		}
		ball.vy *= .8;
		scoreCount++;
	}

	if (ball.bottom() >= canvas.height) //checks if the bottom of the ball touches the ground; prevents phasing
        {
			ball.y = canvas.height - ball.height/2 //preventing the phasing
			ball.vy = -ball.vy * .67;
			scoreCount = 0;
        }

	if(ball.top() <= 0)
	{
		ball.y = ball.height/2;
		ball.vy = -ball.vy * .67;
	}

	if(ball.left() <= 0)
	{
		ball.x = ball.width/2;
		ball.vx = -ball.vx * .67;
	}

	if(ball.right() >= canvas.width)
	{
		ball.x = canvas.width - ball.width/2;
		ball.vx = -ball.vx * .67;
	}

	//Update the Screen
	context.font = "16px Arial black";
	context.fillStyle = "dark gray";
	context.fillText("Score: " + scoreCount, 80, 25);

	player.drawRect();
	ball.drawCircle();

	context.save();
	context.strokeStyle = "dark gray";
	context.beginPath();
	context.moveTo(ball.x, ball.y);
	context.lineTo(player.x, player.y);
	context.lineWidth = 1;
	context.stroke();
	context.restore();
}
