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
            {props.currentUser.role == "EMPLOYEE" ? <input 
                                                    className="btn-lg btn-primary" 
                                                    type="submit"
                                                    value="Create"
                                                    onSubmit=
                                            /> : ""}
            {createMode? 
            <CreateReimbursementForm 
            createMode={createMode} setCreateMode={setCreateMode}/>: ""}
        </div>
    )
}
export default Dashboard;