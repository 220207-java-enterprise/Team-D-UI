import { appClient } from "./app-client";


export const findAllPendingByFM = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/find-all-pending-reimbursements-by-finance-manager', {
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const findAllReimbsByFM = async (token:string | undefined) => {
    return await appClient.get('/reimbursements/find-all-reimbursements-by-finance-manager', {
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