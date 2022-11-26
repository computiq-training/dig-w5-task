import { useContext } from "react";
import themeContext from "../../Context/theme";
import React from "react";

function FormInputs(props) {
  const context = useContext(themeContext);
  return (
    <input
      className={` m-4 shadow-lg p-2 rounded-md text-2xl	outline-none ${context.theme.inputs} ${context.theme.font}`}
      type={props.type ? props.type : "text"}
      value={props.val}
      onChange={(e) => props.setVal(e.target.value)}
      placeholder={props.PlaceHolder}
    />
  );
}

export default FormInputs;
