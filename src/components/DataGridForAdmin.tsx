import React, {useState, useEffect} from 'react';
import {DataGrid, GridFilterModel, GridLinkOperator} from '@mui/x-data-grid';
import axios from 'axios';
import { Principal } from '../models/principal';
import { appClient } from '../remote/app-client';
import { createStyles, makeStyles } from '@mui/material';
import EditForm from './EditForm';

interface IDataGridProps{
    authUser : Principal | undefined,
}


function DataGridForAdmin(props: IDataGridProps){

    const[data, setData] = useState([]);
    const[gridRowData, setGridRowData] = useState(null);

    // TODO use this axios to send tokens
    const authAxios = axios.create({
        baseURL: 'http://localhost:8080/technology-project',
        headers:{
            'Accept':'application/json',
            'Authorization': `${props.authUser?.token}`
        },
        //prevents Axios from throwing an error if the response status is anything other than 200-900
        validateStatus:() => true
    })
    
    const getUserData = ()=>{ 
        
    console.log(props.authUser?.token)
        authAxios
            .get("/users")
            .then((res)=> {
            console.log(res.data.providedValues);
            setData(res.data.providedValues);
            })
            .catch((err)=>{
                console.log(err);
            });
        }

    useEffect(()=> {
        getUserData();
    }, [])


    const handleOnCellClick = (rowData:any) => {
        console.log(rowData);
        setGridRowData(rowData);
      };

    const columns = [
        {field: "userId", headerName:"ID", width:100},
        {field: "firstName", headerName:"First Name", width:200},
        {field: "lastName", headerName:"Last Name", width:200},
        {field: "email", headerName:"Email", width:300},
        {field: "role", headerName:"Role", width:180},
        {field: "isActive", headerName:"Is Active?", width:180, type: 'boolean'},
    ]

    const rows = data.map((row=> ({
        userId: row["user_id"],
        firstName: row["given_name"],
        lastName: row["surname"],
        email: row["email"],
        isActive: row["active"],
        role: row["role"],
    })));
                        
    return (
        <div className='white-text container' /*style={{height: "500px"}}*/> All Users
            {
                <DataGrid
                    sx={{
                        width: '100%',
                        color:'black',
                        backgroundColor: 'whitesmoke',
                        display:'in-line',
                        justifyContent:'space-between',
                        borderRadius: 2,
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'whitesmoke', '& .MuiDataGrid-cell:hover': {color: 'purple',},
                    }}
                    getRowId={(row) => row.userId}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    autoHeight={true}
                    paginationMode='client'
                    onCellClick={(getRowId)=>{handleOnCellClick(getRowId.row)}}
                />

            }
            {gridRowData?
             <EditForm gridRowData={gridRowData} principal={props.authUser}/> : <></>}
        </div>
    )
}

export default DataGridForAdmin;