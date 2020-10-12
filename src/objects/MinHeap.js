class MinHeap {
    constructor() {
        this.queue = [];
        this.minHeapLength = this.queue.length;
    }

    addWithPriority = (key, value) => {
        const vertex = { key: key, value: value };

        this.queue.push(vertex);
        this.minHeapLength += 1;

        let currentIndex = this.minHeapLength - 1;

        while (currentIndex !== 0) {
            const tentativeIndex = parseInt(currentIndex / 2);
            if (this.queue[currentIndex].value < this.queue[tentativeIndex].value) {
                this.swap(currentIndex, tentativeIndex);
            }
            currentIndex = parseInt(currentIndex / 2);
        }
    }

    decreasePriority = (key, value) => {
        const index = this.find(key);
        if (index) {
            this.removeAt(index);
            this.addWithPriority(key, value);
        }
    }

    find = (key) => {
        for (var i = 0; i < this.minHeapLength; i++) {
            if (this.queue[i].key === key) {
                return i;
            }
        }
        return null;
    }

    removeAt = (index) => {
        const last = this.minHeapLength - 1;
        this.swap(index, last);
        const removedVertex = this.queue.pop();
        this.minHeapLength -= 1;
        this.reheapifyAt(index);
        return removedVertex;
    }

    reheapifyAt = (index) => {
        let currentIndex = index;
        for (var i = index; i < this.minHeapLength; i++) {
            const left = 2 * i, right = 2 * (i + 1);
            const children = this.getChildren(left, right);
            if (children.left && children.right) {
                const min = Math.min(children.left, children.right)
                const minIndex = min === children.left ? left : right;
                if (this.queue[currentIndex].value > min) {
                    this.swap(currentIndex, minIndex);
                    currentIndex = minIndex;
                    i = minIndex - 1;
                }
            }
        }
    }

    getChildren = (left, right) => {
        if (left < this.minHeapLength && right >= this.minHeapLength) {
            return { left: this.queue[left].value, right: Infinity };
        }
        if (right < this.minHeapLength && left >= this.minHeapLength) {
            return { left: Infinity, right: this.queue[right].value };
        }
        if (left >= this.minHeapLength && right >= this.minHeapLength) {
            return { left: null, right: null }
        }
        return { left: this.queue[left].value, right: this.queue[right].value };
    }

    extractMin = () => {
        let min = Infinity;
        let index = -1;
        for (var i = 0; i < this.minHeapLength; i++) {
            if (min > this.queue[i].value) {
                index = i;
                min = this.queue[i].value;
            }
        }
        return index === -1 ? null : this.removeAt(index).key;
    }

    isEmpty = () => {
        return this.queue.length === 0;
    }

    swap = (i, j) => {
        const temp = this.queue[i];
        this.queue[i] = this.queue[j];
        this.queue[j] = temp;
    }
}

export default MinHeap;