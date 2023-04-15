import React from "react";
import style from "./CardImage.module.css";
function CardImage(props) {
  return (
    <div className={`${style["card_image"]}`}>
      <img
        src={props.src}
        alt={props.alt}
        className={`${style["card_image_img"]} ${props.className}`}
      />
    </div>
  );
}

export default CardImage;
