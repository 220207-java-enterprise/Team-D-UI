import axios from "axios";
import React, {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Principal } from "../models/principal";
import { appClient } from "../remote/app-client";
import '../styles/styles.css'
import ErrorMessage from "./ErrorMessage";

interface IDataGridProps{
    gridRowData : any | undefined,
    principal : Principal | undefined,
    setData: (newUserData: any | undefined) => void
}

function EditForm(props: IDataGridProps) {
    const [formInfo, setFormInfo] = useState({
        userId: props.gridRowData.userId,
        password: null,
        role: props.gridRowData.role,
        active: props.gridRowData.isActive,
    });

    console.log(props.gridRowData);

    console.log("TOKEN", props.principal?.token);

    // console.log("GRID ROW DATA: ", gridRowData.gridRowData);
    // console.log("TOKEN", principal);

    const [errorMsg, setErrorMsg] = useState("");

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });
    }

    const submitHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        appClient
            .put("/users", formInfo, {headers:{'Authorization': props.principal?.token!}})
            .then((res) => {
                if (res.data.status===400){
                    console.log(res.data)
                    setErrorMsg(res.data.message)
                } else{
                    console.log(res)
                }
            })
            .catch((err) => {
                console.log(err);
              });
    }

    useEffect(()=> {
        setFormInfo({
            userId: props.gridRowData.userId,
            password: null,
            role: props.gridRowData.role,
            active: props.gridRowData.isActive
        }
        )
    }, [props])

    
    

    return (
        <div className="">
          <h3 className="pt-5">Edit</h3>
          <form
              className=""
              onSubmit={submitHandler}
          >
              <div className="">
              <h5 className="white-text">Making changes for {props.gridRowData.firstName} {props.gridRowData.lastName}:</h5>
                            
                  <div className="d-flex justify-content-center">
                        <div className="form-group m-3">
                            <label className="white-text">Change Password:</label>
                            <input
                                name="password" 
                                type="text"  
                                placeholder="edit password..." 
                                className="form-control" 
                                onChange={changeHandler}
                                />
                        </div>

                        <div className="form-group m-3">
                            <label className="white-text">Select Active:</label>
                            <select
                                name="active" 
                                onChange={changeHandler} 
                                id="active-select" 
                                className="form-select form-select">
                                <option value={props.gridRowData.isActive}> 
                                    {props.gridRowData.isActive? "True":"False"} 
                                </option>
                                <option value={String(!props.gridRowData.isActive)}> 
                                    {props.gridRowData.isActive? "False":"True"} 
                                </option>
                            </select>
                        </div>
                        
                        <div className="form-group m-3">
                            <label className="white-text">Select Role:</label>
                            <select
                                name="role" 
                                onChange={changeHandler} 
                                id="role-select" 
                                className="form-select form-select">
                                    <option selected={props.gridRowData.role === "ADMIN"} value={"ADMIN"}>ADMIN</option>
                                    <option selected={props.gridRowData.role === "FINANCE MANAGER"} value={"FINANCE MANAGER"}>FINANCE MANAGER</option>
                                    <option selected={props.gridRowData.role === "EMPLOYEE"} value={"EMPLOYEE"}>EMPLOYEE</option>
                                {/* <option value={props.gridRowData.role}> 
                                    {props.gridRowData.role==="FINANCE MANAGER"? "FINANCE MANAGER":"EMPLOYEE"}
                                </option> */}

                            </select>
                        </div>
                    </div>
                  <input 
                      className="btn-lg btn-warning" 
                      type="submit"
                      value="Edit"
                  />
              </div>                
          </form>
  
  
          {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
        </div>
      );
    }
    
    export default EditForm;
