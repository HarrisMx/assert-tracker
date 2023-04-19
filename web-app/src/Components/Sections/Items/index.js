import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const Items = (props) => {
  const appState = useSelector((state)=> state.app.appState);
  const appData = appState.appData;
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Asset Tag",
      field: "itemTag",
      validate: (row) => (row.itemTag || "").length < 5
        ? "Asset Tag must have at least 3 chars"
        : true,
    },
    {
      title: "Serial Number",
      field: "serialno",
      validate: (row) => (row.serialno || "").length < 3
        ? "Serial Number must have at least 3 chars"
        : true,
    },
    {
      title: "Name",
      field: "name",
      validate: (row) => (row.name || "").length < 3
        ? "Nami must have at least 3 chars"
        : true,
    },
    {
      title: "Description",
      field: "description",
      validate: (row) => (row.description || "").length < 3
        ? "Description must have at least 3 chars"
        : true,
    },
    {
      title: "Quantity",
      field: "qty",
      validate: (row) => Number.isInteger(row.qty)
        ? "Quantity must be a number"
        : true,
    }
  ];

  const getData = async () => {
    setTableData(appData.items);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
        <MaterialTable
        title="Items List"
        data={appData? appData.items : []}
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
            console.log(updatedData);
            updatedData[oldRow.tableData.id] = newRow;
            setTableData(updatedData);
            setTimeout(() => resolve(), 1000);
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            const updatedData = [...tableData];
            console.log(updatedData);
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

export default Items;
