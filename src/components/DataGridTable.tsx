import { useCallback, useEffect, useState } from 'react';
import { Principal } from '../models/principal';
import { findAllPendingByEmployee, findAllPendingByFM, findAllReimbsByFM } from '../remote/reimb-service';
import {DataGrid} from '@mui/x-data-grid';
import EditFormForFM from './EditFormForFM';
import EditFormForAdmin from "./EditFormForAdmin";
import { findAllUsers } from '../remote/user-service';

interface IDataGridProps{
    authUser : Principal | undefined,
}

function DataGridTable (props: IDataGridProps){    
    const[data, setData] = useState([]);
    const[gridRowData, setGridRowData] = useState(null);
    const[refresh, setRefresh] = useState<boolean>(false);

    useEffect(()=>{
        // let resp = await authenticate({username, password});
        // findAllPendingByFM(props.authUser?.token).then((res)=>{
        //     console.log(res.data);
        //     setData(res.data);
        // });
        if (props.authUser?.role==="ADMIN"){
            findAllUsers(props.authUser?.token).then((res)=>{
                console.log("ADMIN", res.data.providedValues);
                setData(res.data.providedValues);
            });
        }
        else if (props.authUser?.role==="FINANCE MANAGER" ){
            // findAllReimbsByFM(props.authUser?.token).then((res)=>{
            // console.log(res.data);
            // setData(res.data);
            // });
            findAllPendingByFM(props.authUser?.token).then((res)=>{
                    console.log("FINANCE MANAGER", res.data);
                    setData(res.data);
            });
        }else if (props.authUser?.role==="EMPLOYEE"){
            findAllPendingByEmployee(props.authUser?.token).then((res)=>{
                console.log("EMPLOYEE", res.data);
                setData(res.data);
            });
        }   
        
    },[props, refresh])

    
    const handleOnCellClick = (rowData:any) => {
        console.log(rowData);
        setGridRowData(rowData);
    };


    const columns:any = {
        "ADMIN":[
            {field: "Id", headerName:"ID", width:100},
            {field: "firstName", headerName:"First Name", width:200},
            {field: "lastName", headerName:"Last Name", width:200},
            {field: "email", headerName:"Email", width:200},
            {field: "isActive", headerName:"Is Active?", width:100},
            {field: "role", headerName:"Role", width:180}
        ],
        
        "FINANCE MANAGER":[
            {field: "Id", headerName:"ID", width:80},
            {field: "amount", headerName:"Amount", width:150},
            {field: "submitted", headerName:"SUBMITTED", width:150},
            {field: "resolved", headerName:"RESOLVED", width:150},
            {field: "description", headerName:"DESCRIPTION", width:150},
            {field: "receipt", headerName:"RECEIPT", width:150},
            {field: "paymentId", headerName:"PAYMENT ID", width:150},
            {field: "author", headerName:"AUTHOR", width:150},
            {field: "resolver", headerName:"RESOLVER", width:150},
            {field: "status", headerName:"STATUS", width:150},
            {field: "type", headerName:"TYPE", width:150}
        ],

        "EMPLOYEE":[
            {field: "Id", headerName:"ID", width:80},
            {field: "amount", headerName:"Amount", width:150},
            {field: "submitted", headerName:"SUBMITTED", width:150},
            {field: "resolved", headerName:"RESOLVED", width:150},
            {field: "description", headerName:"DESCRIPTION", width:150},
            {field: "receipt", headerName:"RECEIPT", width:150},
            {field: "paymentId", headerName:"PAYMENT ID", width:150},
            {field: "author", headerName:"AUTHOR", width:150},
            {field: "resolver", headerName:"RESOLVER", width:150},
            {field: "status", headerName:"STATUS", width:150},
            {field: "type", headerName:"TYPE", width:150}
        ],
    }

    const rows:any = {
        "ADMIN": data.map((row=> ({
            Id: row["user_id"],
            firstName: row["given_name"],
            lastName: row["surname"],
            email: row["email"],
            isActive: row["active"],
            role: row["role"],
        }))),

        "FINANCE MANAGER": data.map((row => ({
            Id: row["reimb_id"],
            amount: row["amount"],
            submitted: row["submitted"],
            resolved: row["resolved"],
            description: row["description"],
            receipt: row["receipt"],
            paymentId: row["payment_id"],
            author: row["author"],
            resolver: row["resolver"],
            status: row["status"],
            type: row["type"],
        }))),

        "EMPLOYEE": data.map((row => ({
            Id: row["reimb_id"],
            amount: row["amount"],
            submitted: row["submitted"],
            resolved: row["resolved"],
            description: row["description"],
            receipt: row["receipt"],
            paymentId: row["payment_id"],
            author: row["author"],
            resolver: row["resolver"],
            status: row["status"],
            type: row["type"],
        }))),

    }

    return(
        <div className='white-text container'>
            {props.authUser? <>
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
                    getRowId={(row) => row.Id}
                    rows={rows[props.authUser.role]}
                    columns={columns[props.authUser.role]}
                    pageSize={6}
                    rowsPerPageOptions={[10]}
                    autoHeight={true}
                    paginationMode='client'
                    onCellClick={(getRowId)=>{handleOnCellClick(getRowId.row)}}
                />

            </>:<>
            </>}
            

            {(gridRowData && props.authUser?.role==="ADMIN") ?
                <EditFormForAdmin refresh={refresh} setRefresh={setRefresh} gridRowData={gridRowData} setGridRowData={setGridRowData} principal={props.authUser}/> : 
                <>
                {(gridRowData && props.authUser?.role==="FINANCE MANAGER") ?
                <EditFormForFM gridRowData={gridRowData} principal={props.authUser}/>:<>
                </>}
                </>
            }
        </div>
    )
}

export default DataGridTable;