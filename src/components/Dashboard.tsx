import React, {useState, useEffect} from 'react';
import { Principal } from '../models/principal';
import '../styles/styles.css'
import DataGridTable from './DataGridTable';
import CreateReimbursementForm from './CreateReimbursementForm';

interface IDashboardProps{
    currentUser : Principal | undefined,
}


function Dashboard(props: IDashboardProps){

    const[createMode, setCreateMode] = useState<boolean>(false);

    function showCreateForm(){
        console.log("state changed!")
        setCreateMode(true);
    }


    return(
        !props.currentUser ? <>Login Required!</> :
        <div className="background">
            
            <h1 className="page-heading pt-5">Dashboard</h1>
            <div className="container white-text">
                <h3>Welcome, {props.currentUser.username}</h3>
               
                <h4>{props.currentUser.role} #{props.currentUser.id}</h4>
                <p>{props.currentUser.token}</p>
            </div>
            <DataGridTable authUser={props.currentUser}/>
            {props.currentUser.role == "EMPLOYEE" ?
                <button 
                className="btn-lg btn-primary" 
                type="submit"
                onClick={showCreateForm}
                >Create</button>: ""}
            {createMode? 
            <CreateReimbursementForm setCreateMode={setCreateMode} createMode={undefined}/>: ""}
        </div>
    )
}
export default Dashboard;