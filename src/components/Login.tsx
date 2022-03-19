import React, {SyntheticEvent, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Principal } from "../models/principal";
import { authenticate } from "../remote/auth-service";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function Login(props: ILoginProps) {

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

    const handleLogin = async ()=>{
        try{
            let resp = await authenticate({username, password});
            
            if (resp.status === 400) {
                setErrorMsg('Invalid username or password provided!');
            }

            if (resp.status === 401) {
                setErrorMsg('No user found with provided credentials!');
            }

            if (resp.status === 201) {
                let authUser = await resp.data;
                console.log(authUser);
                props.setCurrentUser(authUser);
                navigate('/dashboard');
            }

        }catch(e:any){
            console.log(e.message);
        }
    }

    return (
        <div className="text-center">
            <h1>Weclome to the Login Page</h1>

            <div className="form-signin">
                <label>Username: </label>
                <input type="text" id="username"  placeholder="Username" 
                    onChange={updateUsername}
                /><br/>

                <label>Password: </label>
                <input type="text" id="password"  placeholder="Password" 
                    onChange={updatePassword}
                /><br/>

                <button className="btn btn-primary" type="submit" id="login-button" onClick={handleLogin} >
                    Login
                </button>
            </div>

            <Link to="/register">Not a member? Register Here.</Link>
            <br/>
            {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
        </div>
    );
}

export default Login;