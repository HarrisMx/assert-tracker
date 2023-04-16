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
import axios from 'axios';
import { Blocks } from  'react-loader-spinner';
import '../../Sections/Items/styles.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  dateSelector:{
    fontSize: '.9em',
    padding: '0.5em',
    margin: '0.5em'
  }
}));

const AddItem = ({ open, onSubmit }) => {
  const classes = useStyles();
  const addItemForm = useSelector((state)=> state.app.appState.addItemForm);
  const baseURL = useSelector((state) => state.app.appState.baseURL);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [showSpinner, setShwowSpinner] = useState(false);
  const dispatch = useDispatch();
  const appData = useSelector((state)=> state.app.appState.appData);

  const [values, setValues] = useState({
    itemTag: '',
    description: '',
    itemName: '',
    assignedTo: '',
    serialno: '',
    shelve: '',
    cost: '',
    qty: '',
    datePurchased: new Date()
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, datePurchased: date });
  }

  const handleShelveChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, shelve: e.target.value });
  }

  const handleCancel = () =>{
    dispatch(toggleItemForm());
  }

  const handleSubmit = async (event) => {
    setShwowSpinner(true);
    event.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    let timeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    try {
      const token = localStorage.getItem('jwt');
      let formdata = {
        itemTag: values.itemName,
        description: values.description,
        name: values.itemName,
        serialno: values.serialno,
        shelve: values.shelve,
        cost: values.cost,
        datePurchased: timeStamp,
        qty: values.qty,
        timeStamp: timeStamp,
        dueforRepair : true,
        createdById: "Mxolisi"
      };
      console.log(formdata);
      const response = await axios.post(`${baseURL}/Items`, JSON.stringify(formdata),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      console.log(response.data);
      dispatch(toggleItemForm());
      setShwowSpinner(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
      setShowError(true);
      setShwowSpinner(false);
    }
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
          value={values.itemTag}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Name "
          name="itemName"
          value={values.itemName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Item Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Serial Number"
          name="serialno"
          value={values.serialno}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Cost"
          name="cost"
          value={values.cost}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="qty"
          value={values.qty}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl className={classes.formControl} required>
          <DatePicker className={classes.dateSelector} name='datePurchased' selected={values.datePurchased} onChange={(date)=> handleDateChange(date)} />
        </FormControl>
        <FormControl className={classes.formControl} required>
          <InputLabel>Shelve</InputLabel>
          <Select
            name="shelve"
            value={values.shelve}
            onChange={(shelve) => handleShelveChange(shelve)}
          >
            {appData && appData.shelves.map((shelve) =>{
                return(
                    <MenuItem key={shelve.shelfId} value={shelve.shelfId}>{shelve.shelfTag}</MenuItem>
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
              {error}
            </Alert>
      )}
      {showSpinner && (
        <Blocks 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName="loading-icon"
        visible={true}
        />
      )}
    </Drawer>
    
  );
};

export default AddItem;
