import { createSlice } from "@reduxjs/toolkit";
import { SymbolData } from "../../types/types";

// Define the shape of the symbol-related state
interface SymbolState {
    symbolData: SymbolData | null;  // Holds the selected symbol data
    data1min: any;                  // Time series data for 1-minute interval
    data5min: any;                  // Time series data for 5-minute interval
    data15min: any;                 // Time series data for 15-minute interval
    data30min: any;                 // Time series data for 30-minute interval
    data60min: any;                 // Time series data for 60-minute interval
    dataDaily: any;                 // Time series data for daily interval
    dataWeekly: any;                // Time series data for weekly interval
    dataMonthly: any;               // Time series data for monthly interval
}

const initialState: SymbolState = {
    symbolData: null,
    data1min: null,
    data5min: null,
    data15min: null,
    data30min: null,
    data60min: null,
    dataDaily: null,
    dataWeekly: null,
    dataMonthly: null
};

const symbolSlice = createSlice({
    name: "symbol",
    initialState,
    reducers: {
        changeSymbol: (state, action) => {
            state.symbolData = action.payload;
        },
        // Reducer functions to update time series data for different intervals
        setData1min: (state, action) => {
            state.data1min = action.payload;
        },
        setData5min: (state, action) => {
            state.data5min = action.payload;
        },
        setData15min: (state, action) => {
            state.data15min = action.payload;
        },
        setData30min: (state, action) => {
            state.data30min = action.payload;
        },
        setData60min: (state, action) => {
            state.data60min = action.payload;
        },
        setDataDaily: (state, action) => {
            state.dataDaily = action.payload;
        },
        setDataWeekly: (state, action) => {
            state.dataWeekly = action.payload;
        },
        setDataMonthly: (state, action) => {
            state.dataMonthly = action.payload;
        },
        // Reducer function to reset all time series data to null
        resetAllTimeData: (state) => {
            state.data1min = null;
            state.data5min = null;
            state.data15min = null;
            state.data30min = null;
            state.data60min = null;
            state.dataDaily = null;
            state.dataWeekly = null;
            state.dataMonthly = null;
        }
    }
});

export const { changeSymbol, setData1min, setData5min, setData15min, setData30min, setData60min, setDataDaily, setDataWeekly, setDataMonthly, resetAllTimeData } = symbolSlice.actions;

export default symbolSlice.reducer;
