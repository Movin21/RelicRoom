import { createSlice } from "@reduxjs/toolkit";

export interface AuctioneerState {
  auctioneer: any;
}

export const auctioneerSlice = createSlice({
  name: "auctioneer",
  initialState: {
    auctioneer: null,
  } as AuctioneerState,
  reducers: {
    login: (state, action) => {
      state.auctioneer = action.payload;
    },
    logout: (state) => {
      state.auctioneer = null;
    },
  },
});

export const { login, logout } = auctioneerSlice.actions;
export const selectAuctioneer = (state: { auctioneer: { user: any } }) =>
  state.auctioneer.user;
export default auctioneerSlice.reducer;
