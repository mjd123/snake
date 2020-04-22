export default class Snake {
    constructor(gameWidth, gameHeight, gameSpeed) {
        this.width = 10;
        this.height = 10;

        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight / 2 - this.height / 2
        };

        this.speed = gameSpeed;
    }

    draw(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    move(input) {
        switch (input.direction) {
            case 'left':
                this.position.x -= this.speed;
                // when snake goes off the screen
                if (this.position.x < 0) {
                    this.position.x = this.gameWidth;
                }
                break;

            case 'right':
                this.position.x += this.speed;

                if (this.position.x > this.gameWidth) {
                    this.position.x = 0;
                }
                break;

            case 'up':
                this.position.y -= this.speed;

                if (this.position.y < 0) {
                    this.position.y = this.gameHeight;
                }
                break;

            case 'down':
                this.position.y += this.speed;

                if (this.position.y > this.gameHeight) {
                    this.position.y = 0;
                }
                break;

            default:
                break;
        }
    }
}
