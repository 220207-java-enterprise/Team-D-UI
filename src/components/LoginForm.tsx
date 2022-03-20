import React, {SyntheticEvent, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Principal } from "../models/principal";
import { appClient } from "../remote/app-client";
import { authenticate } from "../remote/auth-service";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function LoginForm(props: ILoginProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    let updateUsername =(e:SyntheticEvent)=>{
        setUsername((e.target as HTMLInputElement).value);
    }
    let updatePassword =(e:SyntheticEvent)=>{
        setPassword((e.target as HTMLInputElement).value);
    }
    const submitHandler= (e:SyntheticEvent)=>{
        e.preventDefault();
        appClient
            .post("/auth", {username, password}, { headers: { 'Content-Type' : 'application/json' }})
            .then((res) => {
                if (res.data.status===400 || res.data.status===401){
                    console.log(res.data);
                    setErrorMsg(res.data.message);
                } else{
                    console.log(res.data);
                    props.setCurrentUser(res.data);
                    navigate("/dashboard")
                }
            })
            .catch((err)=>{
                console.log(err);
            });

    }

    return (
        <div className="background">
        <h1 className="page-heading pt-5">Login Form</h1>
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
                        value={username}
                        placeholder="enter username..." 
                        className="form-control" 
                        onChange={updateUsername}
                    />
                </div>

                <div className="form-group m-3">
                    <input
                        name="password" 
                        type="text" 
                        required 
                        value={password}
                        placeholder="enter password..." 
                        className="form-control" 
                        onChange={updatePassword}
                    />
                </div>

                <input 
                    className="btn-lg btn-primary" 
                    type="submit"
                    value="Login"
                />
            </div>                
        </form>

            <Link to="/register">Not a member? Register Here.</Link>
            <br/>
            {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
        </div>
    );
}

export default LoginForm;