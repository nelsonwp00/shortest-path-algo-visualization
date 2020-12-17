class MinHeap {
    constructor() {
        this.queue = [];
    }

    buildHeap(nodes) {
        for (let node of nodes) {
            this.insert(node);
        }
    }

    insert(node) {
        this.queue.push(node);
        let currentIndex = this.queue.length - 1;

        this.heapifyUp(currentIndex);
    }

    extractMin() {
        const minNode = this.queue[0];
        const endNode = this.queue.pop();

        // if the heap has > 1 elements.
        if (minNode !== endNode) {
            this.queue[0] = endNode;
            const length = this.queue.length;
            this.heapifyDown(0, length);
        }

        return minNode;
    }

    heapifyUp(index) {
        let currentIndex = index;
        let current = this.queue[currentIndex];
        if (currentIndex === 0) return;

        let parentIndex = this.parent(currentIndex);
        let parent = this.queue[parentIndex];

        while (current.distance < parent.distance) {
            this.swap(parentIndex, currentIndex)
            
            current = this.queue[parentIndex];
            currentIndex = parentIndex;
            if (currentIndex === 0) return;

            parentIndex = this.parent(currentIndex);
            parent = this.queue[parentIndex];
        }
    }

    heapifyDown(index, length) {
        let minIndex = index;

        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        const parent = this.queue[minIndex];
        const leftChild = this.queue[leftChildIndex];
        const rightChild = this.queue[rightChildIndex];

        if (leftChildIndex < length && leftChild.distance < parent.distance) {
            minIndex = leftChildIndex;
        }
        if (rightChildIndex < length && rightChild.distance < parent.distance) {
            if (minIndex === parent) 
                minIndex = rightChildIndex;
            else if (rightChild.distance < leftChild.distance)
                minIndex = rightChildIndex;
        }

        if (minIndex !== index) {
            this.swap(index, minIndex);
            this.heapifyDown(minIndex, length);
        }
    }

    swap(parentIndex, childIndex) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
    }

    parent(childIndex) {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        return parentIndex;
    }

}

export default MinHeap;