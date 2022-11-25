import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Rout = () => {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to={"username"}>username</NavLink>
            </li>
            <li>
              <NavLink to={"birthDate"}>birth date</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Rout;
