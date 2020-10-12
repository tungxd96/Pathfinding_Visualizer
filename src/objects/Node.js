class Node {
    constructor() {
        this.start = false;
        this.end = false;
        this.wall = false;
        this.path = false;
        this.visited = false;
        this.position = null;
        this.cost = null;
        this.parent = null;
    }
    
    setPosition = (row, col) => {
        this.position = { row, col };
    }

    setCost = cost => {
        this.cost = cost;
    }

    reset = () => {
        this.wall = false;
        this.path = false;
        this.visited = false;
        this.cost = null;
        this.parent = null;
    }

    resetPath = () => {
        this.path = false;
        this.visited = false;
        this.cost = null;
        this.parent = null;
    }
}

export default Node;