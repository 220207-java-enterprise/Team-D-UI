import React, {SyntheticEvent, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Principal } from "../models/principal";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { useCookies} from 'react-cookie';

interface ILoginProps{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function LoginForm(props: ILoginProps) {
    const [cookies, setCookie] = useCookies(["principal"]);

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

    // TODO use this axios to send tokens (maybe look into modularizing this logic)
    const authAxios = axios.create({
        baseURL: 'http://localhost:8080/technology-project',
        headers:{
            'Accept':'application/json',
        },
        //prevents Axios from throwing an error if the response status is anything other than 200-900
        validateStatus:() => true
    })

    const submitHandler= (e:SyntheticEvent)=>{
        e.preventDefault();
        authAxios
            .post("/auth", formInfo)
            .then((res) => {
                if (res.data.status===400 || res.data.status===403){
                    console.log(res.data);
                    setErrorMsg(res.data.message);
                } 
                if (res.data.status === 500){
                    setErrorMsg(res.data.message);
                }
                console.log(res);
                if (res.status===201){
                    // // store token to local storage
                    // window.localStorage.setItem("token", res.headers["authorization"]);
                    // add token to Principal object
                    const authUser = {...res.data, token:res.headers["authorization"]};
                    props.setCurrentUser(authUser);
                    console.log(res.headers["authorization"]);
                    setCookie("principal", authUser, {path: "/"});
                    navigate("/dashboard");
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
            className="container d-flex justify-content-around mb-3"
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
                        type="password" 
                        required 
                        value={formInfo.password}
                        placeholder="enter password..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>

                <input 
                    className="formButton" 
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