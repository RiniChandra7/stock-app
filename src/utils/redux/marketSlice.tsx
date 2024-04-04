import { createSlice } from "@reduxjs/toolkit";

interface MarketState {
    marketData: any[];
    currentRegion: any;
}

const initialState: MarketState = {
    marketData: [],
    currentRegion: null
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
