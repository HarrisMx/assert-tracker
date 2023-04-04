import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ConstructionIcon from '@mui/icons-material/Construction';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/userState/userSlice';
import Alert from '@mui/material/Alert';


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
  container: {
    width: '100%',
    height: '100px',
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

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async () => {
    setShowError(false);
    console.log("Logging in");
        try {
            const response = await axios.post('https://atracking.azurewebsites.net/api/Account/login', JSON.stringify({
              email: email,
              password: password
            }),
            {headers: {
                'content-type': 'application/json'
            }});
            console.log(response.data);
            dispatch(setUser(response.data))
            return response.data;
        } catch (error) {
            console.error(error);
            setShowError(true);
            setError(error.message);
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
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} name="rememberMe" />}
          label="Remember Me"
        />
        <Button className={classes.signInButton} onClick={handleLogin} variant="contained">Sign In</Button>
        <Button className={classes.signInButton} variant="contained">Sign Up</Button>
      </form>
      </div>
    </div>
  );
};

export default LoginForm;
