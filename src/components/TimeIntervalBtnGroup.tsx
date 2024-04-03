import React, { useState } from "react";
import TimeIntervalButton from "./TimeIntervalButton";
import { AVAILABLE_TIME_INTERVALS } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setTimeInterval } from "../utils/timeIntervalSlice";
import timeApiCall from "../utils/timeApiCall";
import { setData15min, setData1min, setData30min, setData5min, setData60min, setDataDaily, setDataWeekly } from "../utils/symbolSlice";

const TimeIntervalBtnGroup: React.FC = () => {
    const intervals = AVAILABLE_TIME_INTERVALS;
    const dispatch = useAppDispatch();
    const symbol = useAppSelector(store => store.symbol.symbolData);
    const [lastSymbol, setLastSymbol] = useState<string | null>(null);
    const [lastInterval, setLastInterval] = useState<string | null>(null);

    const handleIntervalClick = async (interval: string): Promise<void> => {
        console.log(interval);
        dispatch(setTimeInterval(interval));

        if (symbol != null && (symbol["1. symbol"] !== lastSymbol || interval !== lastInterval)) {
            setLastSymbol(symbol["1. symbol"]);
            setLastInterval(interval);
            await timeApiCall(symbol["1. symbol"], interval)
            .then((json) => {
                console.log(json);
                const keyName = Object.keys(json)[1];
                console.log(keyName);
                switch (interval) {
                    case "1min":
                        console.log("Dispatch fired for 1 min");
                        dispatch(setData1min(json[keyName]));
                        break;
                    case "5min":
                        console.log("Dispatch fired for 5 min");
                        dispatch(setData5min(json[keyName]));
                        break;
                    case "15min":
                        console.log("Dispatch fired for 15 min");
                        dispatch(setData15min(json[keyName]));
                        break;
                    case "30min":
                        console.log("Dispatch fired for 30 min");
                        dispatch(setData30min(json[keyName]));
                        break;
                    case "60min":
                        console.log("Dispatch fired for 15 min");
                        dispatch(setData60min(json[keyName]));
                        break;
                    case "day":
                        console.log("Dispatch fired for day");
                        dispatch(setDataDaily(json[keyName]));
                        break;
                    case "week":
                        console.log("Dispatch fired for week");
                        dispatch(setDataWeekly(json[keyName]));
                        break;
                    default:
                        break;
                }
                
            })
        } 
    };

    return (
        <div className="flex justify-start items-center h-full p-4">
            {intervals.map((interval, index) => (
                <TimeIntervalButton key={index} interval={interval} onClick={() => handleIntervalClick(interval)} />
            ))}
        </div>
    );
};

export default TimeIntervalBtnGroup;
