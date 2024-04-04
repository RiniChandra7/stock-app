import { configureStore } from "@reduxjs/toolkit";
import symbolReducer from "./symbolSlice";
import timeIntervalReducer from "./timeIntervalSlice";
import marketReducer from "./marketSlice";

const appStore = configureStore({
    reducer: {
        symbol: symbolReducer,
        timeInterval: timeIntervalReducer,
        market: marketReducer
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;