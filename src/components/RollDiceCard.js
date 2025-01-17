import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, memo } from "react";

import {
  movePlayer,
  resetGame,
  switchPlayer,
  resetPlayerPosition,
} from "../features/playerSlice";
import diceStyle from "../assets/styles/dice.module.css";
import overlayStyle from "../assets/styles/overlay.module.css";
import winSoundFile from "../assets/sounds/winSoundEffect.mp3";
import { useMovePlayerGradually } from "../utils/useMovePlayerGradually";
import { useHandelLadderSnake } from "../utils/useHandleLadderSnake";

const RollDiceCard = memo(() => {
  const [diceValue, setDiceValue] = useState("--");
  const [diceColor, setDiceColor] = useState("orange");
  const [winner1, setWinner1] = useState(null); // Tracks the winner
  const [winner2, setWinner2] = useState(null);
  const [player, setPlayer] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // Tracks overlay visibility
  const [SinglePlayerOnly, setSinglePlayerOnly] = useState(false); // Tracks when play only one after a winning
  const [isMoving, setIsMoving] = useState(false);
  const { movePlayerGradually } = useMovePlayerGradually("", 0, null);
  const { handleLadderSnake } = useHandelLadderSnake("", 0);

  const dispatch = useDispatch();
  const player1 = useSelector((state) => state.player.player1);
  const player2 = useSelector((state) => state.player.player2);
  const currentPlayer = useSelector((state) => state.player.currentPlayer);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRollDice = async () => {
    if (isMoving) return; // Prevent dice roll during movement

    let diceValue = getRandomNumber(1, 6);

    setDiceValue(diceValue); // Update the random number
    if (currentPlayer === 1) setDiceColor("red");
    else setDiceColor("blue");

    const winSound = new Audio(winSoundFile);

    if (currentPlayer === 1) {
      if (player1 > 0) {
        if (player1 + diceValue <= 100) {
          // gradually move player1
          const targetPosition = player1 + diceValue;
          await movePlayerGradually("player1", targetPosition, setIsMoving);
          handleLadderSnake("player1", targetPosition);
        } else {
          if (player1 === 100 && diceValue === 1) {
            // Player1 Win
            setWinner1("Player-1");
            setPlayer("Player-1: ");
            setShowOverlay(true);
            winSound.play();
            dispatch(resetPlayerPosition({ player: "player1" }));
          }
        }
      } else {
        if (diceValue === 1) {
          dispatch(movePlayer({ player: "player1", value: diceValue }));
        }
      }
    } else {
      if (player2 > 0) {
        if (player2 + diceValue <= 100) {
          // gradually move player2
          const targetPosition = player2 + diceValue;
          await movePlayerGradually("player2", targetPosition, setIsMoving);
          handleLadderSnake("player2", targetPosition);
        } else {
          if (player2 === 100 && diceValue === 1) {
            // player2 Win
            setWinner2("Player-2");
            setPlayer("Player-2: ");
            setShowOverlay(true);
            winSound.play();
            dispatch(resetPlayerPosition({ player: "player2" }));
          }
        }
      } else {
        if (diceValue === 1) {
          dispatch(movePlayer({ player: "player2", value: diceValue }));
        }
      }
    }

    //After all movement switch player turn
    if (!SinglePlayerOnly) {
      dispatch(switchPlayer());
    }
  };
  const handleReset = () => {
    dispatch(resetGame());
    setShowOverlay(false);
    setWinner1(null);
    setWinner2(null);
    setSinglePlayerOnly(false);
    setDiceColor("orange");
    setDiceValue("--");
  };

  const handleContinueGame = () => {
    // Rolling for only one player after a Winning
    setShowOverlay(false);
    if (winner1 === "Player-1" && winner2 === "Player-2") {
      handleReset();
    } else setSinglePlayerOnly(true);
  };

  return (
    <>
      <div className={diceStyle.dice}>
        <div
          className={diceStyle.diceDisplay}
          style={{ backgroundColor: diceColor }}
        >
          {diceValue}
        </div>

        <button
          onClick={handleRollDice}
          style={{ display: isMoving ? "none" : "block" }}
        >
          <i className="fa fa-spinner fa-spin"></i> Roll Dice
        </button>
      </div>
      <button className={diceStyle.resetBtn} onClick={handleReset}>
        <i
          className="fa fa-refresh fa-spin"
          style={{ fontSize: "24px", color: "red" }}
        ></i>
        {" 0Reset"}
      </button>

      {showOverlay && (
        <div className={overlayStyle.overlay}>
          <div className={overlayStyle.overlayContent}>
            <h2>{player} Wins!</h2>
            <button onClick={handleReset}>End Game</button>
            {winner1 === null || winner2 === null ? (
              <button onClick={handleContinueGame}>Continue Game</button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default RollDiceCard;
