import { configureStore } from "@reduxjs/toolkit";
import symbolReducer from "./symbolSlice";
import timeIntervalReducer from "./timeIntervalSlice";
import marketReducer from "./marketSlice";

const appStore = configureStore({
    reducer: {
        symbol: symbolReducer,           // Reducer for symbol-related state
        timeInterval: timeIntervalReducer, // Reducer for time interval state
        market: marketReducer              // Reducer for market-related state    
    }
});

// Define and export RootState type for Redux state access
export type RootState = ReturnType<typeof appStore.getState>;

// Define and export AppDispatch type for Redux dispatch operations
export type AppDispatch = typeof appStore.dispatch;

export default appStore;