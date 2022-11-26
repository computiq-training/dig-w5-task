import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL, loginURL } from "../Services/WebServices";

const DefaultValue = {
  isAuth: false,
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
  jwtToken: null,
};
export const UserAuth = createContext(DefaultValue);

export const UserAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [Authorized, setAuthorized] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      if (data) {
        if (data.token) {
          setAuthorized(true);
          setJwtToken(data.token);
          setUserData(data);
          axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        }
      }
    } catch (err) {
      console.log("not working");
      console.error(err);
    }
  }, []);

  const Login = (username, password) => {
    axios
      .post(`${BASE_URL}${loginURL}`, {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setJwtToken(res.data.data.token);
        setAuthorized(true);
      })
      .catch((err) => console.log(err));
  };

  const Logout = () => {
    localStorage.removeItem("userData");
    setAuthorized(false);
    setUserData(null);
  };

  return (
    <UserAuth.Provider
      value={{
        isAuth: Authorized,
        login: Login,
        logout: Logout,
        user: userData,
        jwtToken: jwtToken,
      }}
    >
      {children}
    </UserAuth.Provider>
  );
};
