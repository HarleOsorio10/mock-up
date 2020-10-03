import React from 'react';
import MUIDataTable from "mui-datatables";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
export default function SimpleTable(props) {
    const { data, setData, setOpen, setSelectedRow } = props;
  const columns = [
        {
            name: "Firstname",
            label: "Firstname",
            options:{
                search:true,
                }
        }, 
        {
            name: "Lastname",
            label: "Lastname",
            options:{
                search:true,
                }
        }, 
        {
            name: "Email",
            label: "Email",
            options:{
                search:true,
                }
        },
        {
            name: "Actions",
            label: " ",
            options:{
                customBodyRender: (value, tableMeta, updateValue) => {
                    let id = props.targetLabel + tableMeta.columnIndex;
                    return (
                    <>
                    <Tooltip
                        title="Update"
                        placement="top"
                        style={{ marginRight: "10px" }}
                    >
                        <IconButton
                        id={id + tableMeta.rowData[0] + tableMeta.rowIndex}
                        size="small"
                        onClick={e=>{setOpen(true); setSelectedRow(tableMeta.rowIndex)}}
                        >
                        <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                    </>
                    );
                },
            }
        }
    ];

  const options = {
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
    responsive: "standard",
    rowsPerPage: 10,
    onRowsDelete: (rowsDeleted, newData) => {
        const updatedData = newData.map(row => {
            return {"Firstname": row[0], "Lastname": row[1], "FirstnamEmaile": row[2] }
        });
        setData(updatedData);
      },
    };
  return (

    
    <MUIDataTable 
      title={"Contact Info's"} 
      data={data} 
      columns={columns} 
      options={options} 
    />
  );
}