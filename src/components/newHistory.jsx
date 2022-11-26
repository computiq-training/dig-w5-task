import React from "react"
import { useState,useContext } from "react"
import { useSnackbar } from 'react-simple-snackbar'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {URL} from '../constants/web_service'

const NewHistory =({id,isOpen,isOff,history,sethistory})=>{
  const [pres1 , setPres1] = useState([])
  const navigate=useNavigate()
  const [pres , setPres] = useState([])
  const [report,setReport] = useState('')
  const [date,setDate] = useState()
  console.log(isOpen);  
  const addNew = ()=>{
    console.log("iddd",id);
    if(!isNaN(date) || !report )
    {
        // alert('Please fill all the info')
        alert('Please fill all the info')
        return;
    }
    axios.post(`${URL}patients/${id}/history`,{
      
                date:date,
                report:report,
                prescription:JSON.stringify(pres1)
               
    })
    .then((res)=>{
        console.log('response ',res)
        let hTemp = !history?[]:history
            hTemp.push({
                _id:res.data.data._id,
                        date:date,
                        report:report, 
                        prescription:pres1
            })

    sethistory([...hTemp])
    
    reset();
    
    })
    .catch((err)=>{
        console.error(err)
    })
}
const reset = ()=>{
  setDate("");
  setReport('');
  setPres([]);
  setPres1([]);
}
  
const changeReport = (e)=>{
  let v = e.target.value
  console.log(v)
  setReport(v)
}
  const changeDate = (e)=>{
    let v = e.target.value
    console.log(v)
    setDate(v)
   
}
const changePres = (e)=>{
    let v = e.target.value
  setPres(v)
   
  }
    const clickPres = ()=>{
      let hhTemp = !pres1?[]:pres1
      hhTemp.push(...[pres])
      setPres1([...hhTemp])
      setPres([])
      
          } 
const submit = (e)=>{
  setPres([])
  e.preventDefault()
addNew()
  
  
}
console.log("pattewqweqwttt",);

  if(isOpen==="false") return null;

    return <div className="fixed top-24 left-0 right-0   ">
    
  <div>
              
  <div className=" flex justify-center   outline-none overflow-x-hidden overflow-y-auto ">
    <div>
      <div
        className=" border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div 
          className=" flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">New history</h5>
          
        </div >
        <div className="">
            <form className="grid place-items-center m-5	p-5" >
        <input className="border border-solid py-1 px-2 m-5 border-solid  focus:outline-none" value={date} onChange={changeDate} required type="date" placeholder="date"/>
        <input className="h-48 w-64  border border-solid m-5 py-1 px-2 border-solid  focus:outline-none" value={report} onChange={changeReport} type="text" placeholder="report"/>
        <input className="border border-solid py-1 px-2 m-5 border-solid  focus:outline-none" value={pres} onChange={changePres} type="text" placeholder="pres"/>
         <button className="my-10 px-6 py-2.5  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value={pres1} type='button' onClick={clickPres}>+</button>
         <div>{pres1.map((item)=>{ return <li className="flex-wrap">{item}</li>})}</div>
        
    </form>
   
     
        </div>
        <div
          class=" flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button onClick={()=>{isOff();  reset ()}} type="button" class="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Close</button>
          <button onClick={submit} type="submit" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Save changes</button>
        </div>  
      </div>
    </div>
  </div>
                </div></div>
}
export default NewHistory;

// <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
//   id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog relative w-auto pointer-events-none">
//     <div
//       class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
//       <div
//         class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
//         <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Modal title</h5>
//         <button type="button"
//           class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
//           data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body relative p-4">
//         Modal body text goes here.
//       </div>
//       <div
//         class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
//         <button type="button" class="px-6
//           py-2.5
//           bg-purple-600
//           text-white
//           font-medium
//           text-xs
//           leading-tight
//           uppercase
//           rounded
//           shadow-md
//           hover:bg-purple-700 hover:shadow-lg
//           focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
//           active:bg-purple-800 active:shadow-lg
//           transition
//           duration-150
//           ease-in-out" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="px-6
//       py-2.5
//       bg-blue-600
//       text-white
//       font-medium
//       text-xs
//       leading-tight
//       uppercase
//       rounded
//       shadow-md
//       hover:bg-blue-700 hover:shadow-lg
//       focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
//       active:bg-blue-800 active:shadow-lg
//       transition
//       duration-150
//       ease-in-out
//       ml-1">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>