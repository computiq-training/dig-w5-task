import { Switch } from "evergreen-ui";
import React from "react";

const Switcher = (props) => {
  return (
    <div className=" mx-6">
      <Switch
        height={24}
        checked={props.check}
        onChange={(e) => props.setCheck(e.target.checked)}
      />
    </div>
  );
};

export default Switcher;
