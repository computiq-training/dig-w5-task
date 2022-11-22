import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Guard = ({children})=>{
    const context = useContext(AuthContext);
    const {isAuth} = context;
    console.log('is User Auth in Guard: ',isAuth)
    if(!isAuth)
        return <Navigate to='/login'/>
    
    return <>
        {children}
    </>
}