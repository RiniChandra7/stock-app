import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeState {
    interval: string;  // Holds the selected time interval
}

const initialState: TimeState = {
    interval: "",  // Initial interval is empty
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
