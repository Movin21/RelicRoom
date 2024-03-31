import { createSlice } from "@reduxjs/toolkit";

export interface BidderState {
    bidder: any;
}

export const bidderSlice = createSlice({
    name: "bidder",
    initialState: {
        bidder: null,
    } as BidderState,
    reducers: {
        login: (state, action) => {
            state.bidder = action.payload;
        },
        logout: (state) => {
            state.bidder = null;
        },
    },
});

export const { login, logout } = bidderSlice.actions;
export const selectBidder = (state: { admin: { user: any } }) =>
  state.admin.user;
export default bidderSlice.reducer;
