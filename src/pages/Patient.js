import { useEffect, useState,useContext } from "react";
import { json, useParams } from "react-router-dom";
import { URL } from "../constants/web_service";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import NewHistory from "../components/newHistory"
import { Result } from "postcss";
import ReactTable from "react-table"; 
export const Patient = (props)=>{
    const [history,setHistory]=useState([]);
    const authContext = useContext(AuthContext);
    const {user,isAuth,jwtToken} = authContext;
    const [pat,setPat]=useState([]);
    const {id} = useParams()
    const [isOpen,setIsOpen]=useState("false");
    console.log('token passedin 123:',jwtToken)
    console.log('user data from 12312 ',user,isAuth)
console.log("params",id);
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


    useEffect(() => {
        // call api
        axios.get(`${URL}patients/${id}`)
        .then((res)=>{
            console.log('response is ',res.data.data)
            setPat(res.data.data);
            setHistory(res.data.data.history);
           
        })
        .catch((err)=>{
            console.error(err)
        })
        
       

       
    }, []);
   
    
    return <div className="pl-10 pt-10 h-screen	 bg-gray-200">
          <section className="font-bold ">
          <ul>
          <li>Patient Profile</li>
          <li>FULL NAME: {pat.full_name}</li>
          <li>AGE: {pat.birth_date}</li>
          <li>GENDER: {pat.gender}</li>
          <li>PHONE: {pat.phone}</li>
          </ul>
              </section> 
               <button  onClick={(e)=>setIsOpen("true")} type="button" className="my-10 px-6 py-2.5  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
   new
  </button>
               <NewHistory sethistory={setHistory} history={history} id={id} isOpen={isOpen} isOff={()=>setIsOpen("false")}/>
               <div className=" h-[584px] overflow-scroll overflow-x-hidden"  >
               <table className=" w-full border-collapse py-10 my-10 border border-slate-400  ">
  <thead className="bg-cyan-400">
    <tr>
      <th className="border border-slate-300">ID</th>
      <th className="border border-slate-300"> date</th>
      <th className="border border-slate-300">report </th>
      <th className="border border-slate-300">pres</th>
      <th className="border border-slate-300">DELETION</th>
   
    </tr>
  </thead>
  <tbody > 
        {
            history.map((item, index)=>{
                return <tr  >
                <td className="border border-slate-300 text-center">{item._id}</td>
                <td className="border border-slate-300 text-center">{item.date}</td>
                <td className="border border-slate-300 text-center">{item.report}</td>
                <td className="border border-slate-300 ">{item.prescription.map((itemm)=>{ return <li>{itemm}</li>})} </td>              
                <td className="border border-slate-300 text-center"><button className="bg-red-300 p-1" onClick={()=>deleteRow(item._id)}>DELETE</button></td>

              </tr> })

        }
  </tbody>
</table>
</div>
      </div>

}
export default Patient;