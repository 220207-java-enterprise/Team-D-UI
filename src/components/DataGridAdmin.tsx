import React, {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import { Principal } from '../models/principal';
import { appClient } from '../remote/app-client';

interface IDataGridProps{
    authUser : Principal | undefined,
}


function DataGridforAdmin(props: IDataGridProps){

    const[data, setData] = useState([]);

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
            console.log(res);
            setData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }

    useEffect(()=> {
        getUserData();
    }, [])
    
    const columns = [
        {field: "user_id", headerName:"ID", width:90},
        {field: "given_name", headerName:"First Name", width:90},
        {field: "surname", headerName:"Last Name", width:90},
        {field: "email", headerName:"Email", width:90},
        {field: "active", headerName:"Is Active?", width:90},   
    ]

    // const rows = data.map((row=> ({
    //     userId: row["user_id"],
    //     firstName: row["given_name"],
    //     lastName: row["surname"],
    //     email: row["email"],
    //     isActive: row["active"]
    // })));
                        
    return (
        <div style={{height: "500px"}}>
            {/* <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            /> */}
        </div>
    )
}

export default DataGridforAdmin;