export class Player {
	constructor() {
		this.x = 0;
		this.y = 0;
	}

	update(input) {
		if (input.UP) {
			this.y -= 4;
		}
		if (input.DOWN) {
			this.y += 4;
		}
		if (input.RIGHT) {
			this.x += 4;
		}
		if (input.LEFT) {
			this.x -= 4;
		}
	}

	draw(c) {
		c.fillStyle = "white";
		c.fillRect(this.x, this.y, 50, 50); 
	}
}