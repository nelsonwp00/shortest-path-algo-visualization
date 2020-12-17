import MinHeap from './minHeap';
import { getNeighbors, hValue } from './utils';
import gridInfo from '../PathfindingVisualizer/grid';

const { NUM_ROW, NUM_COL } = gridInfo;

// Time Complexity = O(nlog(n))
export default function aStar(grid, startNode, finishNode) {
    // return this array 
    const visitedNodesInOrder = [];

    // Time complexity = O(n)
    const gValue = Array(NUM_ROW * NUM_COL).fill(Infinity);

    const minHeap = new MinHeap();

    // f(n) will be represented by node.distance 
    startNode.distance = 0;
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    gValue[startNode.nodeIndex] = 0;

    // Time complexity = O(log(n))
    minHeap.insert(startNode);

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
            const currentIndex = neighbor.nodeIndex;
            const edgeWeight = 1;
            const tentativeG = gValue[node.nodeIndex] + edgeWeight;

            if (tentativeG < gValue[currentIndex]) {
                gValue[currentIndex] = tentativeG;
                neighbor.previousNode = node;
                neighbor.isVisited = true;
                visitedNodesInOrder.push(neighbor);

                neighbor.distance = gValue[currentIndex] + hValue(neighbor);
                
                // Time complexity = O(log(n))
                minHeap.insert(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}