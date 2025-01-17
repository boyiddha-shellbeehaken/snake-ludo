import { useDispatch } from "react-redux";

import { onLadder, onSnake } from "../features/playerSlice";
import ladderSoundFile from "../assets/sounds/ladderClimbSound.mp3";
import snakeSoundFile from "../assets/sounds/snakeBiteSound.mp3";

export const useHandelLadderSnake = () => {
  const dispatch = useDispatch();

  const handleLadderSnake = (player, position) => {
    const ladders = [
      { start: 20, end: 59 },
      { start: 57, end: 98 },
      { start: 15, end: 66 },
      { start: 29, end: 70 },
    ];

    const snakes = [
      { start: 97, end: 46 },
      { start: 79, end: 25 },
      { start: 55, end: 8 },
      { start: 93, end: 28 },
    ];

    const ladder = ladders.find((ladderData) => ladderData.start === position);
    const snake = snakes.find((snakeData) => snakeData.start === position);

    const ladderSound = new Audio(ladderSoundFile);
    const snakeSound = new Audio(snakeSoundFile);

    if (ladder) {
      setTimeout(() => {
        ladderSound.play();
        if (player === "player1") {
          // Dispatch the onLadder action when player1 reaches the bottom of a ladder
          dispatch(
            onLadder({
              player: "player1",
              value: ladder.end - position,
            })
          );
        } else if (player === "player2") {
          // Dispatch the onLadder action when player2 reaches the bottom of a ladder
          dispatch(
            onLadder({
              player: "player2",
              value: ladder.end - position,
            })
          );
        }
      }, 300); // Take times to move
    }
    if (snake) {
      snakeSound.play();
      setTimeout(() => {
        if (player === "player1") {
          // Dispatch the onSnake action when player1 reaches at the head of a snake
          dispatch(
            onSnake({
              player: "player1",
              value: position - snake.end,
            })
          );
        } else if (player === "player2") {
          // Dispatch the onSnake action when player2 reaches the the head of a snake
          dispatch(
            onSnake({
              player: "player2",
              value: position - snake.end,
            })
          );
        }
      }, 300); // Take times to move
    }
  };

  return { handleLadderSnake };
};
