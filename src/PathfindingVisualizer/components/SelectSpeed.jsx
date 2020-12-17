import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const fontStyle = {
    fontFamily: 'monospace',
    fontSize: '18px'
}

export default function SelectSpeed(props) {
    const handleSpeedChange = props.handleSpeedChange;

    return (
        <Grid container alignItems="center">
            <Grid style={fontStyle}>Normal</Grid>
            <Switch onChange={handleSpeedChange} color="default"/>
            <Grid style={fontStyle}>Fast</Grid>
        </Grid>
    );
}
