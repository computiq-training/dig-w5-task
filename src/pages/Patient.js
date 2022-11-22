import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Patient = (props)=>{
    
    const par = useParams()

    useEffect(() => {
        // call api
        // paitents/id GET via, axios.get('URL/patients/id').then(res)
        // response
        // change state
        return () => {
            
        };
    }, []);
    return <p>Patient Profile: {par.id}</p>;
}