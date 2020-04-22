import Snake from './snake.js';
import InputHandler from './inputhandler.js';
import Tail from './tail.js';
import Food from './food.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let gameSpeed = 2;

let snake = new Snake(GAME_WIDTH, GAME_HEIGHT, gameSpeed);
let input = new InputHandler(snake, GAME_HEIGHT, GAME_WIDTH);
let food = new Food(snake);
let tail = new Tail(snake, GAME_WIDTH, GAME_HEIGHT, food);

function gameLoop() {
    if (!tail.collissionCheck()) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        snake.draw(ctx, input.positionStore);
        snake.move(input);
        tail.draw(ctx);
        food.draw(ctx);
        food.foodEaten(tail);

        levelIncrease();
        requestAnimationFrame(gameLoop);
    } else {
        reset();
    }
}

function levelIncrease() {
    // level increase

    if (food.food.length < 1) {
        // re initialized classes involved in food and tail length
        snake = new Snake(GAME_WIDTH, GAME_HEIGHT, gameSpeed);
        food = new Food(snake, tail.food.amountOfFoodEaten);
        tail = new Tail(snake, GAME_WIDTH, GAME_HEIGHT, food);
        // increase speed
        snake.speed += 0.5;
        gameSpeed += 0.5;
    }
}

function reset() {
    let gameOverOverlay = document.getElementsByClassName('game_over');
    let scoreContainer = gameOverOverlay[0].children[1];
    scoreContainer.innerHTML = `Score: ${food.amountOfFoodEaten}`;

    // show overlay
    gameOverOverlay[0].classList.add('show');

    gameOverOverlay[0].lastElementChild.addEventListener('click', () => {
        //remove overlay
        gameOverOverlay[0].classList.remove('show');

        // re initialized classes
        snake = new Snake(GAME_WIDTH, GAME_HEIGHT, gameSpeed);
        input = new InputHandler(snake, GAME_HEIGHT, GAME_WIDTH);
        food = new Food(snake);
        tail = new Tail(snake, GAME_WIDTH, GAME_HEIGHT, food);
        gameSpeed = 2;
        //force reset score
        food.score();
        // start loop again
        requestAnimationFrame(gameLoop);
    });
}
requestAnimationFrame(gameLoop);
