export default function animateAlgo(visitedNodesInOrder, finishNode, animationSpeed) {
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    if (visitedNodesInOrder.length === 0) 
        visitedNodesInOrder.push(null);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
            const node = visitedNodesInOrder[i];

            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }, animationSpeed * i);
    }

    if (nodesInShortestPathOrder) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await animateShortestPath(nodesInShortestPathOrder);
                resolve(true);
            }, animationSpeed * (visitedNodesInOrder.length + 1) + 300);
        });
    }
}

function animateShortestPath(nodesInShortestPathOrder) {
    let animationTime = 0;
    
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        animationTime = 10 * i;
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }, 10 * i);
    }

    return new Promise((resolve) => {
        setTimeout(() => {resolve(true);}, animationTime);
    });
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;

    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    // Cannot reach finishNode
    if (nodesInShortestPathOrder.length === 1) return false;

    return nodesInShortestPathOrder;
  }

