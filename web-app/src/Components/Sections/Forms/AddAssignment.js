import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleDeptForm} from '../../../redux/appState/appSlice';
import {
  Drawer,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import { Alert } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '40%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: '16px',
  },
}));

const AddAssignment = ({ open, onSubmit }) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(open);
  const [_onClose, setOnClose] = useState(false);
  const addAssignmentForm = useSelector((state)=> state.app.appState.addAssignmentForm);
  const baseURL = useSelector((state) => state.app.appState.baseURL);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const [values, setValues] = React.useState({
    deptName: '',
    description: ''
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCancel = () =>{
    dispatch(toggleDeptForm());
  }

  const handleClose = () =>{
    dispatch(toggleDeptForm());
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    setShowError(false);
    const token = localStorage.getItem('jwt');

    try {
      const response = await axios.post(`${baseURL}/Assignment`, JSON.stringify({
        AssignmentName: values.deptName,
        description: values.description
      }),
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      console.log(response.data);
      dispatch(toggleDeptForm());
    } catch (error) {
      console.error(error);
      setShowError(true);
      setError(error.message);
    }

    setSubmitSuccess(true);
  };

  return (
    <Drawer
      anchor="left"
      open={addAssignmentForm}
      onClose={handleClose}
      classes={{ paper: classes.drawer }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4" align="center">
        Add Assignment
      </Typography>
        <TextField
          label="Assignment Name"
          name="deptName"
          value={values.deptName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Add Assignment
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="#ff0000"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
      {submitSuccess && (
            <Alert severity="error">
              {error}
            </Alert>
      )}
    </Drawer>
    
  );
};

export default AddAssignment;
