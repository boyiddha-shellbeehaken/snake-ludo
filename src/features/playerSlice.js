import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player1: 0,
  player2: 0,
  currentPlayer: 1, // Tracks which player's turn it is
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    movePlayer: (state, action) => {
      const { player, value } = action.payload;
      if (player === "player1") {
        state.player1 += value;
      } else if (player === "player2") {
        state.player2 += value;
      }
      //console.log("movePlayer reducer called for:  ", action.payload);
    },
    resetGame(state) {
      state.player1 = 0;
      state.player2 = 0;
      state.currentPlayer = 1;
    },
    switchPlayer: (state) => {
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      //console.log("switchPlayer reducer called");
    },
    onLadder: (state, action) => {
      const { player, value } = action.payload;
      if (player === "player1") {
        state.player1 += value;
      } else if (player === "player2") {
        state.player2 += value;
      }
    },
    onSnake: (state, action) => {
      const { player, value } = action.payload;
      if (player === "player1") {
        state.player1 -= value;
      } else if (player === "player2") {
        state.player2 -= value;
      }
    },
    resetPlayerPosition: (state, action) => {
      const { player } = action.payload;
      if (player === "player1") {
        state.player1 = 0;
      }
      if (player === "player2") {
        state.player2 = 0;
      }
    },
  },
});

export const {
  movePlayer,
  resetGame,
  switchPlayer,
  onLadder,
  onSnake,
  resetPlayerPosition,
} = playerSlice.actions;
export default playerSlice.reducer;
