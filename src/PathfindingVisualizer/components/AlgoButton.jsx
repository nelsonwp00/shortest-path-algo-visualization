import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const fontStyleBtn = {
  textTransform: 'capitalize',
  fontSize: '20px',
  fontFamily: 'monospace'
};

const fontStylePop = {
  fontSize: '20px',
  fontFamily: 'monospace'
};

export default function AlgoButton(props) {
  const { algoOptions, handleAlgoInfo, canStartAlgo, performAlgo, speed } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (selectedIndex) => {
    performAlgo(selectedIndex, speed);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleAlgoInfo(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" ref={anchorRef} disabled={!canStartAlgo} aria-label="split button">
          <Button 
            onClick={() => handleClick(selectedIndex)} 
            size="medium" 
            style={fontStyleBtn}
            > 
            {algoOptions[selectedIndex]} 
          </Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon />}
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {algoOptions.map((option, index) => (
                      <MenuItem
                        style={fontStylePop}
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}