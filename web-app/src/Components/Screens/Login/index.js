import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ConstructionIcon from '@mui/icons-material/Construction';

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
  },
  signInButton: {
    backgroundColor: 'tomato',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkred',
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className={`${classes.root} ${classes.center}`}>
        {/* <ConstructionIcon className={classes.logo} /> */}
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
        <Button className={classes.signInButton} variant="contained">Sign In</Button>
      </form>
    </div>
  );
};

export default LoginForm;
