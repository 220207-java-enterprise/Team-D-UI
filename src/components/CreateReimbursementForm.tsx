import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { appClient } from "../remote/app-client";
import '../styles/styles.css'
import ErrorMessage from "./ErrorMessage";

interface ICreateReimbursementFormProps {
    setCreateMode: (createForm: any | undefined) => void
}

function CreateReimbursementForm(props: ICreateReimbursementFormProps) {

    const [formInfo, setFormInfo] = useState({
        amount: 0,
        description: "",
        reimbursementType: "OTHER",
        receipt: null
    });

  

    const [errorMsg, setErrorMsg] = useState("");



    return (
        <div className="background">
        <h1>Enter Reimbursement Details:</h1>
        <form
            className="container d-flex justify-content-around"
            // onSubmit={submitHandler}
        >

            <div className="justify-content-center">
                <div className="form-group m-3">
                    <input 
                        name="amount"
                        type="number" 
                        required
                        value={formInfo.amount}
                        placeholder="enter amount..." 
                        className="form-control" 
                        // onChange={changeHandler}
                    />
                </div>

                <div className="form-group m-3">
                    <input
                        name="description" 
                        type="textbox" 
                        required 
                        value={formInfo.description}
                        placeholder="enter description..." 
                        className="form-control" 
                        // onChange={changeHandler}
                    />
                </div>
                

                
                <div className="form-group m-3">
                    <h3 className="white-text">Select Type:</h3>
                    <select
                        name="reimbursementType" 
                        // onChange={changeHandler} 
                        id="type-select" 
                        className="form-select form-select-lg">
                        <option value="LODGING"> 
                            Lodging 
                        </option>
                        <option value="TRAVEL">
                            Travel
                        </option>
                        <option value="FOOD">
                            Food
                        </option>
                        <option value="OTHER">
                            Other
                        </option>
                    </select>
                </div>

                <input 
                    className="btn-lg btn-primary" 
                    type="submit"
                    value="Create"
                    //onClick= { props.setCreateMode(!props.createMode)}
                />
            </div>                
        </form>

        {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
      </div>

    );

}

export default CreateReimbursementForm;