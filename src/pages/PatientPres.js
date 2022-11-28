import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import {PATIENTS} from "./patients";

export const PatientPresc = [
  {
    id: 1,
    date: "28/11/2022",
    report: "Headache",
    presrciption: "Coffee 3x per day",
  },
];
const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "midnightblue",
    border: "2px solid lightgreen",
    color: "lightblue",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "lightcoral",
    fontSize: "16px",
  },
};
const PatientProfile = (props) => {
  const [patients, setPatients] = useState(PatientPresc);
  const [filteredPatients, setFilteredPatients] = useState(PatientPresc);
  const [open, close] = useSnackbar(options);
  const [date, setdate] = useState("");
  const [report, setreport] = useState("");
  const [prescription, setprescription] = useState("");
  const authContext = useContext(AuthContext);
  const { user, isAuth } = authContext;
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const { id } = useParams();

  let url = window.location.pathname;
  let idbyURL = Number(url.split("/")[2])-1;

  const addNew = () => {
    if (!date || !report || !prescription) {
      open("Please fill all the info");
      return;
    }
    let pTemp = !patients ? [] : patients;
    pTemp.push({
      id: 4,
      date: date,
      report: report,
      presrciption: prescription,
    });

    setPatients([...pTemp]);
    setFilteredPatients([...pTemp]);
    reset();
  };

  const changeDate = (e) => {
    let v = e.target.value;
    console.log(v);
    setdate(v);
  };

  const changeReport = (e) => {
    setreport(e.target.value);
  };

  const changePrescription = (e) => {
    setprescription(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    addNew();
  };

  const reset = () => {
    setdate("");
    setreport("m");
    setprescription("");
  };

  const deleteRow = (id) => {
    let temp = patients;
    let index = temp.findIndex((item) => {
      return item.id === id;
    });

    temp.splice(index, 1);

    setPatients([...temp]);
    setFilteredPatients([...temp]);
  };
  useEffect(() => {
         axios
          .get(`${URL}patients/${id}`)
          .then((res) => {
            setPatients(res.data.data.history);
      })
         .catch((err) => {});
      }, []);

  const PatientById = (id) => {
    console.log(id);
    navigate(`/patients/${id}`);
  };

  return (
    //click on id or fullname in the table to be redirected to patient profile
    <> 
    <div className="pt-8">
        <section className="font-serif text-xl pt-20 pl-10">
         <ul>
           <li className="mb-4 text-3xl text-blue-500 underline decoration-dotted"> {PATIENTS[idbyURL].full_name}</li>
           <li className="mb-4">Age: {PATIENTS[idbyURL].birth_date}</li>
           <li className="mb-4">Gender: {PATIENTS[idbyURL].gender}</li>
           <li className="mb-4">Phone: {PATIENTS[idbyURL].phone}</li>
         </ul>
       </section>

        <button
            className=" bg-blue-500 text-white active:bg-green-600 font-bold uppercase text-sm px-8 py-4 mt-6 ml-6 mb-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}>
            New Prescription
        </button>
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-blue-400 text-3xl font-semibold">
                    Add New Prescription
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
              
                <form onSubmit={submit}>
                <div>
                    <input
                        className="pt-16 pb-16 pr-16 pl-16 ml-2 mb-4 block uppercase tracking-wide text-gray-700 text-xs font-bold "
                        value={date}
                        onChange={changeDate}
                        type="date"
                        placeholder="Date"
                        required
                    />
                    <input
                        className="pt-16 pb-16 pr-16 pl-16 ml-2 mb-4 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        value={report}
                        onChange={changeReport}
                        type="text"
                        placeholder="report"
                        required
                        />
                    <input
                        className="pt-16 pb-16 pr-16 pl-16 ml-2 mb-4 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        value={prescription}
                        onChange={changePrescription}
                        placeholder="Prescription"
                        type="text"
                        required
                    />
                    <button
                        className="text-center pt-4 pb-4 pr-4 pl-4 text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="text-center text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                    >
                        Save
                    </button>
                </div> 
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                       Report
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Prescription
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients &&
                      filteredPatients.map((item, index) => {
                        return (
                          <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                            <td
                              onClick={() => {
                                PatientById(item.id);
                              }}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                              {item.id}
                            </td>
                            <td
                              onClick={() => {
                                PatientById(item.id);
                              }}
                              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                            >
                              {item.date}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.report}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.presrciption}
                            </td>
                            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-red-600 p-1"
                                onClick={() => deleteRow(item.id)}
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
    
    </>
    
  );
};

export default PatientProfile;
