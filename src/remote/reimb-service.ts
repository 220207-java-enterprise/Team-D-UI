import { BackdropProps } from "@mui/material";
import { appClient } from "./app-client";


export const findAllPendingByFM = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/find-all-pending-reimbursements-by-finance-manager', {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const findAllReimbsByFM = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/find-all-reimbursements', {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const ApproveReimbsByFM = async (token:string | undefined, ApproveOrDeny:{reimbursementId:string|undefined, approve:boolean|undefined }) => {
    return await appClient.put(`/reimbursements/approve-or-deny/${ApproveOrDeny.reimbursementId}`, ApproveOrDeny, {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const DenyReimbsByFM = async (token:string | undefined, ApproveOrDeny:{reimbursementId:string|undefined, approve:boolean|undefined }) => {
    return await appClient.put(`/reimbursements/approve-or-deny/${ApproveOrDeny.reimbursementId}`, ApproveOrDeny, {
        headers: {
            'Authorization': `${token}`
        }
    });
}



export const findAllPendingByEmployee = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/employee/all-pending-reimbursements', {
        headers: {
            'Authorization': `${token}`
        }
    });
}
export const findAllReimbsByEmployee = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/employee/all-reimbursements', {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const createNewReimbursement = async (token: string | undefined, body: object | undefined) => {
    return await appClient.post('/reimbursements/employee/reimbursement', body, {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const updateReimbursement = async (token: string | undefined, body: object | undefined) => {
    return await appClient.put('/reimbursements/employee/reimbursement', body, {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const deleteReimbursement = async (token: string | undefined, body: object | undefined) => {
    return await appClient.delete('/reimbursements/employee/recall-pending-reimbursement',
        { data: body, headers: { 'Authorization': `${token}` } })
}