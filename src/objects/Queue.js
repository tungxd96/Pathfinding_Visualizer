class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue = (e) => {
        this.queue.push(e);
    }

    dequeue = () => {
        return this.queue.shift();
    }

    peek = () => {
        return !this.isEmpty() ? this.queue[0] : null;
    }

    isEmpty = () => {
        return this.queue.length === 0;
    }
}

export default Queue;