import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleItemForm} from '../../../redux/appState/appSlice';
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

const AddItem = ({ open, onSubmit }) => {
  const classes = useStyles();
  const [_onClose, setOnClose] = useState(false);
  const addItemForm = useSelector((state)=> state.app.appState.addItemForm);
  const baseURL = useSelector((state) => state.app.appState.baseURL);
  const [showError, setshowError] = React.useState(false);
  const dispatch = useDispatch();
  const appData = useSelector((state)=> state.app.appState.appData);

  const [values, setValues] = React.useState({
    itemTag: '',
    description: '',
    itemName: '',
    assignedTo: '',
    serialno: '',
    shelve: '',
    cost: '',
    qty: '',

  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCancel = () =>{
    dispatch(toggleItemForm());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setshowError(true);
  };

  const handleClose = () => {
    dispatch(toggleItemForm());
  };

  return (
    <Drawer
      anchor="left"
      open={addItemForm}
      onClose={handleClose}
      classes={{ paper: classes.drawer }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4" align="center">
        Add Item
      </Typography>
        <TextField
          label="Item Tag"
          name="itemTag"
          value={values.assetTag}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Name "
          name="itemName"
          value={values.modelType}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Item Description"
          name="description"
          value={values.displayName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Serial Number"
          name="serialno"
          value={values.assignedTo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Cost"
          name="cost"
          value={values.assignedTo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="qty"
          value={values.assignedTo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl className={classes.formControl} required>
          <InputLabel>Shelve</InputLabel>
          <Select
            name="shelve"
            value={values.state}
            onChange={handleChange}
          >
            {appData && appData.shelves.map((shelve) =>{
                return(
                    <MenuItem key={shelve.shelfId} value="New">{shelve.shelfTag}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
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
      {showError && (
            <Alert severity="error">
              This is a warning alert — check it out!
            </Alert>
      )}
    </Drawer>
    
  );
};

export default AddItem;
