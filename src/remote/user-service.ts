import { appClient } from "./app-client";
import { User } from "../models/user"

export const getAllUsers = async () =>{
    // returns a pomise of an axios response with User object
    return await appClient.get<User>('/users');
}

export const register = (userInfo:object) => {
    // TODO implement axios call to POST /users
}

export const updateUser = () => {
    // TODO implement axios call to PUT /users
}

export const activateUser = (userId: string) => {
    
}