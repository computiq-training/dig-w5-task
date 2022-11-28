import {useContext, useState} from 'react';
import PATIENTS from './patients'

const Edit = ({ThisPatient}) =>{

    const id = ThisPatient.id;

    const [fullName , setFullName] = useState('')
    const [phone,setPhone] = useState('')
    const [birthDate,setBirthDate] = useState(new Date())
    const [gender, setGender] = useState('m')

    const {updatePatient} = useContext(PATIENTS);

    const updatedPatient = {fullName, birthDate, gender, phone}

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePatient(id, updatedPatient)
    }

     return (
        <div>

            <form onSubmit={handleSubmit}>
                <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={fullName} onChange={setFullName} type="text" placeholder="Full Name"/>
                <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={phone} onChange={setPhone} type="text" placeholder="Phone"/>
                <input className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={birthDate} onChange={setBirthDate} type="date" placeholder="Birth Date"/>
                <select className="border border-solid py-1 px-2 border-solid  focus:outline-none" value={gender} onChange={setGender}>
                    <option value='m' selected>Male</option>
                    <option value="f">Female</option>
                    </select>
                <input className="py-1 px-2 rounded-lg bg-sky-400" type="submit"/>
                <td className="border border-slate-300"><button className="bg-red-300 p-1" onClick={()=>Edit(ThisPatient.id)}>Edit</button></td>

            </form>
        </div>
  

     )
}

export default Edit;