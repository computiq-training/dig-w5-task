import { NavLink, Outlet } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { Sidebar } from "../components/sidebar";
import { Switcher } from "../components/Switcher";
import { AuthContext } from "../contexts/AuthContext";
export default function Layout(){
    const context = useContext(ThemeContext);
    
    
    console.log('c',context)
    let color = context.settings.themeValue.background;
    if (color =='bg-sky-300')
    color="bg-sky-600"
    console.log("sadsdas",color)
    return <div >
        <header className={`flex justify-end  p-5 h-16 ${color}`}>
            <Switcher/>
            
        </header>
        <div className="flex flex-row   ">
            <Sidebar/>
            <div id="detiails" className="w-full ">
                <Outlet/>
            </div>
        </div>
    </div>
}