import Lidia from '../../assets/sprites/lidia.png';

export class Player {
	constructor() {
		this.xTile = 0;
		this.yTile = 0;
		this.sprite = new Image();
		this.sprite.src = Lidia;

		this.state = 'IDLE';
		this.offsets = {
			IDLE: 2,
			UP: 0,
			LEFT: 1,
			DOWN: 2,
			RIGHT: 3
		};
		this.animationSpeed = 16;
	}

	update(input, frameNum) {
		if (frameNum < this.animationStart + this.animationSpeed) {
			// We're animating, don't take more input.
			return;
		}
		if (this.state !== 'IDLE') {
			// We were animating. Now move.
			switch(this.state) {
				case 'LEFT':
					this.xTile -= 1;
					break;
				case 'RIGHT':
					this.xTile += 1;
					break;
				case 'UP':
					this.yTile -= 1;
					break;
				case 'DOWN':
					this.yTile += 1;
					break;
			}
		}
		this.state = 'IDLE';
		if (input.LEFT) {
			this.state = 'LEFT';
			this.animationStart = frameNum;
		}
		if (input.UP) {
			this.state = 'UP';
			this.animationStart = frameNum;
		}
		if (input.RIGHT) {
			this.state = 'RIGHT';
			this.animationStart = frameNum;
		}
		if (input.DOWN) {
			this.state = 'DOWN';
			this.animationStart = frameNum;
		}
	}

	draw(c, frameNum) {
		c.fillStyle = 'white';
		// c.fillRect(this.xTile * 64, this.yTile * 64, 64, 64);

		// So the player doesn't teleport
		let animationOffsetX = 0;
		let animationOffsetY = 0;
		if (this.state !== 'IDLE') {
			const offset = (frameNum - this.animationStart) / this.animationSpeed * 64;
			switch(this.state) {
				case 'DOWN':
					animationOffsetY = offset;
					break;
				case 'UP':
					animationOffsetY = -offset;
					break;
				case 'RIGHT':
					animationOffsetX = offset;
					break;
				case 'LEFT':
					animationOffsetX = -offset;
					break;
			}
		}

		c.drawImage(
			this.sprite,
			(parseInt(frameNum / 4) % 9) * 64,
			this.offsets[this.state] * 64,
			64, 64,
			this.xTile * 64 + animationOffsetX,
			this.yTile * 64 + animationOffsetY - 5,
			64, 64);
	}
}