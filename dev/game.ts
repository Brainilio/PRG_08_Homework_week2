class Game {

    // Fields
    private cars    : Car[]     = []
    private rocks   : Rock[]    = []
    private gameObjects : GameObject[] = []
    private score   : number    = 0
    private request : number    = 0
    private gameover: boolean   = false


    constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        for(let i = 0; i < this.gameObjects.length; i++) { 
            console.log(this.gameObjects[i]);
        }

        this.gameLoop()

       
    }

    private addCarWithRock(index : number) {
        this.gameObjects.push(new Car(index, this))
        this.gameObjects.push(new Rock(index))
    }

    private gameLoop(){
        for(let object of this.gameObjects) { 
            object.move();
        }

        this.checkCollision()
        
        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {

        // for(let object of this.gameObjects) { 
        //     if(this.hasCollision(tgh, object) { 

        //     })
        // }
        for(let object of this.gameObjects) {
        
                if(this.gameObjects.hasCollision(this)) {
                    object.crashed(object.Speed)
                    object.crash()
                    this.gameOver()
                
            }
        }
    }

    private gameOver() : void{
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x : number){
        if(!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : "+this.score
    }

  
} 

// load
window.addEventListener("load", () => new Game() )