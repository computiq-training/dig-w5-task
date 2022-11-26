import axios from "axios";
import React, { useEffect, useState } from "react";
import AddHistory from "./add new element";
import HistoryRow from "./History map and delete";

const Table = (props) => {
  const [history, setHistory] = useState([]);
  let data;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/v1/patients/${props.id}/history`)
      .then((res) => {
        localStorage.setItem("history", JSON.stringify(res.data.data));
        data = JSON.parse(localStorage.getItem("history"));
        setHistory([...data]);
      })
      .catch((err) => console.log(err));
  }, []);
  // if (!data) return <p>working on it</p>;
  return (
    <div className="w-full my-10 max-h-[400px] overflow-auto p-0">
      <div className="mb-10">
        <AddHistory id={props.id} list={history} setList={setHistory} />
      </div>
      <table className="border-collapse w-full shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <td>#</td>
            <td>data</td>
            <td>report</td>
            <td>prescription</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="h-3">
          <HistoryRow history={history} setList={setHistory} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
