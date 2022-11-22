import axios from "axios";
import { createContext,useState,useEffect } from "react";
import { URL } from "../constants/web_service";
const defaultValue = {
    isAuth:false,
    user:null,
    login:()=>Promise.resolve(),
    logout: ()=>{}
}
export const AuthContext = createContext(defaultValue)


export const AuthProvider = ({children})=>{
    const [userData, setUserData] = useState(null);
    const [isUserAuth, setIsUserAuth] = useState(false);
    const [jwtToken, setJwtToken] = useState('')
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('userData'))   
            if(data)
        {
            if(data.token)
            {
                setJwtToken(data.token)
                setIsUserAuth(true)
                setUserData(data)
                axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

            }
            
            
        }
        } catch (err) {
            console.error(err)
        }
        

    }, []);
    const loginFun =  (username, password)=>{
        console.log('login triggered')
        axios.post(`${URL}auth/signin`,{
            username:username,
            password:password
        })
        .then((res)=>{
            console.log(res)
            localStorage.setItem('userData',JSON.stringify(res.data.data))
            setIsUserAuth(true);
            setUserData(res.data.data)
            setJwtToken(res.data.data.token)
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.data.token}`;

            console.log('state updated')
        })
        .catch((e=>{
            console.log('Error')
            console.error(e)
        }))
    }

    const logoutFun = ()=>{
        localStorage.removeItem('userData')
        setIsUserAuth(false)
        setUserData(null)
        delete axios.defaults.headers.common.Authorization;

    }
    console.log('is auth value: ',isUserAuth)
    return <AuthContext.Provider
    value={{
        isAuth:isUserAuth,
        user:userData,
        login:loginFun,
        logout:logoutFun,
        jwtToken:jwtToken
    }}>
        {children}
    </AuthContext.Provider>
}