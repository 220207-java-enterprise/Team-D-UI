import { appClient } from "./app-client";
import { User } from "../models/user"

export const getAllUsers = async () =>{
    // returns a pomise of an axios response with User object
    return await appClient.get<User>('/users');
}

export const register = (userInfo:object) => {
    // TODO implement axios call to POST /users
}

export const updateUser = async (token:string | undefined, formInfo: object | undefined ) => {
    return await appClient.put('/users',formInfo,{
        headers: {
            'Authorization': `${token}`
        }
    });
}

export const activateUser = (userId: string) => {
    
}

export const findAllUsers = async (token:string | undefined) => {
    return await appClient.get('/users', {
        headers: {
            'Authorization': `${token}`
        }
    });
}