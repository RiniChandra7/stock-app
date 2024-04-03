import { configureStore } from "@reduxjs/toolkit";
import symbolReducer from "./symbolSlice";
import timeIntervalReducer from "./timeIntervalSlice";

const appStore = configureStore({
    reducer: {
        symbol: symbolReducer,
        timeInterval: timeIntervalReducer
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;