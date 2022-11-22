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
    return <>
        <header className={`h-16 ${color}`}>
            <Switcher/>
            <button onClick={logout}>Logout</button>
        </header>
        <div className="flex flex-row">
            <Sidebar/>
            <div id="detiails" className="w-full p-8">
                <Outlet/>
            </div>
        </div>
    </>
}