import React from "react";

const AddElement = (props) => {
  return (
    <input
      type={"submit"}
      value={"Add new"}
      onClick={props.method}
      className="m-4 shadow-lg py-2 px-10 rounded-md 
                text-2xl outline-none transition ease-in-out
                delay-30 bg-blue-500 
                active:scale-105 hover:duration-300 ..."
    />
  );
};

export default AddElement;
