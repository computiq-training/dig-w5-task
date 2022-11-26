import React, { useEffect, useState } from "react";
import FormInputs from "./Form Input/info input";
import PatientsTable from "./Form table/Patients Table";
// import { p } from "./Patients Information";
import SelectGender from "./Form Input/Select";
import SearchBar from "./Form Input/search";
import { toaster } from "evergreen-ui";
import AddElement from "./Form Input/Add element";
import axios from "axios";
import { BASE_URL } from "../Services/WebServices";

function PatientForm() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [fname, setfname] = useState("");
  const [birth, setBirth] = useState(Date());
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/v1/patients")
      .then((res) => {
        localStorage.setItem("Patients", res.data.data);
        setPatients(res.data.data);
        setFilteredPatients(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //add new patients
  const addNew = () => {
    if (fname === "")
      return toaster.warning("You must Enter Patient full name");

    console.log(birth);

    if (!phone) return toaster.warning("Enter patients phone number");

    axios
      .post(`${BASE_URL}/api/v1/patients`, {
        full_name: fname,
        birth_date: birth,
        gender: gender,
        phone: phone,
        code: code,
      })
      .then((res) => {
        let temp = !patients ? [] : patients;
        temp.push({
          id: temp.length + 1,
          full_name: fname,
          birth_date: birth,
          gender: gender,
          phone: phone,
          code: code,
        });

        setPatients([...temp]);
        setFilteredPatients([...temp]);
      })
      .catch((err) => console.log(err));

    return toaster.success("Patients add successfully");
  };

  return (
    <form className="" onSubmit={(e) => e.preventDefault()}>
      <div className="">
        <FormInputs val={fname} setVal={setfname} PlaceHolder="Full Name" />
        <FormInputs val={birth} setVal={setBirth} type={"date"} />
        <FormInputs
          val={phone}
          setVal={setPhone}
          PlaceHolder="Phone number"
          type={"number"}
        />
        <FormInputs
          val={code}
          setVal={setCode}
          type={"text"}
          PlaceHolder="Code"
        />

        <SelectGender setVal={setGender} />
        <AddElement method={addNew} />
      </div>
      <SearchBar
        list={patients}
        filteredList={filteredPatients}
        setVal={setFilteredPatients}
      />
      <div className=" border-collapse overflow-y-auto max-h-[600px]">
        <PatientsTable list={filteredPatients} setVal={setPatients} />
      </div>
    </form>
  );
}

export default PatientForm;
