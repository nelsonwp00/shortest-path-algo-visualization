import gridInfo from '../PathfindingVisualizer/grid';

const { NUM_ROW, NUM_COL, FINISH_NODE_ROW, FINISH_NODE_COL } = gridInfo;

function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) 
      neighbors.push(grid[row - 1][col]); // UP
  
    if (row < grid.length - 1) 
      neighbors.push(grid[row + 1][col]); // DOWN
  
    if (col > 0) 
      neighbors.push(grid[row][col - 1]); // LEFT
  
    if (col < grid[0].length - 1) 
      neighbors.push(grid[row][col + 1]); // RIGHT
  
    return neighbors;
}

function getAllEdges(grid) {
  const edges = [];

  for (let row = 0; row < NUM_ROW; row++) {
    for (let col = 0; col < NUM_COL; col++) {
      let u = grid[row][col];

      if (col !== NUM_COL - 1) { // not rightmost
        let v = grid[row][col + 1];
        if (!(u.isWall || v.isWall)) {
          const edgeHorizontal = { u, v, weight: 1, isVisited: false };
          edges.push(edgeHorizontal);
        }
      }
      if (row !== NUM_ROW - 1) { // not bottom
        let v = grid[row + 1][col];
        if (!(u.isWall || v.isWall)) {
          const edgeVertical = { u, v, weight: 1, isVisited: false };
          edges.push(edgeVertical);
        }
      }
    }
  }

  return edges;
}

function hValue(node) {
    const h = Math.abs(node.row - FINISH_NODE_ROW) + Math.abs(node.col - FINISH_NODE_COL);
    return h;
}




export { getAllNodes, getNeighbors, getAllEdges, hValue };