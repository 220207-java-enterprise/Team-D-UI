import { Principal } from "../models/principal";
import { appClient } from "./app-client";

export const authenticate = async(credential:{username:string, password:string})=>{
    return await appClient.post<Principal>('/auth', credential,
        {headers:{'Content-Type':'application/json'}
    });
}

export const logout = (setCurrentUser: (nextUser:Principal | undefined)=> void)=>{
    setCurrentUser(undefined);
}