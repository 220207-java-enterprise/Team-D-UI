import { Principal } from "../models/principal";
import { ApproveReimbsByFM, DenyReimbsByFM } from "../remote/reimb-service";


interface IDataGridProps{
    refresh: boolean | undefined,
    setRefresh: (refreshPage: any | undefined) => void,
    gridRowData : any | undefined,
    principal : Principal | undefined,
    setGridRowData: (RemoveRowData: any | undefined) => void
}

function EditFormForFM(props: IDataGridProps) {

    const handleApprove =()=>{
        console.log("approve");
        
        ApproveReimbsByFM(props.principal?.token, {reimbursementId:props.gridRowData?.Id, approve:true}).then((res)=>{
            console.log(res);
            props.setRefresh(!props.refresh);
            props.setGridRowData(null);
        })
    }
    const handleDeny =()=>{
        DenyReimbsByFM(props.principal?.token, {reimbursementId:props.gridRowData?.Id, approve:false}).then((res)=>{
            console.log(res);
            props.setRefresh(!props.refresh);
            props.setGridRowData(null);
        })
    }
    return(
        <div className="card" style={{"backgroundColor":"gray","width":"20rem"}}>
            <div className="card-body">
                <h5 className="card-title">Pending Reimbursement</h5>
                <p className="card-text">Author: {props.gridRowData.author}</p>
                <p className="card-text">Amount: ${props.gridRowData.amount}  Type: {props.gridRowData.type}</p>
                <p className="card-text">Description: {props.gridRowData.description}</p>
                <p className="card-text">Submitted: {props.gridRowData.submitted}</p>
                
                <button className="btn btn-primary" onClick={handleApprove}>Approve</button> <b/>
                <button className="btn btn-primary" onClick={handleDeny}>Deny</button>
            </div>
        </div>
    )
}

export default EditFormForFM;