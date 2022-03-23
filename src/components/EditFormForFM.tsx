import { Principal } from "../models/principal";


interface IDataGridProps{
    gridRowData : any | undefined,
    principal : Principal | undefined,
}

function EditFormForFM(props: IDataGridProps) {
    return(
        <div style={{"backgroundColor":"gray"}}>
            <p>{props.gridRowData.Id}</p>
        </div>
    )
}

export default EditFormForFM;