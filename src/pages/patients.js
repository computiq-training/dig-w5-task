import React from 'react'
import { useState, useEffect,useContext } from "react"
import PCard from "../components/PatientCard";
import { useSnackbar } from 'react-simple-snackbar'
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import {URL} from '../constants/web_service'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const options = {
    position: 'bottom-right',
    style: {
        backgroundColor: 'black',
        border: '2px solid DarkRed',
        color: 'white',
        fontSize: '20px',
        textAlign: 'center',
    },
    closeStyle: {
        color: 'red',
        fontSize: '16px',
    },
}

const Patients =  (props)=>{
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [open,close] = useSnackbar(options)
    const [fullName , setFullName] = useState('')
    const [phone,setPhone] = useState('')
    const [birthDate,setBirthDate] = useState()
    const [gender, setGender] = useState('Male')
    const [searchValue,setSearchValue] = useState('')
    const authContext = useContext(AuthContext)
    const {user,isAuth,jwtToken} = authContext;
    const navigate=useNavigate();
    console.log('token passed:',jwtToken)
    console.log('user data from auth context is ',user,isAuth)
    const addNew = ()=>{
        if(!fullName || !phone || !birthDate || !gender)
        {
            open('Please Enter The INFO')
            return;
        }
        axios.post(`${URL}patients`,{
                    full_name:fullName,
                    birth_date:birthDate,
                    gender:gender,
                    phone:phone,
                    code:'1'
        })
        .then((res)=>{
            console.log('response ',res)
            let pTemp = !patients?[]:patients
                pTemp.push({
                    _id:res.data.data._id,
                    full_name:fullName,
                    birth_date:birthDate,
                    gender:gender,
                    phone:phone
                })

        setPatients([...pTemp])
        setFilteredPatients([...pTemp])
        reset();
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const changeFullName = (e)=>{
        let v = e.target.value
        console.log(v)
        setFullName(v)
    }

    const changePhone = (e)=>{
        setPhone(e.target.value)
    }
    const changeBD = (e)=>{
        console.log('date',e.target.value)
        setBirthDate(e.target.value)
    }

    const genderOnChange = (e)=>{
        setGender(e.target.value)
    }
    const submit = (e)=>{
        e.preventDefault()
        addNew()
    }

    const reset = ()=>{
        setFullName('')
        setBirthDate('')
        setGender('Male')
        setPhone('')
    }

    const onSearchChange = (e)=>{
    
        setSearchValue(e.target.value)
        
        // search logic
        // 1
        let search = e.target.value;
        // check  if value is empty
        if(!search)
        {
            setFilteredPatients(patients)
            return;
        }
        // 2
        let results = patients.filter((item)=>{
            return item.full_name.toLowerCase().includes(search.toLowerCase()) || item.phone.includes(search)
        })
        
        console.log('results:  ',results)
        setFilteredPatients(results)

    }
    const deleteRow = (id)=>{
        axios.delete(`${URL}patients/${id}`,)
        .then((res)=>{
            console.log('response after deletion',res)
            let temp = patients;
            console.log(id,'deleted')
            let index = temp.findIndex((item)=>{
            return item._id === id
        })
        console.log('index,',index)
        console.log('length before',temp.length)
        temp.splice(index,1)
        console.log('length after',temp.length)

        setPatients([...temp])
        setFilteredPatients([...temp])
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const route_history =(id)=>{
        console.log('route_history id:',id);
        navigate(`/history/${id}`);
    }

    useEffect(() => {
        axios.get(`${URL}patients`)
        .then((res)=>{
            console.log('response is ',res)
            setPatients(res.data.data)
            setFilteredPatients(res.data.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }, []);
   

    return <section className="px-10 py-8 bg-[#f2f8ff] h-screen" >
        
    
    <form onSubmit={submit}>
        <input className="rounded-lg input_text border  py-1 px-2 border-solid  focus:outline-none" value={fullName} onChange={changeFullName} type="text" placeholder="Full Name"/>
        <input className="rounded-lg input_text border  py-1 px-2 border-solid  focus:outline-none" value={phone} onChange={changePhone} type="text" placeholder="Phone"/>
        <input className="rounded-lg input_text border  py-1 px-2 border-solid  focus:outline-none" value={birthDate} onChange={changeBD} type="date" placeholder="Birth Date"/>
        <select className="rounded-lg input_text border py-1 px-2 border-solid  focus:outline-none" value={gender} onChange={genderOnChange}>
            <option value='Male' defaultValue>Male</option>
            <option value="Female">Female</option>
        </select>
        {}
        <button 
        className="inline-block px-8 py-3.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="submit">Add New</button>
    </form>
    <input className="rounded-lg input_search" value={searchValue} onChange={onSearchChange} type="text" placeholder="Search"/>

    {
        <table className="w-full border-collapse border border-slate-400">
            <thead>
                <tr>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">Full Name</th>
                    <th className="border border-slate-300">Birth Date</th>
                    <th className="border border-slate-300">Phone</th>
                    <th className="border border-slate-300">Gender</th>
                    <th className="border border-slate-300">Event</th>
                    <th className="border border-slate-300">More INFO</th>
                </tr>
            </thead>
            <tbody>
        {
            filteredPatients && filteredPatients.length>0?filteredPatients.map((item, index)=>{
                return <tr key={index}  >
                <td onClick={(_id)=>route_history(item._id)} className="border border-slate-300">{item._id}</td>
                <td onClick={(_id)=>route_history(item._id)} className="border border-slate-300">{item.full_name}</td>
                <td onClick={(_id)=>route_history(item._id)} className="border border-slate-300">{item.birth_date}</td>
                <td onClick={(_id)=>route_history(item._id)} className="border border-slate-300">{item.phone}</td>
                <td onClick={(_id)=>route_history(item._id)} className="border border-slate-300">{item.gender}</td>
                <td className="border border-slate-300">
                    <button 
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={()=>deleteRow(item._id)}>Delete</button></td>
                <td className="border border-slate-300"><Link to={"/history/"+item._id}>More INFO</Link></td>
            </tr>
            })
            :
            <tr><td><p>No Data Found</p></td></tr>
        }
    </tbody>
</table>
    }
</section>
}

export default Patients;