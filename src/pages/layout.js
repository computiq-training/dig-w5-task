import { NavLink, Outlet } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { Sidebar } from "../components/sidebar";
import { Switcher } from "../components/Switcher";
import { AuthContext } from "../contexts/AuthContext";
export default function Layout(){
    const context = useContext(ThemeContext);
    const authContext = useContext(AuthContext)
    const {logout} = authContext;
    console.log('c',context)
    const color = context.settings.themeValue.background;
    const color_header = "bg-blue-500";
    return <>

        <div className="flex flex-row ">
            <Sidebar/>
            <div className="w-full">
                <header className={`h-max ${color_header}`}>
                    <Switcher/>
                </header>
                <div id="detiails" className="w-full color:#f2f8ff">
                    <Outlet/>
                </div>
            </div>
        </div>        
    </>
}