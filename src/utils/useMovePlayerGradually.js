import { useSelector, useDispatch } from "react-redux";
import { movePlayer } from "../features/playerSlice";

export const useMovePlayerGradually = () => {
  const player1 = useSelector((state) => state.player.player1);
  const player2 = useSelector((state) => state.player.player2);
  const dispatch = useDispatch();

  const movePlayerGradually = (player, targetPosition, setIsMoving) => {
    return new Promise((resolve) => {
      setIsMoving(true); // Disable dice roll
      const currentPosition = player === "player1" ? player1 : player2;

      let tempPosition = currentPosition;

      const interval = setInterval(() => {
        if (tempPosition < targetPosition) {
          tempPosition++;
          if (player === "player1") {
            dispatch(movePlayer({ player: "player1", value: 1 }));
          } else {
            dispatch(movePlayer({ player: "player2", value: 1 }));
          }
        } else {
          clearInterval(interval);
          setIsMoving(false); // Enable dice roll
          resolve(); // Notify that movement is complete
        }
      }, 200); // Adjust speed of movement
    });
  };

  return { movePlayerGradually };
};
