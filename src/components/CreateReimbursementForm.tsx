import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { appClient } from "../remote/app-client";
import { createNewReimbursement } from "../remote/reimb-service";
import '../styles/styles.css'
import ErrorMessage from "./ErrorMessage";
import { Principal } from '../models/principal'

interface ICreateReimbursementFormProps {
    principal : Principal | undefined,
    //createMode : boolean | undefined,
    setCreateMode: (createForm: any | undefined) => void
}

function CreateReimbursementForm(props: ICreateReimbursementFormProps) {



    const [formInfo, setFormInfo] = useState({
        amount: "",
        description: "",
        reimbursementType: "LODGING",
        receipt: null
    });

  

    const [errorMsg, setErrorMsg] = useState("");

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });

        console.log(formInfo);
    }

   
    const submitHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        console.log(formInfo);
        
        createNewReimbursement(props.principal?.token, formInfo).then((res)=>{
            if(res.status != 201) {
                setErrorMsg("You did a bad thing")
                return
            }
            console.log(res);
            props.setCreateMode(false);
        })
    } 


    return (

        <div className="mt-3">
        <form
            onSubmit={submitHandler}
        >
            <h3 className="white-text">New Reimbursement Form</h3>
            <div className="d-flex justify-content-center">
                <div className="form-group m-3">
                <label className="white-text">Amount:</label>
                    <input 
                        name="amount"
                        type="text" 
                        required
                        value={formInfo.amount}
                        placeholder="enter amount..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group m-3">
                <label className="white-text">Description:</label>
                    <input
                        name="description" 
                        type="textbox" 
                        required 
                        value={formInfo.description}
                        placeholder="enter description..." 
                        className="form-control" 
                        onChange={changeHandler}
                    />
                </div>
                
                <div className="form-group m-3">
                <label className="white-text">Select Type:</label>
                    <select
                        name="reimbursementType" 
                        onChange={changeHandler} 
                        id="type-select" 
                        className="form-select form-select-">
                        <option value="LODGING"> 
                            LODGING 
                        </option>
                        <option value="TRAVEL">
                            TRAVEL
                        </option>
                        <option value="FOOD">
                            FOOD
                        </option>
                        <option value="OTHER">
                            OTHER
                        </option>
                    </select>
                </div>
            </div>    
            <input
                    className="formButton" 
                    type="submit"
                    value="Create"
                />            
        </form>

        {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
      </div>

    );

}

export default CreateReimbursementForm;