import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShelveForm } from '../../../redux/appState/appSlice';
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

const AddShelve = ({ open, onSubmit }) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(open);
  const [_onClose, setOnClose] = useState(false);
  const addShelveForm = useSelector((state) => state.app.appState.addShelveForm);
  const baseURL = useSelector((state) => state.app.appState.baseURL);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const [values, setValues] = React.useState({
    shelveTag: '',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    dispatch(toggleShelveForm());
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    setShowError(false);
    const token = localStorage.getItem('jwt');

    try {
      const response = await axios.post(`${baseURL}/ShelveTypes`, JSON.stringify({
        shelfTag: values.shelveTag
      }),
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      console.log(response.data);
      dispatch(toggleShelveForm());
      return response.data;
    } catch (error) {
      console.error(error);
      setShowError(true);
      setError(error.message);
    }

    setSubmitSuccess(true);
  }

  const handleClose = () => {
    dispatch(toggleShelveForm());
  }

  useEffect(() => {
    console.log(addShelveForm);
  }, [])


  return (
    <Drawer
      anchor="left"
      open={addShelveForm}
      onClose={handleClose}
      classes={{ paper: classes.drawer }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">
          Add Shelve
        </Typography>
        <TextField
          label="Shelve Tag"
          name="shelveTag"
          value={values.shelveTag}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Item
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

export default AddShelve;
