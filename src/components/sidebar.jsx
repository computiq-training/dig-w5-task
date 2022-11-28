import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Switcher } from "../components/Switcher";
import {Login} from "../pages/login"

export const Sidebar = ()=>{
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;
    const authContext = useContext(AuthContext)
    const {logout} = authContext;
    
    return ( <div>
        
        <div className={`fixed top-0 left-0 z-50 hidden w-full item-center justify-center overflow-hidden px-10 py-8 text-center lg:flex  ${color}`}>
            <div>
                <ul className="flex space-x-20">
                        <li>
                            <a href="#" className="text-3xl font-bold text-blue-500 pr-60">
                                <span>Digitalize Clinic</span>
                            </a>
                        </li>
                    <li className="mr-6">
                        <NavLink to={'Home'}>
                            <a href="#" className="text-blue-500 hover:text-blue-800">
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                <span>Home</span>
                            </a>
                        </NavLink>
                        </li>

                        <li className="mr-6">
                        <NavLink to={'patients'}>
                            <a href="#" className="text-blue-500 hover:text-blue-800">
                                <svg 
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24" 
                                    stroke-width="2" 
                                    stroke="currentColor" 
                                    fill="none" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round">  
                                    <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" />  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                    </svg>                                
                                    <span>Patients</span>
                            </a>
                        </NavLink>
                        </li>

                        
                        <li className="mr-6">
                        <NavLink to={'Login'}> 
                        <a href="#" className="text-blue-500 hover:text-blue-800"> 
                            <button>
                                <svg
                                    aria-hidden="true"
                                    class="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </a>
                        </NavLink> 
                        
                        </li> 
                         <Switcher/>
  
                </ul>
            </div>
    </div>
    
</div>
)
}