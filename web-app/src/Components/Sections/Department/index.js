import React, {useState} from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import {toggleDeptForm, setOpenedItemId} from '../../../redux/appState/appSlice';
import AddDepartment from '../Forms/AddDepartment';
import { Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  button: {
   backgroundColor:  '#303f9f',
   color: '#ffffff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
  },
}));

const Department = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const addDepartmentForm = useSelector((state)=> state.app.appState);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [values, setValues] = React.useState({
    deptName: '',
    description: ''
  });
  // Dummy data for the table
  const rows = [
    { assetTag: 'A1', serialNumber: 'SN20221130-MJQS', modelType: 'Laptop', displayName: 'Dell XPS', assignedTo: 'John Doe', inStore: false, state: 'In use', action: 'Update/Delete' },
    { assetTag: 'A2', serialNumber: 'SN20221130-MJQS', modelType: 'Printer', displayName: 'HP OfficeJet', assignedTo: 'Jane Smith', inStore: true, state: 'Available', action: 'Update/Delete' },
    { assetTag: 'A3', serialNumber: 'SN20221130-MJQS', modelType: 'Phone', displayName: 'Samsung Galaxy', assignedTo: 'Bob Johnson', inStore: false, state: 'In use', action: 'Update/Delete' },
  ];

  const handleClick = () => {
    dispatch(toggleDeptForm());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const setOpenItem = (itemId) => {
    dispatch(setOpenedItemId(itemId));
    console.log(addDepartmentForm.openedItemId);
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
        <div style={{marginTop: 30, justifyContent: 'center', alignDepartment: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', width: '50%', float: 'left' }}>
                <Button variant="contained" onClick={handleClick} color="primary">Add Department</Button>
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
              <TableCell>Department Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.assetTag}>
                <TableCell>{row.assetTag}</TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>
                    <ButtonGroup variant="contained" aria-label="action buttons">
                    <Button onClick={handleOpenDialog} color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                    </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addDepartmentForm.addDepartmentForm && (
        <AddDepartment
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

export default Department;
