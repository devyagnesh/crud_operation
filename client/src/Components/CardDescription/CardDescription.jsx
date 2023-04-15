import React from "react";
import style from "./CardDescription.module.css";
function CardDescription(props) {
  return (
    <p className={`${style["card_description"]} ${props.className}`}>
      {props.content}
    </p>
  );
}

export default CardDescription;
