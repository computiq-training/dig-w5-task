import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
export const Sidebar = ()=>{
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;
    return (<div className={`flex flex-col h-screen p-3 shadow w-60 ${color}`}>
    <div className="space-y-3">
        <div className="flex items-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm h-8">
                <NavLink 
                         className={({isActive, isPending})=>{
                            let st = isActive?"active":isPending?"pending":"";
                           return st+' '+'p-1 rounded-lg';
                       }}
                        to={'patients'}>
                            Patients
                        </NavLink>
                </li>
                <li className="rounded-sm  h-8">
                <NavLink 
                     className={({isActive, isPending})=>{
                         let st = isActive?"active":isPending?"pending":"";
                        return st+' '+'p-1 rounded-lg';
                    }}
                    to={'history'}>
                            History
                        </NavLink>
                </li>
                
            </ul>
        </div>
    </div>
</div>)
}