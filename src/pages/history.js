import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react"
import { URL } from '../constants/web_service'
import axios from "axios";
import "tw-elements"


const History = () => {
    const [patient, setPatient] = useState({})
    const [history, setHistory] = useState([])
    const [date, setDate] = useState('')
    const [report, setReport] = useState('')
    const [prescription, setPrescription] = useState('')
    const [prescriptions, setPrescriptions] = useState([])
    const { id } = useParams()


    const changeDate = (e) => {
        let v = e.target.value
        setDate(v)
    }

    const changeReport = (e) => {
        let v = e.target.value
        setReport(v)
    }
    const changePrescription = (e) => {
        setPrescription(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        if (!date || !report) {
            alert('Fill all required fields')
            return;
        }
        axios.post(`${URL}patients/${id}/history`, {
            date: date,
            report: report,
            prescription:
                JSON.stringify(prescriptions)

        })
            .then((r) => {
                let pTemp = !history ? [] : history
                pTemp.push({
                    _id: r.data.data.history[r.data.data.history.length - 1],
                    date: date,
                    report: report,
                    prescription: prescriptions
                })

                setHistory([...pTemp])
                clear()
            })
    }

    const clear = () => {
        setDate('')
        setReport('')
        setPrescription('')
        setPrescriptions([])
    }

    const addPrescription = () => {
        if (!prescription) {
            alert('Fill all required fields!!')
            return;
        }
        try {
            let pTemp = !prescriptions ? [] : prescriptions
            pTemp.push(
                prescription
            )

            setPrescriptions([...pTemp])

            setPrescription('')
        } catch (error) {
        }
    }

    const deleteHistory = (id) => {
        axios.delete(`${URL}history/${id}`)
            .then((r) => {
                let temp = history;
                let i = temp.findIndex((item) => {
                    return item._id === id
                })
                temp.splice(i, 1)

                setHistory([...temp])
            })
    }

    useEffect(() => {
        if (id) {
            axios.get(`${URL}patients/${id}`)
                .then((r) => {
                    setPatient(r.data.data)
                })

            axios.get(`${URL}patients/${id}/history`)
                .then((r) => {
                    setHistory(r.data.data)
                })
        }
    }, []);

    return <main className="py-8 px-10 bg-[#f2f8ff] h-screen m-0" >

        <div className='mb-20'>
            <p className="uppercase font-bold pb-3 text-2xl">{`${patient.full_name}`.split(" ")[0].toUpperCase()}</p>
            <div>
                <span className="text-gray-500">FULL NAME: </span><span className="text-gray-400 ml-4">{patient.full_name}</span> <br />
            </div>
            <div>
                <span className="text-gray-500">AGE: </span><span className="text-gray-400 ml-4">{patient.birth_date}</span> <br />
            </div>
            <div>
                <span className="text-gray-500">GENDER: </span><span className="text-gray-400 ml-4">{patient.gender}</span> <br />
            </div>
            <div>
                <span className="text-gray-500">PHONE: </span><span className="text-gray-400 ml-4">{patient.phone}</span> <br />
            </div>
        </div>

        <button type="button" className="add-button my-3" data-bs-toggle="modal" data-bs-target="#historyModal">
            New
        </button>



        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="historyModal" tabIndex="-1" aria-labelledby="historyModalTitle" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <button type="button" onClick={() => clear()}
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close">Close</button>
                    </div>
                    <div className="modal-body relative p-4">
                        <div className="flex justify-center">
                            <div className="mb-3 w-4/5">
                                <form onSubmit={submit}>
                                    <input value={date} onChange={changeDate}
                                        type="text"
                                        className=" mt-6 mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
      "                                  placeholder="Date"
                                    />
                                    <textarea value={report} onChange={changeReport}
                                        rows="3"
                                        type="textarea"
                                        className=" mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
      "
                                        placeholder="Report"
                                    />
                                    <div className='block w-full ' >
                                        <input value={prescription} onChange={changePrescription}
                                            type="text"
                                            className="mb-6 w-100 form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
    "
                                            placeholder="Prescritpion"
                                        />

                                        <button type="button" onClick={() => addPrescription()}
                                            className="bg-[#c8cdd2] text-grey-900 font-bold text-base mb-6 ml-5 px-3 py-1.5"
                                        >+</button>
                                    </div>

                                    <ul className="list-disc list-inside ml-20 text-zinc-700">
                                        {(prescriptions).map((el, i) => {
                                            return (
                                                <li key={i}>
                                                    {el}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                    <button type="submit"
                                        className="add-button my-5 " style={{ width: "100%" }}>
                                        Save
                                    </button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <section>
            {
                history && history.length > 0 ?
                    <table className='patients-table w-full'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Report</th>
                                <th>Prescription</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item._id}</td>
                                            <td>{item.date}</td>
                                            <td>{item.report}</td>
                                            <td>
                                                <ul>
                                                    {[...item.prescription].map((el, i) => {
                                                        return (<li key={i}> - {el}</li>)
                                                    })}
                                                </ul>
                                            </td>
                                            <td><button type="button" className='px-2 py-0.5 delete-button' onClick={() => deleteHistory(item._id)} >Delete</button></td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                    : <p>No Hisotry</p>
            }
        </section>
    </main>
}


export default History;

