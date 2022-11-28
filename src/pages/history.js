import React,{ useEffect,useContext,useState  } from 'react'
import { Button } from "../components/Button";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {URL} from '../constants/web_service'
import { useSnackbar } from 'react-simple-snackbar'
//import 'tw-elements';

const options = {
  position: 'bottom-right',
  style: {
    backgroundColor: 'black',
    border: '2px solid DarkBlue',
    color: 'white',
    fontSize: '18px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'gray',
    fontSize: '16px',
  },
}

let array_temp_prescription = [
];

const History = ()=>{

  const [open,close] = useSnackbar(options)
  const [patientInfo, setPatientInfo] = useState([])
  const [history, setHistory] = useState([])  
  const [date , setDate] = useState('')
  const [report,setReport] = useState('')
  const [prescription,setPrescription] = useState('')
  const [temp_prescription, setTemp_prescription] = useState(array_temp_prescription)

  const { id } = useParams()

  if(id){
    console.log(id)
  }
  
  const addNew = ()=>{
    if(!date || !report )
    {
        open('Please Fill all Info')
        return;
    }
    axios.post(`${URL}patients/${id}/history`,{
        date:date,
        report:report,
        prescription: 
        JSON.stringify(temp_prescription)
        
    })
    .then((res)=>{
        console.log('response ',res)
        console.log('response id is:',res.data.data.history[res.data.data.history.length -1])
        let pTemp = !history?[]:history
            pTemp.push({
                _id:res.data.data.history[res.data.data.history.length -1],
                date:date,
                report:report,
                prescription:temp_prescription
            })

    setHistory([...pTemp])
    reset_Date_Report_setPrescription_setTemp_prescription()
    })
    .catch((err)=>{
        console.error(err)
    })
  }


  const changeDate = (e)=>{
      let v = e.target.value
      console.log(v)
      setDate(v)
  }

  const changeReport = (e)=>{
      let v = e.target.value
      console.log(v)
      setReport(v)
  }
  const changePrescription = (e)=>{
      console.log(e.target.value)
      setPrescription(e.target.value)
  }

  const submit = (e)=>{
      e.preventDefault()
      addNew()
  }

const reset_prescription = ()=>{
    setPrescription('')
}

const reset_Date_Report_setPrescription_setTemp_prescription = ()=>{
    setPrescription('')
    setDate('')
    setReport('')
    
    array_temp_prescription = []
    setTemp_prescription(array_temp_prescription)
    
    console.log("array_temp_prescription:",array_temp_prescription)
    console.log("temp_prescription:",temp_prescription)
}

const addPrescription= ()=>{
  if(!prescription)
  {
      open('Please Fill Prescription Info')
      return;
  }

  try {
    
    let pTemp = !array_temp_prescription?[]:array_temp_prescription
    console.log("array_temp_prescription:", array_temp_prescription)
          pTemp.push(
            prescription
          )

    setTemp_prescription([...pTemp])
    console.log("[...pTemp]: ",[...pTemp])
    console.log("history New: ",history)
    reset_prescription()
  } catch (error) {
    console.error(error)
  }
}



const removeHandler = (id)=>{
    console.log("id deleted is :",id);
    axios.delete(`${URL}history/${id}`)
    .then((res)=>{
        console.log('response after deletion',res)
        let temp = history;
    console.log(id,'deleted')
    let index = temp.findIndex((item)=>{
        return item._id === id
    })
    console.log('index,',index)
    console.log('length before',temp.length)
    temp.splice(index,1)
    console.log('length after',temp.length)

    setHistory([...temp])
    })
    .catch((err)=>{
        console.error(err.message)
    })
}

  useEffect(() => {
  if(id){
    axios.get(`${URL}patients/${id}`)
        .then((res)=>{
            console.log("response is in PatientInfo ", res)
            setPatientInfo(res.data.data)
            console.log("res.data.data in PatientInfo: ",res.data.data)
        })
        .catch((err)=>{
            console.error(err.message);
        })
    axios.get(`${URL}patients/${id}/history`)
        .then((res)=>{
            console.log("response is in History ", res)
            setHistory(res.data.data)
            console.log("res.data.data in History: ",res.data.data)
        })
        .catch((err)=>{
            console.error(err.message);
        })
  }
  }, []);

  if(!id){
      return <section className="px-10 py-8 bg-[#f2f8ff] h-screen" >
              <p>This History Page </p>
            </section>
  }
return <section className="px-10 py-8 bg-[#f2f8ff] h-screen" >
        <div>
          <p className="uppercase font-bold pb-3">patient profile</p>
          <div>
              <p className="uppercase text-[#9a9b9b]">full name: <span className="text-[#d0d1d3] ml-4">{patientInfo.full_name}</span></p>
          </div>
          <div>
              <p className="uppercase text-[#9a9b9b]">age: <span className="text-[#d0d1d3] ml-4">{patientInfo.birth_date}</span></p>
          </div>
          <div>
              <p className="uppercase text-[#9a9b9b]">gender: <span className="text-[#d0d1d3] ml-4">{patientInfo.gender}</span></p>
          </div>
          <div>
              <p className="uppercase text-[#9a9b9b]">phone: <span className="text-[#d0d1d3] ml-4">{patientInfo.phone}</span></p>
          </div>
        </div>
        <br/>
        <br/>


        <div className="">
          <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            Add New
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenter" tabIndex="-1" labelled="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <button type="button" onClick={()=>reset_Date_Report_setPrescription_setTemp_prescription()}  
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"> Empty INFO</button>
                </div>
                <div className="modal-body relative p-4">
    

        <div className="flex justify-center">
  <div className="mb-3 xl:w-4/5">
    <input value={date} onChange={changeDate}
      type="text"
      className="
        mt-6
        mb-6
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleText0"
      placeholder="Date"
    />


    <input value={report} onChange={changeReport}
      type="text"
      className="
        mb-6
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleText0"
      placeholder="Repo"
    />
      
      
      <input value={prescription} onChange={changePrescription}
      type="text"
      className="
      form-control
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
      id="exampleText0"
      placeholder="	Prescription"
    />

    <button type="button" onClick={()=>addPrescription()} 
      className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
      >Add New</button>



  </div>

</div>


      <ul className="list_style list-inside ml-20 text-zinc-700">
        {(array_temp_prescription).map((ii,index) =>{ 
            return (
            <li key={index}> 
              {ii} 
            </li>
            )
          })
        }
      </ul>



      </div>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        
        <button  type="submit"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Save INFO
        </button>
      </div>
    </div>
  </div>
</div>
</form>

        
        <br/>
        <br/>

        <div>
            <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Repo</th>
                    <th>Prescription</th>
                    <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {
                  history && history.length>0?history.map((item, index )=>{
                    return (
                      <tr key={index}>
                          <td>{item._id}</td>
                          <td>{item.date}</td>
                          <td>{item.report}</td>
                          <td>
                            <ul>
                            {Array.from(item.prescription).map((i,index) =>{ 
                                return (<li key={index}> - {i}</li>)
                                })}
                            </ul>
                          </td>
                          <td><button type="button"  onClick={()=>removeHandler(item._id)} 
                          
                            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          >Delete</button></td>
                      </tr>
                    )
                  })
                  :
                  <tr><td><p>No Data found</p></td></tr>

                  
                }
              </tbody>
            </table>
        </div>
      
      </section>
}


export default History;