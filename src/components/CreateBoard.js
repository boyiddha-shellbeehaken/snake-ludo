import React from "react";
import { useSelector } from "react-redux";

import styles from "../assets/styles/board.module.css";
import SnakeLadderTable from "./SnakeLadderTable";
import LiveScoreCard from "./LiveScoreCard";
import RollDiceCard from "./RollDiceCard";
import firstPlayer from "../assets/images/player/red.png";
import secondPlayer from "../assets/images/player/blue.png";

const CreateBoard = () => {
  const player1Position = useSelector((state) => state.player.player1);
  const player2Position = useSelector((state) => state.player.player2);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Snake - Ladder Game</h1>

      <div className={styles.flexContainer}>
        <div className={styles.ludoBoard}>
          <SnakeLadderTable />
        </div>

        <div className={styles.scoreBoard} style={{ alignSelf: "center" }}>
          <LiveScoreCard />
          <hr></hr>
          <RollDiceCard />
          <div className={styles.initialPosition}>
            {player1Position === 0 && (
              <span>
                <img
                  src={firstPlayer}
                  alt="Player Icon"
                  className={styles.image}
                />
              </span>
            )}

            {player2Position === 0 && (
              <span>
                <img
                  src={secondPlayer}
                  alt="Player Icon"
                  className={styles.image}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBoard;
