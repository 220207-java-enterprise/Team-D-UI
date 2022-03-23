import React, {useState, useEffect} from 'react';
import { Principal } from '../models/principal';
import '../styles/styles.css'
import DataGridforAdmin from './DataGridForAdmin';
import { useCookies} from 'react-cookie'
import { Navigate } from 'react-router-dom';
import { Link,useNavigate } from "react-router-dom";

interface IDashboardProps{
    currentUser : Principal | undefined,
}

function Dashboard(props: IDashboardProps){
    let [authUser, setAuthUser] = useState<Principal>();
    console.log(props.currentUser);

    const [cookies, setCookie, removeCookie] = useCookies(["principal"]);

    function handle(){
        removeCookie("principal");
        navigate('/login')
    }
    const navigate = useNavigate();

    return(
        !props.currentUser ? <>Login Required!</> :
        <div className="background">

<header><button onClick={handle}>Remove Cookie</button></header>
            <h1 className="page-heading pt-5">Dashboard</h1>
            <div className="container white-text">
                <h3>Welcome, {props.currentUser.username} </h3>
                <h4>{props.currentUser.role} #{props.currentUser.id}</h4>
                <p>{props.currentUser.token}</p>
                
            </div>
            {props.currentUser.role === "ADMIN"?
                <DataGridforAdmin authUser={props.currentUser}></DataGridforAdmin>
                : ""
            }
                        
        </div>
    )
}
export default Dashboard;