import React from "react";
import style from "./Button.module.css";
function Button(props) {
  return (
    <button {...props} className={`${style["btn"]} ${props.className}`}>
      {props.children}
    </button>
  );
}

export default Button;
