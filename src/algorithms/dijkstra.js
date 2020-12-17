import { getNeighbors } from './utils';
import MinHeap from './minHeap';

export default function dijkstra(grid, startNode, finishNode) {
  // return this array 
  const visitedNodesInOrder = [];

  const minHeap = new MinHeap();

  startNode.distance = 0;

  // Time Complexity = O(log(v))
  minHeap.insert(startNode);

  // Time Complexity = O(|E| + |V|log(|V|))
  while (minHeap.queue.length !== 0) {
    
    // Time Complexity = O(log(v))
    const node = minHeap.extractMin();

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node.distance === Infinity || node === finishNode) {
      return visitedNodesInOrder;
    }

    // Time Complexity = O(e)
    let neighbors = getNeighbors(node, grid);
    neighbors = neighbors.filter(n => !n.isWall);


    for (const neighbor of neighbors) {
      let edgeWeight = 1;
      const distance = node.distance + edgeWeight;

      // Relaxation
      // Time Complexity = O(log(v))
      if (distance < neighbor.distance ) {
        neighbor.distance = distance;
        neighbor.previousNode = node;
        minHeap.insert(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}
