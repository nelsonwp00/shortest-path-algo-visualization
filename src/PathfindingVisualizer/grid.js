const NUM_ROW = 27;
const NUM_COL = 54;
const NUM_NODE = NUM_ROW * NUM_COL;
const START_NODE_ROW = 3;
const START_NODE_COL = 3;
const FINISH_NODE_ROW = 22;
const FINISH_NODE_COL = 48;

const createNode = (row, col) => {
    return {
      row,
      col,
      nodeIndex: row * NUM_COL + col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
};

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROW; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COL; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
};


export default { 
  NUM_ROW, 
  NUM_COL, 
  NUM_NODE,
  START_NODE_ROW, 
  START_NODE_COL, 
  FINISH_NODE_ROW, 
  FINISH_NODE_COL,
  getInitialGrid,
};