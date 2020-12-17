import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: '17px',
    fontWeight: 'normal',
    fontFamily: 'monospace',
  },
}));

export default function Time(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { time } = props; 
  const moreInfo = 
    'Running time is a key measure of algorithm performance.'+
    'It highly depends on time complexity.';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const buttonStyle = {
    maxWidth: '100%', 
    maxHeight: '100%', 
    minWidth: '90%', 
    minHeight: '90%',
    textTransform: 'capitalize',
    fontSize: '18px',
    fontWeight: 'normal',
    fontFamily: 'monospace'
  };

  return (
    <div>
      <Button style={buttonStyle} aria-describedby={id} variant="contained" onClick={handleClick}>
        {time}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography className={classes.typography}>{moreInfo}</Typography>
      </Popover>
    </div>
  );
}
