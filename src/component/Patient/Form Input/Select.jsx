import React from "react";
import { useContext } from "react";
import themeContext from "../../Context/theme";

const SelectGender = (props) => {
  const context = useContext(themeContext);

  return (
    <select
      onChange={(e) => props.setVal(e.target.value)}
      className={`m-4 shadow-lg p-2 rounded-md text-2xl	outline-none ${context.theme.inputs} ${context.theme.font}`}
    >
      <option value={"male"} defaultValue>
        male
      </option>
      <option value={"female"}>female</option>
    </select>
  );
};

export default SelectGender;
