import { Button } from "./Button";

const PCard = (props)=>{
    const helloFunc = ()=>alert('Hello')
    console.log(props)
    const patient = props.data
    let cls = patient.gender == 'm'?'bg-blue':'bg-pink';
    return <div className={cls}>
        <p>{patient.full_name}</p>
        <p>{patient.gender}</p>
        <p>{patient.phone}</p>
        <Button onClick={helloFunc}>Open</Button>
    </div>
}

export default PCard;