import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeState {
    interval: string;
}

const initialState: TimeState = {
    interval: "",
};

const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        setTimeInterval(state, action: PayloadAction<string>) {
            state.interval = action.payload;
        },
    },
});

export const { setTimeInterval } = timeSlice.actions;
export default timeSlice.reducer;
