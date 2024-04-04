import { createSlice } from "@reduxjs/toolkit";
import { SymbolData } from "../types/types";

interface SymbolState {
    symbolData: SymbolData | null;
    data1min: any;
    data5min: any;
    data15min: any;
    data30min: any;
    data60min: any;
    dataDaily: any;
    dataWeekly: any;
    dataMonthly: any;
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
