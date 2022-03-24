import axios from "axios";
import React, {SyntheticEvent, useEffect, useState} from "react";
import { Principal } from "../models/principal";
import { updateUser } from "../remote/user-service";
import '../styles/styles.css'
import ErrorMessage from "./ErrorMessage";

interface IDataGridProps{
    refresh: boolean | undefined,
    setRefresh: (refreshPage: any | undefined) => void
    gridRowData: any | undefined,
    principal : Principal | undefined,
    setGridRowData: (RemoveRowData: any | undefined) => void
}

function EditFormForAdmin(props: IDataGridProps) {
    const [formInfo, setFormInfo] = useState({
        userId: props.gridRowData.Id,
        password: null,
        role: props.gridRowData.role,
        active: props.gridRowData.isActive,
    });


    const [errorMsg, setErrorMsg] = useState("");

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });
    }

    const submitHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        console.log(formInfo);
        
        updateUser(props.principal?.token, formInfo).then((res)=>{
            console.log(res);
            
            if (res.data.status == 400){
                setErrorMsg(res.data.message);
                return;
            }
            props.setRefresh(!props.refresh);
            props.setGridRowData(null);
        })
    }

    useEffect(()=> {
        setFormInfo({
            userId: props.gridRowData.Id,
            password: null,
            role: props.gridRowData.role,
            active: props.gridRowData.isActive
        }
        )
    }, [props])

    
    

    return (
        <div>
          <form
              onSubmit={submitHandler}
          >
              <div>
              <h5 className="white-text mt-3">Making changes for {props.gridRowData.firstName} {props.gridRowData.lastName}:</h5>       
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
                            </select>
                        </div>
                    </div>
                  <input 
                      className="formButton" 
                      type="submit"
                      value="Edit"
                  />
              </div>                
          </form>
  
  
          {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
        </div>
      );
    }
    
    export default EditFormForAdmin;
