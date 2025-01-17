import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";

import p1 from "../assets/images/player/red.png";
import p2 from "../assets/images/player/blue.png";
import styles from "../assets/styles/scoreCard.module.css";

const LiveScoreCard = memo(() => {
  const player1 = useSelector((state) => state.player.player1);
  const player2 = useSelector((state) => state.player.player2);
  const currentPlayer = useSelector((state) => state.player.currentPlayer);

  return (
    <>
      <div className={styles.pl1}>
        <img
          src={p1}
          alt="Player Icon"
          className={` ${styles.image} ${
            currentPlayer === 1 ? styles.blinking : ""
          }`}
        />
        <span style={{ paddingLeft: "40px" }}>Red : {player1}</span>
      </div>

      <div className={styles.pl2}>
        <img
          src={p2}
          alt="Player Icon"
          className={` ${styles.image} ${
            currentPlayer === 2 ? styles.blinking : ""
          }`}
        />
        <span style={{ paddingLeft: "40px" }}>Blue : {player2}</span>
      </div>
    </>
  );
});

export default LiveScoreCard;
