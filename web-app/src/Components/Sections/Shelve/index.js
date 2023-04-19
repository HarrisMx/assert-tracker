import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShelveForm, setOpenedItemId } from '../../../redux/appState/appSlice';
import AddShelve from '../Forms/AddShelve';
import { Alert } from '@mui/material';
import { Blocks } from 'react-loader-spinner';
import './styles.css';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";


const Shelve = (props) => {
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const addItemForm = useSelector((state) => state.app.appState);
  const addShelveForm = useSelector((state) => state.app.appState);
  const appData = addItemForm.appData;

  const handleClick = () => {
    dispatch(toggleShelveForm());
  };

  const setOpenItem = (itemId) => {
    dispatch(setOpenedItemId(itemId));
  }

  const [tableData, setTableData] = useState([]);

  const getData = async () => {
    setTableData(appData.shelves);
  }

  useEffect(() => {
    getData();
  }, [])

  const columns = [
    {
      title: "Shelve Tag",
      field: "shelfTag",
      validate: (row) => (row.shelfTag || "").length < 3
        ? "Shelve Tag must have at least 3 chars"
        : true,
    }
  ];

  return (
    <>
      <MaterialTable
        title="Shelve List"
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
            const updatedData = [...tableData];
            updatedData[oldRow.tableData.id] = newRow;
            setTableData(updatedData);
            setTimeout(() => resolve(), 1000);
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            const updatedData = [...tableData];
            updatedData.splice(updatedData.indexOf(oldData), 1);
            setTableData(updatedData);
            setTimeout(() => resolve(), 1000);
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
                ExportPdf(cols, datas, `Shelve List RunDate ${new Date().toLocaleDateString()}`),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, `Shelve List RunDate ${new Date().toLocaleDateString()}`),
            }
          ],
        }}
      />
    </>
  );
}

export default Shelve;
