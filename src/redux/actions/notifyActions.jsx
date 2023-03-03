import { createSlice } from "@reduxjs/toolkit";

const initialNotifState = {
    notif: {
        type: "",
        msg: "",
    },
};

const notifSlice = createSlice({
    name: "ui",
    initialState: initialNotifState,
    reducers: {
        notif: (state, action) => {
            state.notif.type = action.payload.type;
            state.notif.msg = action.payload.msg;
        },
    },
});
export default notifSlice;
export const notifActions = notifSlice.actions;