import React from "react";
import { useContext } from "react";
import themeContext from "../../Context/theme";
import PatientsMapping from "./Patients map and delete";

const PatientsTable = (props) => {
  const context = useContext(themeContext);
  return (
    <table className={`w-full ${context.theme.font}`}>
      <thead className={`${context.theme.formHead} shadow-md`}>
        <tr className="font-bold">
          <td>ID</td>
          <td>Full name</td>
          <td>Birth Date</td>
          <td>Gender</td>
          <td>Phone number</td>
          <td>Code</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <PatientsMapping list={props.list} setList={props.setVal} />
      </tbody>
    </table>
  );
};

export default PatientsTable;
