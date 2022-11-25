import React from "react";

const SubmitButton = (props) => {
  return (
    <button
      className="bg-gradient-to-r from-cyan-400 to-blue-300 text-white
                     px-40 py-3 rounded-md shadow-lg outline-none my-10 
                    text-2xl transition ease-in-out delay-3 focus:scale-95 tracking-wide"
      onClick={props.action}
    >
      LOGIN
    </button>
  );
};

export default SubmitButton;
