import axios from "axios";
import React, { useEffect, useState } from "react";
import AddHistory from "./add new element";
import Table from "./Table";

const InfoLayout = (props) => {
  const [List, setList] = useState({});
  var data;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/v1/patients/${props.id}`)
      .then((res) => {
        if (!data) {
          localStorage.setItem("byId", JSON.stringify(res.data.data));
          data = JSON.parse(localStorage.getItem("byId"));
          return setList({ ...data });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full">
      <div className="text-2xl text-gray-500">
        <p className="my-5">
          FULL NAME:
          <span className="mx-10">{List && List.full_name}</span>
        </p>
        <p className="my-5">
          BIRTH DATE:
          <span className="mx-10">{List && List.birth_date}</span>
        </p>
        <p className="my-5">
          GENDER: <span className="mx-10">{List && List.gender}</span>
        </p>
        <p className="my-5">
          PHONE NUMBER:
          <span className="mx-10">{List && List.phone}</span>
        </p>
      </div>
      <Table id={props.id} />
    </div>
  );
};

export default InfoLayout;
