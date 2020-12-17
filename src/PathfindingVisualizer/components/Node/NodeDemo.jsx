import React from 'react';

import './Node.css';

const NodeDemo = (props) => {
  const { extraClassName } = props;

  const component =  
    <div
      id={`${extraClassName}-demo`}
      className={`node-demo ${extraClassName}`}>
    </div> 
    ;
    
  return component;
}

export default NodeDemo;