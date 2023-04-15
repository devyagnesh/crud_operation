import React from "react";
import style from "./CardTitle.module.css";
function CardTitle(props) {
  return (
    <h2 className={`${style["title"]} ${props.className}`}>{props.children}</h2>
  );
}

export default CardTitle;
