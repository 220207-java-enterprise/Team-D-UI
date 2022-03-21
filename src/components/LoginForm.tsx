import React, {SyntheticEvent, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Principal } from "../models/principal";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";

interface ILoginProps{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function LoginForm(props: ILoginProps) {

    const [formInfo, setFormInfo] = useState({
        username:"",
        password:"",
    });

    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });

        console.log(formInfo);
    }

    // TODO use this axios to send tokens
    const authAxios = axios.create({
        baseURL: 'http://localhost:8080/technology-project',
        headers:{
            'Accept':'application/json',
            'Authorization': `${props.currentUser?.token}`
        },
        //prevents Axios from throwing an error if the response status is anything other than 200-900
        validateStatus:() => true
    })

    const submitHandler= (e:SyntheticEvent)=>{
        e.preventDefault();
        authAxios
            .post("/auth", formInfo)
            .then((res) => {
                if (res.data.status===400 || res.data.status===401){
                    console.log(res.data);
                    setErrorMsg(res.data.message);
                } 

                // store token to local storage
                window.localStorage.setItem("token", res.headers["authorization"]);
                // add token to Principal object
                const authUser = {...res.data, token:res.headers["authorization"]};
                props.setCurrentUser(authUser);
                navigate("/dashboard");

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
                        value={formInfo.username}
                        placeholder="enter username..." 
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