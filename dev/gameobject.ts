abstract class GameObject extends HTMLElement { 
    protected y: number
    protected x: number 
    public Width: number
    public Height: number
    

	public get X()      : number    { return this.x    }
	public set X(value  : number)   { this.x = value   }

	public get Y()      : number    { return this.y    }
	public set Y(value  : number)   { this.y = value   }


    public get width()  : number    { return this.clientWidth }
    public get height() : number    { return this.clientHeight }

    constructor() { 
        super() 
        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    public checkCollision(this):Boolean { 
        return false; 
    }

    public move():void { 
        console.log("I am moving.")
    }
    
    protected draw():void { 
        this.style.transform =`translate(${this.x}px,${this.x}px)`
    }


    public onCollision():void { 

    }

    

}