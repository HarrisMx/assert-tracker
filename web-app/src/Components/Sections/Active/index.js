import React from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';

const Active = (props) => {
  // Dummy data for the table
  const rows = [
    { assetTag: 'A1', serialNumber: 'SN20221130-MJQS', modelType: 'Laptop', displayName: 'Dell XPS', assignedTo: 'John Doe', inStore: false, state: 'In use' },
    { assetTag: 'A2', serialNumber: 'SN20221130-MJQS', modelType: 'Printer', displayName: 'HP OfficeJet', assignedTo: 'Jane Smith', inStore: true, state: 'Available' },
    { assetTag: 'A3', serialNumber: 'SN20221130-MJQS', modelType: 'Phone', displayName: 'Samsung Galaxy', assignedTo: 'Bob Johnson', inStore: false, state: 'In use' },
  ];

  return (
    <div>
        <div style={{marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', width: '50%', float: 'left' }}>
                <Button variant="contained" color="primary" onClick={props.openAddItem(true)}>Add Item</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', width: '50%', float: 'right' }}>
                <ButtonGroup variant="contained" color="primary" aria-label="export buttons">
                <Button>PDF</Button>
                <Button>EXCEL</Button>
                <Button>CSV</Button>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Active;
