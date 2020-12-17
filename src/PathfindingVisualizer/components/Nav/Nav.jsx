import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Time from '../Time';
import NodeDemo from '../Node/NodeDemo';
import AlgoButton from '../AlgoButton';
import SelectSpeed from '../SelectSpeed';

import AdjustIcon  from '@material-ui/icons/Adjust';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './Nav.css';

export default function Nav(props) {
    const { 
        handleAlgoInfo,
        algoOptions,
        canStartAlgo,
        disableClear,
        performAlgo, 
        handleClearPath,
        handleClearAll, 
        runTime 
    } = props;
    const [speed, setSpeed] = React.useState(8);

    const handleSpeedChange = () => {
        // Normal = 8. Fast = 4

        if (speed === 8) {
            setSpeed(4);
        } else {
            setSpeed(8);
        }
    }

    const styleBtn = {
        width: '8em',
        padding: '1px',
        textTransform: 'capitalize',
        fontSize: '18px',
        fontWeight: '500',
        fontFamily: 'monospace'
    };

    const margin_right = {marginRight: '5%'};

    const time = `Time: ${runTime}ms`;

    return (
        <Box className='nav-bar' p={2}>

            <Box className='algo-picker'>
                <AlgoButton 
                    algoOptions={algoOptions}
                    handleAlgoInfo={handleAlgoInfo} 
                    canStartAlgo={canStartAlgo} 
                    performAlgo={performAlgo} 
                    speed={speed}
                />
            </Box>

            <Box className='algo-clear'>
                <Button variant="contained" style={styleBtn} onClick={handleClearPath} disabled={disableClear}>
                    Clear Path
                </Button>
                <Button variant="contained" style={styleBtn} onClick={handleClearAll} disabled={disableClear}>
                    Clear All
                </Button>
            </Box>

            <Box className='select-speed'>
                <SelectSpeed handleSpeedChange={handleSpeedChange}/>
            </Box>

            <Box className='algo-performance'>
                <Time time={time}/>
            </Box>

            <Box className='nodes-container'>
                <Box className="node-display node-display-icon">
                    <Box className="node-content"><AdjustIcon style={margin_right}/> Start </Box>
                    <Box className="node-content"><HighlightOffIcon style={margin_right}/> End </Box>
                </Box>
                <Box className="node-display">
                    <Box className="node-content">
                        <NodeDemo extraClassName={'node-wall'}/>
                        Wall Node
                    </Box>
                    <Box className="node-content">
                        <NodeDemo extraClassName={'node-visited'}/>
                        Visited Node
                    </Box>
                    <Box className="node-content">
                        <NodeDemo extraClassName={'node-shortest-path'}/>
                        Shortest Path
                    </Box>
                </Box>
            </Box>

        </Box>
    )
};