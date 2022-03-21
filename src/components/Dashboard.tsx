import React, {useState, useEffect} from 'react';
import { Principal } from '../models/principal';
import '../styles/styles.css'
import DataGridforAdmin from './DataGrid';
import ErrorMessage from "./ErrorMessage";
import {logout} from "../remote/auth-service"

interface IDashboardProps{
    currentUser : Principal | undefined,
}

function Dashboard(props: IDashboardProps){
    let [authUser, setAuthUser] = useState<Principal>();

    console.log(authUser);
    
    return(
        !props.currentUser ? <>Login Required!</> :
        <div className="background">
            <h1 className="page-heading pt-5">Dashboard</h1>
            <div className="container white-text">
                <h3>Welcome, {props.currentUser.username}</h3>
                <h4>{props.currentUser.role} #{props.currentUser.id}</h4>
                <p>{props.currentUser.token}</p>
            </div>
            {props.currentUser.role === "ADMIN"?
                <DataGridforAdmin authUser={authUser}></DataGridforAdmin>
                : ""
            }
        </div>
    )
}
export default Dashboard;