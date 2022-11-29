import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Sidebar = () => {
    const context = useContext(ThemeContext)
    const color = context.settings.themeValue.background;

    const authContext = useContext(AuthContext)
    const { logout } = authContext;

    return (<div className={`flex flex-col h-screen p-3 shadow w-60 ${color}`}>
        <div className="space-y-3 h-full">
            <div className="flex items-center">
                <h2 className="text-xl font-bold">CLINIC APP</h2>
            </div>
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm h-8">
                        <NavLink
                            className={({ isActive, isPending }) => {
                                let st = isActive ? "active" : isPending ? "pending" : "";
                                return st + ' ' + 'p-1 rounded-lg text-xl';
                            }}
                            to={'patients'}>
                            Patients
                        </NavLink>
                    </li>
                    <li className="rounded-sm  h-8">
                        <NavLink
                            className={({ isActive, isPending }) => {
                                let st = isActive ? "active" : isPending ? "pending" : "";
                                return st + ' ' + 'p-1 rounded-lg text-xl';
                            }}
                            to={'history'}>
                            History
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="h-4/5 flex flex-col justify-end">
                <button onClick={logout} className="rounded bg-[#ebebeb] px-3 py-2 text-[#383838] text-xl">LOGOUT</button>
            </div>
        </div>

    </div>)
}