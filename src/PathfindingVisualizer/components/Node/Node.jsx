import React from 'react';
import AdjustIcon  from '@material-ui/icons/Adjust';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './Node.css';

const Node = (props) => {
  const {
    index, 
    row,
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  } = props;

  const extraClassName = isWall ?
    'node-wall' : isStart ?
    'node-start' : isFinish ?
    'node-finish': '';

  const content = isStart ?
    <AdjustIcon className='startIcon' style={{ width: '100%', height: '100%'}}/> : isFinish ?
    <HighlightOffIcon className='finishIcon' style={{ width: '100%', height: '100%' }}/> : '';

  const component = (isStart || isFinish) ? 
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}>
      {content}
    </div> 
    :
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}>
      {content}
    </div>
    ;
    
  return component;
}

export default Node;
