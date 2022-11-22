import axios from "axios";
import { useState,useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
export const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const authContext = useContext(AuthContext);
    const {isAuth, login} = authContext
    console.log('is Auth nad user', isAuth, login)
    const submit =  (e)=>{
        e.preventDefault();
        console.log('clicked')
        console.log(login)
        login(username,password)
        console.log('after clicked')

    }
    const onUsernameChange = (e)=>{
        setUsername(e.target.value)
    }
    const onPasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    if(isAuth)
        return <Navigate to="/patients"/>
    return <>
        <section className="bg-[#F2F8FF] h-screen flex flex-row justify-center items-center	">
            <div className="w-96 h-96 bg-[#3995FF] rounded-lg	">
                <form onSubmit={submit} className="h-full flex flex-col justify-evenly items-center">
                    <input value={username} onChange={onUsernameChange}  type="text" required/>
                    <input value={password} onChange={onPasswordChange} type="password" required/>
                    <input className="py-2 px-4 hover:bg-white rounded cursor-pointer	" type="submit" value="LOGIN"/>
                </form>
            </div>
        </section>
    </>
}