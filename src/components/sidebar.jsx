import React from 'react'
import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const Sidebar = ()=>{
    const authContext = useContext(AuthContext)
    const {logout} = authContext;
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;
    return (
    <div className={`flex flex-col h-screen p-3 shadow w-max ${color} `}>
    <div className="space-y-3">
        <div className="flex items-center">
            <h2 className="text-xl font-bold">Clinic Application</h2>
        </div>
        <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm h-8">
                <NavLink 
                         className={({isActive, isPending})=>{
                            let st = isActive?"text-sky-400":isPending?"pending":"text-slate-400";
                           return st+' '+'p-1 rounded-lg';
                       }}
                        to={'patients'}>
                            Patients
                        </NavLink>
                </li>
                <li className="rounded-sm  h-8">
                <NavLink 
                     className={({isActive, isPending})=>{
                        let st = isActive?"text-sky-400":isPending?"pending":"text-slate-400";
                        return st+' '+'p-1 rounded-lg';
                    }}
                    to={'history'}>
                            History
                        </NavLink>
                </li>
                
            </ul>
        </div>
    </div>

    <div className="relative h-full w-32">
        <div className="absolute inset-x-0 bottom-0 h-16">
            <button className="rounded-md logout h-12 w-32" onClick={logout}>Logout</button>
        </div>
    </div>  
</div>)
}