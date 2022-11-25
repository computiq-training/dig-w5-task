import axios from "axios";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import themeContext from "../../Context/theme";

const PatientsMapping = (props) => {
  const context = useContext(themeContext);

  //delete patients
  const delItem = (id) => {
    console.log(id);
    axios
      .delete(`http://127.0.0.1:5000/api/v1/patients/${id}`)
      .then((res) => {
        let temp = props.list.findIndex((item) => item._id === id);
        let temp1 = props.list.splice(temp, 1);
        console.log(temp1);
        props.setList([...props.list]);
      })
      .catch((err) => console.log(err));
  };

  return props.list.map((item, index) => {
    return (
      <tr
        key={index}
        className={
          index % 2 === 0
            ? `${context.theme.formRow1} shadow-md`
            : `${context.theme.formRow2} shadow-md`
        }
      >
        <td className="">{index + 1}</td>
        <td className=" hover:text-blue-400">
          <NavLink to={`${item._id}/History`}>{item.full_name}</NavLink>
        </td>
        <td className="">{item.birth_date}</td>
        <td className="">{item.gender}</td>
        <td className="">{item.phone}</td>
        <td className="">{item.code}</td>
        <td className="text-center">
          <button
            className=" bg-red-600 text-white rounded px-3"
            onClick={() => {
              delItem(item._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
};

export default PatientsMapping;
