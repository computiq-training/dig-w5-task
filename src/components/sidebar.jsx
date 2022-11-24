import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const Sidebar = ()=>{
    const authContext = useContext(AuthContext)
    const {logout} = authContext;
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;
    return (<div className={`flex relative  h-screen flex-col  p-3 shadow w-60 ${color}`}>
    <div className="space-y-3">
        <div className="flex items-center">
            <h2 className="text-xl font-bold">Clinic App</h2>
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
                {/* <li className="rounded-sm  h-8">
                <NavLink 
                     className={({isActive, isPending})=>{
                         let st = isActive?"active":isPending?"pending":"";
                        return st+' '+'p-1 rounded-lg';
                    }}
                    to={'patients/:id'}>
                            patient profile
                        </NavLink>
                </li> */}
                
            </ul>
        </div>
       
    </div>   <div className=" absolute bottom-10 left-14">  <button  onClick={logout} className="  my-10 px-6 py-2.5  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"> Logout</button>
    </div>
</div>)
}