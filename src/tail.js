import Snake from './snake.js';
export default class Tail extends Snake {
    constructor(snake, gameWidth, gameHeight, food) {
        super(gameWidth, gameHeight);
        this.tailLengthBase = 30;
        this.tailLength = '';
        this.snake = snake;
        this.tailStore = [];
        this.tailDraw = [];
        this.food = food;
    }

    draw(ctx) {
        this.tailLength = this.tailLengthBase * this.food.amountOfFoodEaten;

        this.tailStore.push({ x: this.snake.position.x, y: this.snake.position.y });

        this.tailDraw = [
            ...new Set(
                this.tailStore.filter((x, i, arr) => {
                    if (i > arr.length - this.tailLength && i < arr.length - 1) {
                        return x;
                    }
                })
            ),
        ];

        this.tailDraw.forEach((element) =>
            ctx.fillRect(element.x, element.y, this.snake.width, this.snake.height)
        );

        //check if head hits tail
        this.collissionCheck();
    }

    collissionCheck() {
        return this.tailDraw.some(
            (x) => this.snake.position.x == x.x && this.snake.position.y == x.y
        );
    }
}
