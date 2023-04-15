import React from "react";
import style from "./Flex.module.css";

function Flex(props) {
  return <div className={style["flex"]}>{props.children}</div>;
}

export default Flex;
