import { Principal } from "../models/principal";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {deleteReimbursement, updateReimbursement} from "../remote/reimb-service"
import ErrorMessage from "./ErrorMessage";
import { responsiveProperty } from "@mui/material/styles/cssUtils";

interface IDataGridProps{
    refresh: boolean | undefined,
    setRefresh: (refreshPage: any | undefined) => void
    gridRowData : any | undefined,
    principal : Principal | undefined,
    setGridRowData: (RemoveRowData: any | undefined) => void
}

function EditFormForEmployee(props: IDataGridProps) {

    const [formInfo, setFormInfo] = useState({
        reimbursementId: props.gridRowData.Id,
        amount: props.gridRowData.amount,
        description: props.gridRowData.description,
        reimbursementType: props.gridRowData.type,
        receipt: null,
    });

    const [errorMsg, setErrorMsg] = useState("");

    const changeHandler = (e:SyntheticEvent) =>{
        setFormInfo({
            ...formInfo,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        });
    }

    const editHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        
        updateReimbursement(props.principal?.token, formInfo).then((res)=>{
            if(res.status === 500){
                setErrorMsg("Sent bad request");
                return;
            }
            if(res.status === 400){
                setErrorMsg(res.data.message);
                return;
            }
            console.log(res);
            props.setRefresh(!props.refresh);
            props.setGridRowData(null);
        })
    }

    const recallHandler=(e:SyntheticEvent)=>{
        e.preventDefault();
        
        deleteReimbursement(props.principal?.token, {id: props.gridRowData.Id}).then((res)=>{
            console.log(res);
            props.setRefresh(!props.refresh);
            props.setGridRowData(null);
        })
    }

    useEffect(()=> {
        setFormInfo({
            reimbursementId: props.gridRowData.Id,
            amount: props.gridRowData.amount,
            description: props.gridRowData.description,
            reimbursementType: props.gridRowData.type,
            receipt: null,
        }
        )
    }, [props])


    return(
        props.gridRowData.status !== "PENDING"? <></>:
<div className="mt-3">
        <form
            onSubmit={editHandler}
        >
            <h3 className="white-text">Edit Reimbursement Form</h3>
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
                    className="formButton m-3" 
                    type="submit"
                    value="Update"
                />            
        </form>

        {props.gridRowData.status==="PENDING"? 
        <button onClick={recallHandler} className="formButton m-3">Recall Reimbursement</button>:
        <></>}
        {errorMsg? <ErrorMessage errorMessage={errorMsg}/> : <></>}
      </div>

    );

}

export default EditFormForEmployee;