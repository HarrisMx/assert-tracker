import React, {useState} from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSideForm, setOpenedItemId} from '../../../redux/appState/appSlice';
import AddItem from '../../Sections/Forms/AddItem';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  button: {
   backgroundColor:  '#303f9f',
   color: '#ffffff'
  }
}));

const Active = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const openSideForm = useSelector((state)=> state.app.appState);
  
  // Dummy data for the table
  const rows = [
    { assetTag: 'A1', serialNumber: 'SN20221130-MJQS', modelType: 'Laptop', displayName: 'Dell XPS', assignedTo: 'John Doe', inStore: false, state: 'In use', action: 'Update/Delete' },
    { assetTag: 'A2', serialNumber: 'SN20221130-MJQS', modelType: 'Printer', displayName: 'HP OfficeJet', assignedTo: 'Jane Smith', inStore: true, state: 'Available', action: 'Update/Delete' },
    { assetTag: 'A3', serialNumber: 'SN20221130-MJQS', modelType: 'Phone', displayName: 'Samsung Galaxy', assignedTo: 'Bob Johnson', inStore: false, state: 'In use', action: 'Update/Delete' },
  ];

  const handleClick = () => {
    dispatch(toggleSideForm());
  };

  const setOpenItem = (itemId) => {
    dispatch(setOpenedItemId(itemId));
    console.log(openSideForm.openedItemId);
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
              <TableCell>Model Type</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>In Store</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.assetTag}>
                <TableCell>{row.assetTag}</TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>{row.modelType}</TableCell>
                <TableCell>{row.displayName}</TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell>{row.inStore ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>
                  <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenItem(row.assetTag)}
                    >
                      View
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openSideForm.openSideForm && (
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

export default Active;
