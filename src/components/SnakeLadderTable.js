import React from "react";
import { useSelector } from "react-redux";

import style from "../assets/styles/snakeLadderTable.module.css";
import SnakeImage from "./SnakeImage";
import LadderImage from "./LadderImage";
import Player1Token from "../assets/images/player/red.png";
import Player2Token from "../assets/images/player/blue.png";
import { ROWS, COLUMNS } from "../constant";

const SnakeLadderTable = () => {
  const player1Position = useSelector((state) => state.player.player1);
  const player2Position = useSelector((state) => state.player.player2);
  const currentPlayer = useSelector((state) => state.player.currentPlayer);
  const isSameCell = player1Position === player2Position ? true : false;

  const generateBoardNumbers = () => {
    const board = [];
    let number = ROWS * COLUMNS;

    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLUMNS; j++) {
        row.push(number--);
      }
      // Reverse the order for alternate rows to create a zigzag pattern
      if (i % 2 !== 0) {
        row.reverse();
      }
      board.push(row);
    }
    return board;
  };

  const boardNumbers = generateBoardNumbers();
  return (
    <div className={style.snakeLadderTable}>
      {boardNumbers.map((row, rowIndex) => (
        <div className={style.row} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className={style.cell} key={cellIndex}>
              {cell === player1Position ? (
                <div className={`${style.token} ${style.cellImage}`}>
                  <img
                    src={Player1Token}
                    alt="Player1Token"
                    style={{
                      transform: isSameCell ? "translate(-35%, 40%)" : "",
                    }}
                    className={currentPlayer === 1 ? style.blink : ""}
                  />
                  {isSameCell ? (
                    <img
                      src={Player2Token}
                      alt="Player2Token"
                      style={{
                        transform: isSameCell ? "translate(30%, -50%)" : "",
                      }}
                      className={currentPlayer === 2 ? style.blink : ""}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : cell === player2Position ? (
                <div className={` ${style.token} ${style.cellImage} `}>
                  <img
                    src={Player2Token}
                    alt="Ladder"
                    style={{
                      transform: isSameCell ? "translate(30%, -50%)" : "",
                    }}
                    className={currentPlayer === 2 ? style.blink : ""}
                  />
                  {isSameCell ? (
                    <img
                      src={Player1Token}
                      alt="Player1Token"
                      style={{
                        transform: isSameCell ? "translate(-35%, 40%)" : "",
                      }}
                      className={currentPlayer === 1 ? style.blink : ""}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <span>{cell}</span>
              )}
            </div>
          ))}
        </div>
      ))}

      <SnakeImage />
      <LadderImage />
    </div>
  );
};

export default SnakeLadderTable;
