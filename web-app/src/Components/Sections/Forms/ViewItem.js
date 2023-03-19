import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSideForm} from '../../../redux/appState/appSlice';
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

const ViewItem = ({ open, onSubmit }) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(open);
  const [_onClose, setOnClose] = useState(false);
  const openSideForm = useSelector((state)=> state.app.appState.openSideForm);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    assetTag: '',
    modelType: '',
    displayName: '',
    assignedTo: '',
    inStore: '',
    state: '',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCancel = () =>{
    dispatch(toggleSideForm());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setSubmitSuccess(true);
  };

  return (
    <Drawer
      anchor="left"
      open={openSideForm}
      onClose={_onClose}
      classes={{ paper: classes.drawer }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4" align="center">
        Add Item
      </Typography>
        <TextField
          label="Asset Tag"
          name="assetTag"
          value={values.assetTag}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Model Type"
          name="modelType"
          value={values.modelType}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Display Name"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Assigned To"
          name="assignedTo"
          value={values.assignedTo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl className={classes.formControl} required>
          <InputLabel>In Store</InputLabel>
          <Select
            name="inStore"
            value={values.inStore}
            onChange={handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} required>
          <InputLabel>State</InputLabel>
          <Select
            name="state"
            value={values.state}
            onChange={handleChange}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Fair">Fair</MenuItem>
            <MenuItem value="Poor">Poor</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="danger"
        >
          Delete
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
            <Alert severity="warning">
              This is a warning alert — check it out!
            </Alert>
      )}
    </Drawer>
    
  );
};

export default ViewItem;
