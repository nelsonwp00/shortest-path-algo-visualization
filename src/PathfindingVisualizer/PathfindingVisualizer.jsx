import React, {useEffect, useState, useRef} from 'react';
import gridInfo from './grid';
import Node from './components/Node/Node';
import algorithms from '../algorithms/algorithms';
import animateAlgo from './animation';
import Nav from './components/Nav/Nav';
import Paper from '@material-ui/core/Paper';

import './PathfindingVisualizer.css';

const { 
  NUM_ROW,
  NUM_COL,
  START_NODE_ROW, 
  START_NODE_COL, 
  FINISH_NODE_ROW, 
  FINISH_NODE_COL,
  getInitialGrid
} = gridInfo;

const algoOptions = [
  'A* Search Algorithm',
  'Bellman-Ford Algorithm',
  'Breadth-first Search(BFS)', 
  'Depth-first Search(DFS)', 
  'Dijkstra\'s Algorithm',
  'Greedy Best-first Search'
];


const { aStar, bellmanFord, BFS, DFS, dijkstra, greedyBestFS } = algorithms;

export default function PathfindingVisualizer() {
  const mouseIsPressed = useRef(false);
  const visitedNodes = useRef([]);
  const [grid, setGrid] = useState(getInitialGrid());
  const [algoSelected, setAlgoSelected] = useState({
    name: 'A* Search Algorithm', 
    optimal: 'can', 
    timeclpx: 'https://wikimedia.org/api/rest_v1/media/math/render/svg/393f923dec17cb0b4ef211b01b2fe2ab2578c7a8'
  });
  const [canStartAlgo, setCanStartAlgo] = useState(true);
  const [disableClear, setDisableClear] = useState(false);
  const [runTime, setRunTime] = useState(0);

  useEffect(() => {}, [grid, canStartAlgo, disableClear, algoSelected, runTime])

  function handleMouseDown(row, col) {
    mouseIsPressed.current = true;
    const node = grid[row][col];
    node.isWall = !node.isWall;
    if (node.isWall) {
      document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
    }
    else {
      document.getElementById(`node-${row}-${col}`).className = 'node';
    }
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed.current) return;
    const node = grid[row][col];
    node.isWall = !node.isWall;
    if (node.isWall) {
      document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
    }
    else {
      document.getElementById(`node-${row}-${col}`).className = 'node';
    }
  }

  function handleMouseUp() {
    mouseIsPressed.current = false;
  }

  function handleClearPath() {
    let newGrid = grid.slice();

    for (let row = 0; row < NUM_ROW; row++) {
      for (let col = 0; col < NUM_COL; col++) {
        let node = newGrid[row][col];
        if (node.isVisited) {
          document.getElementById(`node-${row}-${col}`).className = 'node';
          node.isVisited = false;
        }
        node.distance = Infinity;
        node.previousNode = null;
      }
    }

    setGrid(newGrid);
    setRunTime(0);
    setCanStartAlgo(true);
  }

  function handleClearAll() {
    for (let row of grid) {
      for (let node of row) {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      }
    }
    setGrid(getInitialGrid());
    setRunTime(0);
    setCanStartAlgo(true);
  }

  function handleAlgoInfo(selectedIndex) {
    const algoName = algoOptions[selectedIndex];
    let optimal = 'can';
    let timeclpx;

    switch (selectedIndex) {
      case 0: 
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/393f923dec17cb0b4ef211b01b2fe2ab2578c7a8';
        break;
      case 1:
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/0465422c67bedf2d1659571f5797b3c9c54ed9ad';
        break;
      case 2:
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/a7cf317fbe3965ae3164f28c1f6858696adb23f4';
        break;
      case 3:
        optimal = 'cannot';
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/a7cf317fbe3965ae3164f28c1f6858696adb23f4';
        break;
      case 4:
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/e22162be85d06b346f3b7f7aad9746da0c1019c9';
        break;
      case 5:
        optimal = 'cannot';
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/9d2320768fb54880ca4356e61f60eb02a3f9d9f1';
        break;
      default: 
        timeclpx = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/393f923dec17cb0b4ef211b01b2fe2ab2578c7a8';
        break;
    }

    setAlgoSelected({name: algoName, optimal: optimal, timeclpx: timeclpx});
  }

  async function performAlgo(selectedIndex, animationSpeed) {
    setCanStartAlgo(false);
    setDisableClear(true);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let selectedAlgo = undefined;

    switch (selectedIndex) {
      case 0: 
        selectedAlgo = aStar;
        break;
      case 1:
        selectedAlgo = bellmanFord;
        animationSpeed -= 1;
        break;
      case 2:
        selectedAlgo = BFS;
        break;
      case 3:
        selectedAlgo = DFS;
        break;
      case 4:
        selectedAlgo = dijkstra;
        break;
      case 5:
        selectedAlgo = greedyBestFS;
        break;
      default: 
        selectedAlgo = aStar;
        break;
    }

    const t0 = performance.now();
    const visitedNodesInOrder = selectedAlgo(grid, startNode, finishNode);
    const t1 = performance.now();
    
    setRunTime(((t1 - t0)).toPrecision(4));

    visitedNodes.current = visitedNodesInOrder;

    await animateAlgo(visitedNodesInOrder, finishNode, animationSpeed);

    setDisableClear(false);
  }

  return (
    <>
      <div className='container'>
        <Nav 
          handleAlgoInfo={handleAlgoInfo}
          algoOptions={algoOptions}
          canStartAlgo={canStartAlgo}
          disableClear={disableClear}
          performAlgo={performAlgo}
          handleClearPath={handleClearPath}
          handleClearAll={handleClearAll} 
          runTime={runTime}
        />
        <Paper elevation={0} className='header-note'>
            {algoSelected.name}
            <span className='header-span'>{algoSelected.optimal} garantee</span> 
            the optimal solution. 
            Time complexity =   
            <img 
              className='header-time-complexity'
              src={algoSelected.timeclpx} 
              alt="time complexity"
            />
        </Paper>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map(node => {
                const {row, col, nodeIndex, isFinish, isStart, isWall} = node;
                return (
                    <Node
                      key={nodeIndex}
                      index={nodeIndex}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                      ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
