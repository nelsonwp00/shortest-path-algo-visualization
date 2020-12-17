import { getAllEdges } from './utils'; 
import gridInfo from '../PathfindingVisualizer/grid';

const { NUM_ROW, NUM_COL, NUM_NODE } = gridInfo;

export default function bellmanFord(grid, startNode, finishNode) {
    // return this array
    const visitedNodesInOrder = [];

    

    // Time Complexity = O(|E|)
    const edges = getAllEdges(grid);

    startNode.distance = 0;

    for (let row = 0; row < NUM_ROW; row++) {
        for (let col = 0; col < NUM_COL; col++) {
            let node = grid[row][col];
            if (!node.isWall) {
                node.isVisited = true;
                visitedNodesInOrder.push(node);
            }
        }
    }

    for (let i = 1; i < NUM_NODE - 1; i++) {
        for (let edge of edges) {
            const { u, v, weight } = edge;

            // Bellman Ford Algorithm is designed for solving problems
            // in weighted directed graph. But the grid is undirected,
            // therefore one more 'else if' condition is required. 
            if (u.distance + weight < v.distance) {
                v.distance = u.distance + weight;
                v.previousNode = u;
            }
            else if (v.distance + weight < u.distance) {
                u.distance = v.distance + weight;
                u.previousNode = v;
            }
        }
    }
    return visitedNodesInOrder;
}