import { getNeighbors } from './utils'; 

export default function BFS(grid, startNode, finishNode) {
    // return this array
    const visitedNodesInOrder = [];

    const queue = [];

    startNode.isVisited = true;
    startNode.distance = 0;
    queue.push(startNode);
    visitedNodesInOrder.push(startNode);

    while (queue.length !== 0) {
        const node = queue.shift();

        let neighbors = getNeighbors(node, grid);
        neighbors = neighbors.filter(n => !n.isVisited && !n.isWall);

        for (let neighbor of neighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.isVisited = true;
            neighbor.previousNode = node;
            queue.push(neighbor);
            visitedNodesInOrder.push(neighbor);

            if (neighbor === finishNode) {
                return visitedNodesInOrder;
            }
        }
    }

    return visitedNodesInOrder;

}
