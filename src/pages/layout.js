import { NavLink, Outlet } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { Sidebar } from "../components/sidebar";
import { Switcher } from "../components/Switcher";
export default function Layout() {
    const context = useContext(ThemeContext);

    console.log('c', context)
    const color = context.settings.themeValue.background;
    return <>

        <div className="flex flex-row">
            <Sidebar />
            <div className="w-full ">
                <header className={`h-16 bg-[#3895fe] flex items-center justify-end px-5`}>
                    <Switcher className="mx-5"/>
                    
                </header>
                <div id="detiails" className="w-full ">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
}