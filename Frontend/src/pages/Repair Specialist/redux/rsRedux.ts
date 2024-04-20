import { createSlice } from "@reduxjs/toolkit";

export interface RepairSpecialistState {
    repairSpecialist: any;
}

export const repairSpecialistSlice = createSlice({
    name: "repairSpecialist",
    initialState: {
        repairSpecialist: null,
    } as RepairSpecialistState,
    reducers: {
        login: (state, action) => {
            state.repairSpecialist = action.payload;
        },
        logout: (state) => {
            state.repairSpecialist = null;
        },
    },
});

export const { login, logout } = repairSpecialistSlice.actions;
export const selectRepairSpecialist = (state: { repairSpecialist: { repairSpecialist: any } }) =>
  state.repairSpecialist.repairSpecialist;
export default repairSpecialistSlice.reducer;
