import React from "react";

import style from "../assets/styles/ladder.module.css";
import ladder1 from "../assets/images/ladder/ladder1.png";
import ladder2 from "../assets/images/ladder/ladder3.png";
import ladder3 from "../assets/images/ladder/ladder4.png";
import ladder4 from "../assets/images/ladder/ladder2.png";

const LadderImage = () => {
  return (
    <>
      <div className={`${style.ladderImage} ${style.ladder1} `}>
        <img src={ladder1} alt="Ladder1" />
      </div>

      <div className={`${style.ladderImage} ${style.ladder2} `}>
        <img src={ladder2} alt="Ladder2" />
      </div>
      <div className={`${style.ladderImage} ${style.ladder3} `}>
        <img src={ladder3} alt="Ladder3" />
      </div>
      <div className={`${style.ladderImage} ${style.ladder4} `}>
        <img src={ladder4} alt="Ladder4" />
      </div>
    </>
  );
};

export default LadderImage;
