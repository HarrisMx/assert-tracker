import React, {useState} from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleItemForm, setOpenedItemId} from '../../../redux/appState/appSlice';
import AddItem from '../Forms/AddItem';
import { Alert } from '@mui/material';
import { Blocks } from  'react-loader-spinner';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  button: {
   backgroundColor:  '#303f9f',
   color: '#ffffff'
  }
}));

const Items = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const appState = useSelector((state)=> state.app.appState);
  const openedItemId  = appState.openedItemId;
  const appData = appState.appData;
  const addItemForm = appState.addItemForm;

  console.log(appData);

  const handleClick = () => {
    dispatch(toggleItemForm());
  };

  const setOpenItem = (itemId) => {
    console.log(itemId);
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
        <div style={{marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', width: '50%', float: 'left' }}>
                <Button variant="contained" onClick={handleClick} color="primary">Add Item</Button>
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
              <TableCell>Asset Tag</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData ? appData.items.map((data) =>{
              return(
              <TableRow key={data.itemId}>
                <TableCell>{data.itemTag}</TableCell>
                <TableCell>{data.serialno}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.qty}</TableCell>
                <TableCell>
                  <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenItem(data.itemId)}
                    >
                      View
                    </Button>
                </TableCell>
              </TableRow>
              )
            }): 
            
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
            }
          </TableBody>
        </Table>
      </TableContainer>
      {addItemForm && (
        <AddItem
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

export default Items;
