import { createSlice } from "@reduxjs/toolkit";

interface MarketState {
    marketData: any[];   // Array to hold market data
    currentRegion: any;  // Current region data
}

const initialState: MarketState = {
    marketData: [],      // Initial market data is an empty array
    currentRegion: null  // Initial current region is null
};

const marketSlice = createSlice({
    name: "market",
    initialState,
    reducers: {
        setMarketData(state, action) {
            state.marketData = action.payload;
        },
        setCurrentRegion(state, action) {
            state.currentRegion = action.payload;
        }
    },
});

export const { setMarketData, setCurrentRegion } = marketSlice.actions;
export default marketSlice.reducer;
