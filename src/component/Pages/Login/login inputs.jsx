import React from "react";

const LoginInputs = (props) => {
  const inputStyle =
    "block w-full text-2xl my-7 rounded-md shadow-lg px-3 py-2 outline-none";
  return (
    <div>
      <input
        className={inputStyle}
        type={"text"}
        placeholder="Username"
        value={props.usernameValue}
        onChange={(e) => props.setUsername(e.target.value)}
      />
      <input
        className={inputStyle}
        type={"password"}
        placeholder="Password"
        value={props.passwordValue}
        onChange={(e) => props.setPassword(e.target.value)}
      />
    </div>
  );
};

export default LoginInputs;
