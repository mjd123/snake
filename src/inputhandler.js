export default class InputHandler {
    constructor(snake, gameHeight, gameWidth) {
        this.speed = 10;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.positionStore = [];
        this.direction = '';
        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37:
                    if (snake.position.x - snake.width / 2 > 0 && this.direction != 'right') {
                        this.direction = 'left';
                    }

                    break;

                case 39:
                    if (
                        snake.position.x + snake.width * 2 <= this.gameWidth &&
                        this.direction != 'left'
                    ) {
                        this.direction = 'right';
                    }

                    break;

                case 38:
                    if (snake.position.y - snake.height / 2 > 0 && this.direction != 'down') {
                        this.direction = 'up';
                    }

                    break;

                case 40:
                    if (
                        snake.position.y + snake.height < this.gameHeight &&
                        this.direction != 'up'
                    ) {
                        this.direction = 'down';
                    }

                    break;
            }
            // console.log(this.storeX[0]);

            this.positionStore.push({ x: snake.position.x, y: snake.position.y });
        });
    }
}
