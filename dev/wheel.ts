/// <reference path="gameobject.ts" />

class Wheel extends GameObject {
                        
    constructor(car : Car, offsetCarX : number) {
        super()
        
        this.style.transform = `translate(${offsetCarX}px, 30px)`

        car.appendChild(this)

      
    }

    move():void { 
        console.log("I am rolling.");
    }

    onCollision(this):void { 
        
    }

    
}

window.customElements.define("wheel-component", Wheel as any)