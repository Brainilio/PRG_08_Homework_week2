/// <reference path="gameobject.ts" />



class Rock extends GameObject{
    
    // Fields 
    
    private speed           : number = 0
    private g               : number = 0 // gravity
    private rotation        : number = 0
    private rotationSpeed   : number = 0


    constructor(index) {
        super()
        this.X = Math.random() * 400 + 400
        this.X = (70 * index) + 80

    }

    public move():void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.X += this.speed
        this.X += this.g
        this.speed *= 0.98
        this.rotation += this.rotationSpeed

        if (this.X + this.clientHeight > document.getElementById("container").clientHeight){
            this.speed = 0
            this.g = 0
            this.rotationSpeed = 0
        }

        //teken de div op de juiste positie
        this.draw()
    }

    public crashed(carSpeed : number) {
        this.g = 9.81
        this.speed = carSpeed
        this.rotationSpeed = 5
    }
}

window.customElements.define("rock-component", Rock as any)