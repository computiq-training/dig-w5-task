import axios from "axios";
import React from "react";
import { URL } from "../Services/WebServices";

const HistoryRow = (props) => {
  const deleteHistory = (_id) => {
    axios
      .delete(`${URL}history/${_id}`)
      .then(() => {
        let temp = props.history.findIndex((item) => item._id === _id);
        let temp1 = props.history.splice(temp, 1);
        console.log(temp1);
        props.setList([...props.history]);
      })
      .catch((err) => console.log(err));
  };

  return (
    props.history &&
    props.history.map((item, index) => {
      return (
        <tr
          key={index}
          className={index % 2 === 0 ? "bg-white py-5" : "bg-gray-300 py-5"}
        >
          <td className="py-6">#</td>
          <td className="py-6">{item.date}</td>
          <td className="py-6">{item.report}</td>
          <td className="py-6">
            {item.prescription &&
              item.prescription.map((item) => {
                return item.name ? item.name : item;
              })}
          </td>
          <td className="py-6">
            <button
              className="bg-red-600 text-white rounded px-7 py-2"
              onClick={() => {
                deleteHistory(item._id);
              }}
            >
              delete
            </button>
          </td>
        </tr>
      );
    })
  );
};

export default HistoryRow;
