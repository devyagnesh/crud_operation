import React from "react";
import style from "./CardFooter.module.css";
function CardFooter(props) {
  return (
    <div className={`${style["cardFooter"]} ${props.className}`}>
      <p>{props.date}</p>
      <p>{props.author}</p>
    </div>
  );
}

export default CardFooter;
