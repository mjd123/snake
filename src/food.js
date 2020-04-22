export default class Food {
    constructor(snake, oldFood) {
        this.snake = snake;
        this.amountOfFood = 10;
        this.food = [];
        this.foodSize = 10;
        this.amountOfFoodEaten = oldFood ? oldFood : 0;

        this.setFood();
    }

    setFood() {
        this.randomInteger = function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        for (let index = 0; index < this.amountOfFood; index++) {
            this.food.push({
                x: this.randomInteger(0, 800 - this.snake.width),
                y: this.randomInteger(0, 600 - this.snake.height),
            });
        }
    }

    draw(ctx) {
        this.food.forEach((element) => {
            ctx.fillRect(element.x, element.y, this.foodSize, this.foodSize);
        });
    }

    foodEaten() {
        // return true if in range, otherwise false
        function inRange(x, min, max) {
            return (x - min) * (x - max) <= 0;
        }
        // if snake head hits food
        this.food.some((x, i) => {
            if (
                inRange(this.snake.position.x + this.snake.width / 2, x.x, x.x + this.foodSize) &&
                inRange(this.snake.position.y + +this.snake.height / 2, x.y, x.y + this.foodSize)
            ) {
                this.food.splice(i, 1);
                this.amountOfFoodEaten++;
                this.score();
                return;
            }
        });
    }

    score() {
        let scoreContainer = document.getElementsByClassName('score');
        scoreContainer[0].innerHTML = `Score: ${this.amountOfFoodEaten}`;
    }
}
