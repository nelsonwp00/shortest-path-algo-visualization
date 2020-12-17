import MinHeap from './minHeap';
import { getNeighbors, hValue } from './utils';

// Time Complexity = O(nlog(n))
export default function greedyBestFS(grid, startNode, finishNode) {
    // return this array 
    const visitedNodesInOrder = [];

    const minHeap = new MinHeap();

    // h(n) will be represented by node.distance 
    startNode.distance = hValue(startNode);

    // Time complexity = O(log(n))
    minHeap.insert(startNode);
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    
    // Time complexity = O(nlog(n))
    while(minHeap.queue.length !== 0) {
        // Time complexity = O(log(n))
        const node = minHeap.extractMin();

        if (node === finishNode) {
            return visitedNodesInOrder;
        }

        let neighbors = getNeighbors(node, grid);
        neighbors = neighbors.filter(n => !n.isVisited && !n.isWall);

        for (let neighbor of neighbors) {
            neighbor.distance = hValue(neighbor);
            neighbor.previousNode = node;
            neighbor.isVisited = true;
            visitedNodesInOrder.push(neighbor);
            minHeap.insert(neighbor);
        }
    }

    return visitedNodesInOrder;
}