import React, { useState, useEffect } from 'react';
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
import { toggleDeptForm, setOpenedItemId } from '../../../redux/appState/appSlice';
import AddDepartment from '../Forms/AddDepartment';
import { Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Blocks } from 'react-loader-spinner';
import './styles.css';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#303f9f',
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
  const addDepartmentForm = useSelector((state) => state.app.appState);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const appData = addDepartmentForm.appData;

  const [values, setValues] = React.useState({
    deptName: '',
    description: ''
  });

  // const addData = newData => {
  //   axios.post('/api/mydata', newData)
  //     .then(res => {
  //       setData([...data, res.data]);
  //     })
  //     .catch(err => console.log(err));
  // };


  const [tableData, setTableData] = useState([])

  const columns = [
    {
      title: "Department Name",
      field: "departmentName",
      validate: (row) => (row.departmentName || "").length < 3
        ? "Department Name must have at least 3 chars"
        : true
    },
    {
      title: "Description", field: "description",
      validate: (row) => (row.description || "").length < 3
        ? "Description must have at least 3 chars"
        : true
    },
  ]

  const getData = async () => {
    setTableData(appData.departments)
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div>
      <MaterialTable
        title="Department List"
        data={tableData}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTimeout(() => {
              const data = [...tableData, newRow];
              setTableData(data);
              resolve();
            }, 1000);
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            console.log(`newRow => ${newRow}`);
            console.log(`oldRow => ${oldRow}`);
            const updatedData = [...tableData];
            updatedData[oldRow.tableData.id] = newRow;
            setTableData(updatedData);
            setTimeout(() => resolve(), 1000);
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            const updatedData = [...tableData];
            updatedData.splice(updatedData.indexOf(oldData), 1);
            setTableData(updatedData);
            //console.log(`selectedRow => ${updatedData}`);
            setTimeout(() => resolve(), 1000);
          }),
          onRowAdd: (oldData) => new Promise((resolve, reject) => {
            
            console.log('Add');
            resolve();
          })
        }}
        options={{
          rowStyle: (data, index) => index % 2 === 0 ? { backgroundColor: "#f5f5f5" } : null,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          addRowPosition: "first",
          actionsColumnIndex: -1,
          columnsButton: true,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, `Departments List RunDate ${new Date().toLocaleDateString()}`),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, `Departments List RunDate ${new Date().toLocaleDateString()}`),
            }
          ],
        }} />
    </div>
  );
}

export default Department;
