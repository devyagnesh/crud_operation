import React from "react";
import style from "./Input.module.css";

function Input(props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className={`${style["input__label"]} ${props.className}`}
      >
        {props.label}
      </label>
      <input
        {...props}
        className={`${style["input_controller"]} ${props.className}`}
      />
    </div>
  );
}

export default Input;
