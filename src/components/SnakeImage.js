import React from "react";

import style from "../assets/styles/snake.module.css";
import snake1 from "../assets/images/snake/snake1.png";
import snake2 from "../assets/images/snake/snake4.png";
import snake3 from "../assets/images/snake/snake3.png";
import snake4 from "../assets/images/snake/snake2.png";

const SnakeImage = () => {
  return (
    <>
      <div className={`${style.snakeImage} ${style.snake1} `}>
        <img src={snake1} alt="Snake1" />
      </div>
      <div className={`${style.snakeImage} ${style.snake2} `}>
        <img src={snake2} alt="Snake2" />
      </div>
      <div className={`${style.snakeImage} ${style.snake3} `}>
        <img src={snake3} alt="Snake3" />
      </div>

      <div className={`${style.snakeImage} ${style.snake4} `}>
        <img src={snake4} alt="Snake4" />
      </div>
    </>
  );
};

export default SnakeImage;
