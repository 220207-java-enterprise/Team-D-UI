import React, {useState} from "react";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [givenName, setGivenName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister=()=>{
        let roleSelect = document.getElementById("role-select") as HTMLSelectElement;
        let selectIndex = roleSelect.selectedIndex;
        let role = roleSelect.options[selectIndex].value;

        console.log(role);
    }
    return (
      <div className="text-center">
        <h1>Weclome to the Register Page</h1>
        
        <form className="form-signin" >
                <label>Username: </label>
                <input type="text" required value={username} placeholder="username" 
                    onChange={(e)=> setUsername(e.target.value)}
                /><br/>

                <label>Email: </label>
                <input type="text" required value={email} placeholder="email" 
                    onChange={(e)=> setEmail(e.target.value)}
                /><br/>

                <label>GivenName: </label>
                <input type="text" required value={givenName} placeholder="givenName" 
                    onChange={(e)=> setGivenName(e.target.value)}
                /><br/>

                <label>Surname: </label>
                <input type="text" required value={surname} placeholder="surname" 
                    onChange={(e)=> setSurname(e.target.value)}
                /><br/>

                <label>Password: </label>
                <input type="text" required value={password} placeholder="password" 
                    onChange={(e)=> setPassword(e.target.value)}
                /><br/>

                <select id="role-select" className="form-select form-select-sm" style={{width:"120px"}}>
                    <option value="EMPLOYEE"> Employee </option>
                    <option value="FINANCE MANAGER"> Finance Manager </option>
                </select>

                <button className="btn btn-primary" type="submit" onClick={handleRegister} >
                    Register
                </button>

            </form>
            <Link to="/">Already a member? Sign in.</Link>
      </div>
    );
  }
  
  export default Register;