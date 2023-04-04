import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/userState/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '32ch',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  image:{
    width: '120px',
    height: '11vh'
  },
  signInButton: {
    backgroundColor: '#303f9f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
    width: '100%',
  },
  logo: {
    width: '100px',
    height: '100px',
    marginBottom: theme.spacing(3),
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [display, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirn_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  }

  const handleRegister = async () => {
    setShowError(false);
    if (password === confirn_password){
        try {
            const response = await axios.post('https://atracking.azurewebsites.net/api/Account/register', JSON.stringify({
              email: email,
              password: password,
              displayName: display,
              username: display,
              addressLine1: 'addressLine1'
            }),
            {headers: {
                'content-type': 'application/json'
            }});
            dispatch(setUser(response.data))
            return response.data;
          } catch (error) {
            console.error(error);
            setShowError(true);
            setError(error.message);
          }
    }else{
        setShowError(true);
        setError("Passwords does not match!")
    }
  }

  return (
    <div className={`${classes.root} ${classes.center}`}>
        {showError &&
            <Alert severity="error">{error}</Alert>
        }
        <br/>
        <div className={`${classes.center} ${classes.image}`}>      
        <img src="https://www.nicepng.com/png/detail/794-7947233_sam-icon-software-asset-management-icon.png" alt="SAM Icon" className={classes.logo} />
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="display_name"
          label="Display Name"
          type="text"
          value={display}
          onChange={handleDisplayNameChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="confirm_password"
          label="Confirm Password"
          type="password"
          value={confirn_password}
          onChange={handleConfirmPassword}
        />
        <Button className={classes.signInButton} onClick={handleRegister} variant="contained">Sign Up</Button>
        <Button className={classes.signInButton} variant="contained">Sign In</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
