import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Sidebar = ()=>{
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;
    const authContext = useContext(AuthContext)
    const {logout} = authContext;
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

                <li className="rounded-sm  h-8">
                <button type="button" onClick={logout} class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Logout</button>
                {/* <button onClick={logout}>Logout</button> */}
                </li>
                
            </ul>
        </div>
    </div>
</div>)
}