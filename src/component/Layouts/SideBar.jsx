import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import themeContext from "../Context/theme";
const SideBar = () => {
  const context = useContext(themeContext);
  const check = ({ isActive, isPending }) => {
    return isActive ? "text-sky-400" : isPending ? context.theme.font : "";
  };
  return (
    <nav className={`m-9 block text-2xl ${context.theme.font}`}>
      <ul>
        <li className={`my-3`}>
          <NavLink className={check} to={"Patients"}>
            Patients
          </NavLink>
        </li>
        <li className="my-3">
          <NavLink className={check} to={`History`}>
            History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
