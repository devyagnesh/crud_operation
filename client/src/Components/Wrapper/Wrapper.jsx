import React from "react";
import style from "./Wrapper.module.css";
function Wrapper(props) {
  return (
    <div className={`${style["wrapper"]} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Wrapper;
