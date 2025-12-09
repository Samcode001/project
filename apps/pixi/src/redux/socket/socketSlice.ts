import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  token: string | null;
  userId: string | null;
  avatarId: string | null;
}

const initialState: SocketState = {
  socket: null,
  token: null,
  userId: null,
  avatarId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketData: (state, action) => {
      state.socket = action.payload.socket;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.avatarId = action.payload.avatarId;
    },
  },
});

export const { setSocketData } = socketSlice.actions;
export default socketSlice.reducer;
