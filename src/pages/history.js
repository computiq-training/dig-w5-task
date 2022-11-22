import { Button } from "../components/Button";
const History = ()=>{
    const alertFunc = ()=> alert('Click')
    return <div>
        <p className="text-3xl font-bold underline">History Page</p>
        <Button onClick={alertFunc}>
            <p>Create New History</p>
        </Button>
    </div>
}

export default History;