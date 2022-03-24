import React, {useState, useEffect} from 'react';
import { Principal } from '../models/principal';
import '../styles/styles.css'
import { useCookies} from 'react-cookie'
import { Navigate } from 'react-router-dom';
import { Link,useNavigate } from "react-router-dom";
import DataGridTable from './DataGridTable';
import CreateReimbursementForm from './CreateReimbursementForm';


interface IDashboardProps{
    currentUser : Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
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


    useEffect(()=> {
        !cookies.principal? navigate('/login'): props.setCurrentUser(cookies.principal)
    }, []);

    const[createMode, setCreateMode] = useState<boolean>(false);

    function showCreateForm(){
        console.log("state changed!")
        setCreateMode(true);
    }



    return(
        
        !props.currentUser ? <>Login Required!</> :
        <div className="background">

            <button className='formButton float-end m-3' onClick={handle}>Logout</button>
            {props.currentUser.role == "EMPLOYEE" ?
                <button 
                className="formButton float-end m-3" 
                type="submit"
                onClick={showCreateForm}
                >Create</button>: ""
            }

            <div className="container white-text pt-5 pb-5">
                <h3 className='pt-5'>Welcome, {props.currentUser.username}</h3>
                <p>{props.currentUser.role}</p>   
            </div>

            <DataGridTable authUser={props.currentUser}/>
            {createMode? 
            <CreateReimbursementForm setCreateMode={setCreateMode} principal={props.currentUser}  />: ""}

        </div>
    )
}
export default Dashboard;