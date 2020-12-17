import { getNeighbors } from './utils';

export default function DFS(grid, startNode, finishNode) {
    // return this array
    const visitedNodesInOrder = [];

    const stack = [];

    startNode.distance = 0;
    stack.unshift(startNode);

    while(stack.length !== 0) {
        const node = stack.shift();
        node.isVisited = true;
        visitedNodesInOrder.push(node);

        if (node === finishNode) {
            return visitedNodesInOrder;
        }

        let neighbors = getNeighbors(node, grid);
        neighbors = neighbors.filter(n => !n.isVisited && !n.isWall);

        for(let neighbor of neighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
            stack.unshift(neighbor);
        }
    }

    return visitedNodesInOrder;
}