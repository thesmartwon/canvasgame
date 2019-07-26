import { Player } from './objects/player';
import { resize } from './helpers';

// Grab the canvas and thing we draw on
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
// Resize the canvas when the window is resized
resize(canvas);
window.addEventListener('resize', () => resize(canvas));

// Capture arrow key input we care about
const input = {
	UP: false,
	DOWN: false,
	LEFT: false,
	RIGHT: false
};
window.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		input.LEFT = true;
	} else if (event.keyCode === 38) {
		input.UP = true;
	} else if (event.keyCode === 39) {
		input.RIGHT = true;
	} else if (event.keyCode === 40) {
		input.DOWN = true;
	}
});
window.addEventListener('keyup', event => {
	if (event.keyCode === 37) {
		input.LEFT = false;
	} else if (event.keyCode === 38) {
		input.UP = false;
	} else if (event.keyCode === 39) {
		input.RIGHT = false;
	} else if (event.keyCode === 40) {
		input.DOWN = false;
	}
});

// Make game objects
const gameObjects = {
	player: new Player()
}

let frameNum = 0;

function main(tFrame) {
	// Update all objects with input
	Object.values(gameObjects).forEach(obj => obj.update(input, frameNum));

	// Clear current canvas
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = 'gray';
	for (let i = 0; i < canvas.width / 64; i++) {
		for (let j = 0; j < canvas.height / 64; j++) {
			context.strokeRect(i * 64, j * 64, 64, 64);
		}
	}

	// Draw all objects
	Object.values(gameObjects).forEach(obj => obj.draw(context, frameNum));

	// Do this loop again
	window.requestAnimationFrame(main);
	frameNum++;
}

window.requestAnimationFrame(main);
