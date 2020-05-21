abstract class GameObject extends HTMLElement { 

    // Fields
    protected _y: number = 0; 
    protected _x: number = 0; 
    protected _speed : number = Math.random() * 2 + 1;

    public Width: number
    public Height: number
    
    public get Speed()  :number { return this._speed}; 
    public set Speed(s  : number)   { this.Speed = s }     
	public get X()      : number    { return this.X    }
	public set X(value  : number)   { this.X = value   }

	public get Y()      : number    { return this.Y   }
	public set Y(value  : number)   { this.Y = value   }


    public get width()  : number    { return this.clientWidth }
    public get height() : number    { return this.clientHeight }

    constructor() { 
        super() 

        
        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    public hasCollision(gameObject: GameObject) : boolean {
        return (this.Y < this.X + this.width &&
                this.X + this.width > this.X &&
                this.Y < this.Y + this.height &&
                this.Y + this.height > this.Y)
    }

    public move():void { 
        console.log("I am moving.")
    }
    
    protected draw():void { 
        this.style.transform =`translate(${this.X}px,${this.Y}px)`
    }


    public onCollision():void { 

    }

    

}