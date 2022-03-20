import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { appClient } from "../remote/app-client";
import '../styles/styles.css'
import ErrorMessage from "./ErrorMessage";

function RegisterForm() {

    const [formInfo, setFormInfo] = useState({
        username:"",
        email:"",
        givenName:"",
        surname:"",
        password:"",
        role:"EMPLOYEE",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });

        console.log(formInfo);
    }

    const submitHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        appClient
            .post("/users", formInfo)
            .then((res) => {
                if (res.data.status===400){
                    console.log(res.data)
                    setErrorMsg(res.data.message)
                } else{
                    console.log(res)
                    navigate("/login")
                }
            })
            .catch((err) => {
                console.log(err);
              });
    }

    return (
      <div className="background">
        <h1 className="page-heading pt-5">Register Form</h1>
        <form
            className="container d-flex justify-content-around"
            onSubmit={submitHandler}
        >

            <div className="justify-content-center">
                <div className="form-group m-3">
                    <input 
                        name="username"
                        type="text" 
                        required
                        value={formInfo.username}
                        placeholder="enter username..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group m-3">
                    <input
                        name="email" 
                        type="text" 
                        required 
                        value={formInfo.email}
                        placeholder="enter email..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>
                
                <div className="form-group m-3">
                    <input
                        name="givenName" 
                        type="text" 
                        required 
                        value={formInfo.givenName}
                        placeholder="enter first name..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group m-3">
                    <input
                        name="surname" 
                        type="text" 
                        required 
                        value={formInfo.surname}
                        placeholder="enter last name..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>
                
                <div className="form-group m-3">
                    <input
                        name="password" 
                        type="text" 
                        required 
                        value={formInfo.password}
                        placeholder="enter password..." 
                        className="form-control" 
                        onChange={changeHandler}
                        />
                </div>
                
                <div className="form-group m-3">
                    <h3 className="white-text">Select Role:</h3>
                    <select
                        name="role" 
                        onChange={changeHandler} 
                        id="role-select" 
                        className="form-select form-select-lg">
                        <option value="EMPLOYEE"> 
                            Employee 
                        </option>
                        <option value="FINANCE MANAGER">
                            Finance Manager
                        </option>
                    </select>
                </div>

                <input 
                    className="btn-lg btn-primary" 
                    type="submit"
                    value="Register"
                />
            </div>                
        </form>
        <Link to="/login">Already a member? Sign in.</Link>

        {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
      </div>
    );
  }
  
  export default RegisterForm;