import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useSelector } from 'react-redux';

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
  const addDepartmentForm = useSelector((state) => state.app.appState);
  const appData = addDepartmentForm.appData;
  const [tableData, setTableData] = useState([])
  const columns = [
    { title: "Department Name", field: "departmentName" },
    { title: "Description", field: "description" },
  ]

  const getData = async () => {
    setTableData(appData.departments)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <MaterialTable style={{width : '1200'}}
        title="Department List"
        data={tableData}
        editable={true}
        columns={columns} options={{
          rowStyle :(data,index)=> index % 2 === 0 ? {backgroundColor: "#f5f5f5"}: null,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          columnsButton: true,
          exportAllData : true,
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
            },
          ],
        }} />
    </>
  );
}

export default Department;
