import { useState, useEffect,useContext } from "react"
import PCard from "../components/PatientCard";
import { useSnackbar } from 'react-simple-snackbar'
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import {URL} from '../constants/web_service'

const options = {
    position: 'bottom-right',
    style: {
      backgroundColor: 'midnightblue',
      border: '2px solid lightgreen',
      color: 'lightblue',
      fontSize: '20px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  }
const Patients =  (props)=>{
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [open,close] = useSnackbar(options)
    const [fullName , setFullName] = useState('')
    const [phone,setPhone] = useState('')
    const [birthDate,setBirthDate] = useState(new Date())
    const [gender, setGender] = useState('m')
    const [searchValue,setSearchValue] = useState('')
    const authContext = useContext(AuthContext)
    const {user,isAuth,jwtToken} = authContext;
    console.log('token passed:',jwtToken)
    console.log('user data from auth context is ',user,isAuth)
    const addNew = ()=>{
        if(!fullName || !phone || !birthDate || !gender)
        {
            // alert('Please fill all the info')
            open('Please fill all the info')
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
        setBirthDate(Date.now())
        setGender('m')
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
   

    return <div>
        
    
    <form onSubmit={submit}>
        <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={fullName} onChange={changeFullName} type="text" placeholder="Full Name"/>
        <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={phone} onChange={changePhone} type="text" placeholder="Phone"/>
        <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={birthDate} onChange={changeBD} type="date" placeholder="Birth Date"/>
        <select className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={gender} onChange={genderOnChange}>
            <option value='m' selected>Male</option>
            <option value="f">Female</option>
        </select>
        <input className="py-1 px-2 rounded-lg bg-sky-400" type="submit"/>
    </form>
    <input value={searchValue} onChange={onSearchChange} type="text" placeholder="Search"/>

    {
        // patients?patients.map((item,index)=>{
        //     return <PCard key={index} data={item}/>
        //    })
        //    :
        //    <p>No Data</p>
        <table className="w-full border-collapse border border-slate-400">
  <thead>
    <tr>
      <th className="border border-slate-300">ID</th>
      <th className="border border-slate-300">Full Name</th>
      <th className="border border-slate-300">Birth Date</th>
      <th className="border border-slate-300">Phone</th>
      <th className="border border-slate-300">Gender</th>
      <th className="border border-slate-300">DELETION</th>
    </tr>
  </thead>
  <tbody>
        {
            filteredPatients && filteredPatients.map((item, index)=>{
                return <tr>
                <td className="border border-slate-300">{item._id}</td>
                <td className="border border-slate-300">{item.full_name}</td>
                <td className="border border-slate-300">{item.birth_date}</td>
                <td className="border border-slate-300">{item.phone}</td>
                <td className="border border-slate-300">{item.gender}</td>
                <td className="border border-slate-300"><button className="bg-red-300 p-1" onClick={()=>deleteRow(item._id)}>DELETE</button></td>

              </tr>
            })
        }
  </tbody>
</table>
    }
</div>
}

export default Patients;