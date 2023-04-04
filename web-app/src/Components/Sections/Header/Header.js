import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Home from '../../Screens/Home';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#262626',
    position: 'static',
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  Home: {
    color: 'white',
    textDecoration: 'none',
  },
  button: {
    marginRight: '30px',
    color: 'white',
  },
  spacer: {
    flexGrow: 1,
  },
}));

function Header() {
    const classes = useStyles();
    const [isLogged, setIsLogged] = useState(false);
    const user = useSelector((state)=> state.user.user);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Asset Management
          </Typography>
          <div className={classes.spacer} />
          {user.displayName? 
            <>
            <Button className={classes.button} to="/profile">
                Profile
            </Button>
            <Button className={classes.button} sto="/logout">
                Logout
            </Button>
            <Button className={classes.button} sto="/logout">
                {user.displayName}
            </Button>
            </>
          : 
          null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
