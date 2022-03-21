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

    const getUserData = ()=>{ 
        appClient
            .get("/users")
            .then((res)=> {
            console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            });
        }

    useEffect(()=> {
        getUserData();
    }, [])
    

                        
    return (
        <div>DataGrid</div>
    )
}

export default DataGridforAdmin;