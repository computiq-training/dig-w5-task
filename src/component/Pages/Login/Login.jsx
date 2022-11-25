import React, { useContext } from "react";
import { toaster } from "evergreen-ui";
import { useState } from "react";
import LoginInputs from "./login inputs";
import SubmitButton from "./submit button";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../Context/Auth";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const AuthContext = useContext(UserAuth);
  const { login, isAuth } = AuthContext;

  const submit = (e) => {
    e.preventDefault();
    if (Username === "") return toaster.warning("Please enter username");
    if (Password === "") return toaster.warning("Please enter your password");
    login(Username, Password);
  };

  if (isAuth) return <Navigate to="/" />;
  return (
    <section className=" bg-cyan-50 h-screen flex justify-center items-center ">
      <form className=" bg-sky-500 p-12 w-1/4 text-center rounded-lg shadow-2xl">
        <div className="px-10 py-7">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            Clinic
          </h1>
        </div>
        <LoginInputs
          usernameValue={Username}
          passwordValue={Password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <div className="text-left mx-1 text-white">Forget Password?</div>
        <SubmitButton action={submit} />
      </form>
    </section>
  );
};

export default Login;
