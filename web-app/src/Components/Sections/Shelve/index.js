import React, {useState} from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleShelveForm, setOpenedItemId} from '../../../redux/appState/appSlice';
import AddShelve from '../Forms/AddShelve';
import { Alert } from '@mui/material';
import { ThreeDots } from  'react-loader-spinner';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  button: {
   backgroundColor:  '#303f9f',
   color: '#ffffff'
  },
  deleteButton: {
    backgroundColor:  '#f44336',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d32f2f',
    }
  },
  editButton: {
    backgroundColor:  '#3f51b5',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#303f9f',
    }
  },
}));

const Shelve = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const addItemForm = useSelector((state)=> state.app.appState);
  const addShelveForm = useSelector((state)=>state.app.appState);
  const appData = addItemForm.appData;
  
  const handleClick = () => {
    dispatch(toggleShelveForm());
  };

  const setOpenItem = (itemId) => {
    dispatch(setOpenedItemId(itemId));
  }

  const handleExport = (type) => {
    console.log(type);
    switch (type) {
      case 'csv':
        
        break;
      case 'pdf':
        
        break;
      case 'excel':
        
        break;
      default:
        break;
    }
  }

  return (
    <div>
        <div style={{marginTop: 30, justifyContent: 'center', alignShelve: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', width: '50%', float: 'left' }}>
                <Button variant="contained" onClick={handleClick} color="primary">Add Shelve</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', width: '50%', float: 'right' }}>
                <ButtonGroup variant="contained" color="primary" aria-label="export buttons">
                <Button onClick={()=>handleExport('pdf')}>PDF</Button>
                <Button onClick={()=>handleExport('excel')}>EXCEL</Button>
                <Button onClick={()=>handleExport('csv')}>CSV</Button>
                </ButtonGroup>
                <TextField label="Search" variant="outlined" size="small" style={{marginLeft: 10}} />
            </div>
        </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shelve Tag</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData ? appData.shelves.map((shelve) =>{
                return(
              <TableRow key={shelve.shelfId}>
                <TableCell>{shelve.shelfTag}</TableCell>
                <TableCell>
                    <ButtonGroup variant="contained" aria-label="action buttons">
                    <Button color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                    </ButtonGroup>
                </TableCell>
              </TableRow>
              )
            }) : 
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName="loading-icon"
                visible={true}
            />}
          </TableBody>
        </Table>
      </TableContainer>
      {addShelveForm.addShelveForm && (
        <AddShelve
          open={true}
          onSubmit={() => {
            <Alert severity="warning">
              This is a warning alert — check it out!
            </Alert>;
          }}
        />
      )}
    </div>
  );
}

export default Shelve;
