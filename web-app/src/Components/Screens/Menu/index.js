import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

function MenuScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.button}>
        Department
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Item
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Shelve
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Item transfer
      </Button>
    </div>
  );
}

export default MenuScreen;
