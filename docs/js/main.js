class GameObject extends HTMLElement {
    constructor() {
        super();
        this._y = 0;
        this._x = 0;
        this._speed = Math.random() * 2 + 1;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    get Speed() { return this._speed; }
    ;
    set Speed(s) { this.Speed = s; }
    get X() { return this.X; }
    set X(value) { this.X = value; }
    get Y() { return this.Y; }
    set Y(value) { this.Y = value; }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    hasCollision(gameObject) {
        return (this.Y < this.X + this.width &&
            this.X + this.width > this.X &&
            this.Y < this.Y + this.height &&
            this.Y + this.height > this.Y);
    }
    move() {
        console.log("I am moving.");
    }
    draw() {
        this.style.transform = `translate(${this.X}px,${this.Y}px)`;
    }
    onCollision() {
    }
}
class Wheel extends GameObject {
    constructor(car, offsetCarX) {
        super();
        this.style.transform = `translate(${offsetCarX}px, 30px)`;
        car.appendChild(this);
    }
    move() {
        console.log("I am rolling.");
    }
    onCollision() {
    }
}
window.customElements.define("wheel-component", Wheel);
class Car extends GameObject {
    constructor(yIndex, game) {
        super();
        this.speed = Math.random() * 2 + 1;
        this.braking = false;
        this.stopped = false;
        this.game = game;
        this._x = 0;
        this._y = (70 * yIndex) + 80;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
    }
    get Speed() { return this.speed; }
    handleMouseClick(e) {
        this.braking = true;
        this.changeColor(80);
    }
    handleKeyDown(e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    }
    move() {
        this.X += this.speed;
        if (this.braking)
            this.speed *= 0.98;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.game.addScore(this.X);
            this.braking = false;
            this.stopped = true;
        }
        this.draw();
    }
    crash() {
        this.speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.cars = [];
        this.rocks = [];
        this.gameObjects = [];
        this.score = 0;
        this.request = 0;
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
        }
        for (let i = 0; i < this.gameObjects.length; i++) {
            console.log(this.gameObjects[i]);
        }
        this.gameLoop();
    }
    addCarWithRock(index) {
        this.gameObjects.push(new Car(index, this));
        this.gameObjects.push(new Rock(index));
    }
    gameLoop() {
        for (let object of this.gameObjects) {
            object.move();
        }
        this.checkCollision();
        this.request = requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        for (let car of this.cars) {
            for (let rock of this.rocks) {
                if (this.hasCollision(car, rock)) {
                    rock.crashed(car.Speed);
                    car.crash();
                    this.gameOver();
                }
            }
        }
    }
    gameOver() {
        this.gameover = true;
        document.getElementById("score").innerHTML = "Game Over";
        cancelAnimationFrame(this.request);
    }
    addScore(x) {
        if (!this.gameover) {
            this.score += Math.floor(x);
            this.draw();
        }
    }
    draw() {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    }
}
window.addEventListener("load", () => new Game());
class Rock extends GameObject {
    constructor(index) {
        super();
        this.speed = 0;
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.X = Math.random() * 400 + 400;
        this.X = (70 * index) + 80;
    }
    move() {
        this.X += this.speed;
        this.X += this.g;
        this.speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.X + this.clientHeight > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        this.draw();
    }
    crashed(carSpeed) {
        this.g = 9.81;
        this.speed = carSpeed;
        this.rotationSpeed = 5;
    }
}
window.customElements.define("rock-component", Rock);
//# sourceMappingURL=main.js.map