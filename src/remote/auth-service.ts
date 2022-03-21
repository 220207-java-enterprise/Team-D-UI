import { Principal } from "../models/principal";
import { appClient } from "./app-client";


export const logout = (setCurrentUser: (nextUser:Principal | undefined)=> void)=>{
    setCurrentUser(undefined);
}

export const isAuth=()=>{
    
}