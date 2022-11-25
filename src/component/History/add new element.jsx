import axios from "axios";
import React, { useState } from "react";
import { URL } from "../Services/WebServices";

const AddHistory = (props) => {
  const [date, setDate] = useState("");
  const [report, setReport] = useState("");
  const [prescription, setPrescription] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const addHistory = () => {
    axios
      .post(`${URL}patients/${props.id}/history`, {
        date: date,
        report: report,
        prescription: prescriptions.map((item) => {
          return item.name;
        }),
      })
      .then(() => {
        let temp = !props.list ? [] : props.list;
        temp.push({
          date: date,
          report: report,
          prescription: prescriptions,
        });
        props.setList([...temp]);
      })
      .catch((err) => console.log(err));
  };
  const reset = () => {
    setDate("");
    setReport("");
    setPrescription("");
    setPrescriptions([]);
  };
  return (
    <div>
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add new
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Add history
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              {/* هنا الشغل :> */}
              <div className="p-5 w-full text-2xl mb-16 flex flex-col">
                <input
                  type={"text"}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  placeholder={"date"}
                  className={
                    "my-3 shadow-md rounded-lg p-3 border-[3px] w-full outline-none"
                  }
                />
                <textarea
                  value={report}
                  onChange={(e) => {
                    setReport(e.target.value);
                  }}
                  className="block w-full h-14 shadow-md my-5 rounded-lg p-3 border-[3px] outline-none"
                  placeholder="report"
                ></textarea>
                <div className=" justify-between flex items-center">
                  <input
                    type={"text"}
                    value={prescription}
                    onChange={(e) => {
                      setPrescription(e.target.value);
                    }}
                    placeholder={"prescription"}
                    className="my-3 shadow-xl rounded-lg p-3 w-[83%] border-[3px] outline-none"
                  />
                  <button
                    onClick={() => {
                      let data = prescriptions;
                      data.push({ name: prescription });
                      setPrescriptions([...data]);
                    }}
                    className="px-5 py-3 shadow-xl bg-gray-300 rounded-lg font-bold text-3xl outline-none"
                  >
                    +
                  </button>
                </div>
                <ul className="block list-disc mx-6">
                  {prescriptions.map((item, index) => {
                    return <li key={index}>{item.name}</li>;
                  })}
                </ul>
                <div className="text-center absolute bottom-0 w-full left-0">
                  <button
                    onClick={reset}
                    className={
                      "w-[40%] py-2 my-2 bg-gray-300 rounded-md shadow-md"
                    }
                  >
                    reset
                  </button>
                </div>
              </div>
              {/* هنا الشغل :> */}
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={addHistory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHistory;
