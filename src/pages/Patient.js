import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {URL} from '../constants/web_service'
import axios from "axios";
import HistoryT from "../components/HistoryT";

export const Patient = (props)=>{
    
    const par = useParams()
    const [pat, setPat] = useState({})
    const [pres, setPres]= useState([])
    const [prescript, setPrescript]= useState('')
    const [date, setDate]= useState(new Date)
    const [report, setReport]=useState('')
    const [history, setHistory]= useState([])

    useEffect(() => {
        axios.get(`${URL}patients/${par.id}`)
        .then((res)=>{
            console.log('response is ',res)
            setPat(res.data.data)
            setHistory(res.data.data.history)
            console.log(pat)
            
        })
        .catch((err)=>{
            console.error(err)
        })
    }, []);

    const Addpres =(e)=>{
        setPres([...pres, prescript])
        e.preventDefault()
        setPrescript('')
        console.log(pres)
    }

    const prescripthandle =(e)=>{
        setPrescript(e.target.value)
        // setPrescript(prescript)
    }

    const handleDate=(e)=>{
        setDate(e.target.value)
    }

    const handleReport=(e)=>{
        setReport(e.target.value)
    }

    const submited =(e)=>{
        e.preventDefault()
        axios.post(`${URL}patients/${par.id}/history`,{
            date:date,
            report:report,
            prescription:JSON.stringify(pres)
})
.then((res)=>{
    console.log('response ',res)
    let hTemp = !history?[]:history
        hTemp.push({
            date:date,
            report:report,
            prescription:pres
        })

setHistory([...hTemp])

reset();
})
.catch((err)=>{
    console.error(err)
})


    }


    const deleteRow = (id)=>{
        axios.delete(`${URL}history/${id}`,)
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
            console.error(err)
        })
    }


const reset=()=>{
    setDate(Date.now())
    setPres([])
    setReport('')

}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

    
   
    return <>

{/* <p>Patient Profile: {par.id} </p> */}
    <p class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">Name: {pat.full_name.toUpperCase()}</p>
    <p class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">Age: {getAge(pat.birth_date)}</p>
    <p class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">Gender: {pat.gender=='m'? "Male":"Female"}</p>
    <p class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">phone: {pat.phone}</p>

    {/* <Modal/> */}


   





<button type="button" class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add History
</button>


<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Add new history</h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
  <form onSubmit={submited}>
    <div class="form-group mb-6">
      <input type="date" class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
        placeholder="Date"
        value={date}
        onChange={handleDate}
        
        />
    </div>
    <div class="form-group mb-6">
      <textarea
      class="
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
      id="exampleFormControlTextarea13"
      rows="3"
      placeholder="Report"
      value={report}
        onChange={handleReport}
    ></textarea>
    </div>
    <div class="form-group mb-6 flex-1">
      <input
      class="
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
      id="exampleFormControlTextarea13"
      rows="3"
      placeholder="Drug"
      value={prescript}
      onChange={prescripthandle}
    />
    <button className="py-1 px-2 rounded-lg bg-sky-400" onClick={Addpres} >Add pres</button>
    <div>{pres.map(p=><li>{p}</li>)}</div>
    </div>
   
     
    <button type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" data-bs-dismiss="modal">Send</button>
  </form>
</div>
      </div>
     
    </div>
  </div>
</div>
<HistoryT history={history} deleteRow={deleteRow}/>
{/* {history.map(h=><li>{h.date}</li>)} */}





    </>




}