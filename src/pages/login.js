import axios from "axios";
import { useState,useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Outlet } from "react-router-dom";
import {Sidebar} from "../components/sidebar"

export const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const authContext = useContext(AuthContext);
    const {isAuth, login} = authContext
    console.log('is Auth nad user', isAuth, login)
    const submit =  (e)=>{
        e.preventDefault();
        
        login(username,password)

    }
    const onUsernameChange = (e)=>{
        setUsername(e.target.value)
    }
    const onPasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    if(isAuth)
        return <Navigate to="/Sidebar"/>
    return <>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Login</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autocomplete="off" value={username} onChange={onUsernameChange} placeholder='Username' type="text" required className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
							<label for="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
						</div>
						<div className="relative">
							<input autocomplete="off" value={username} onChange={onUsernameChange} placeholder='Username' type="text" required className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
							<label for="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative">
                        
                        <button onClick={'Sidebar'} className="bg-blue-500 text-white rounded-md px-2 py-1">Sign In</button>
                       	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </>
}



