import React, { useState } from "react";
import TimeIntervalButton from "./TimeIntervalButton";
import { AVAILABLE_TIME_INTERVALS } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setTimeInterval } from "../utils/redux/timeIntervalSlice";
import timeApiCall from "../utils/timeApiCall";
import swalErrFire from "../utils/swalErrFire";
import { setData15min, setData1min, setData30min, setData5min, setData60min, setDataDaily, setDataMonthly, setDataWeekly } from "../utils/redux/symbolSlice";

const TimeIntervalBtnGroup: React.FC = () => {
    const intervals = AVAILABLE_TIME_INTERVALS;
    const dispatch = useAppDispatch();
    const symbol = useAppSelector(store => store.symbol.symbolData);
    const [lastSymbol, setLastSymbol] = useState<string | null>(null);
    const [lastInterval, setLastInterval] = useState<string | null>(null);

    const handleIntervalClick = async (interval: string): Promise<void> => {
        console.log(interval);
        

        if (symbol != null && (symbol["1. symbol"] !== lastSymbol || interval !== lastInterval)) {
            dispatch(setTimeInterval(interval));
            setLastSymbol(symbol["1. symbol"]);
            setLastInterval(interval);
            timeApiCall(symbol["1. symbol"], interval)
            .then((json) => {
                console.log(json);
                console.log(Object.keys(json).length);
                if (Object.keys(json).length > 1) {
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
                        case "month":
                            console.log("Dispatch fired for month");
                            dispatch(setDataMonthly(json[keyName]));
                            break;
                        default:
                            break;
                    }
                }
                else {
                    if (Object.keys(json)[0] == "Error Message") {
                        swalErrFire('The data for the chosen interval '+interval+" is unavailable for the symbol "+symbol["1. symbol"] + ". Please choose another interval or try another symbol.");
                    }
                    else if (Object.keys(json)[0] == "Information") {
                        swalErrFire("Rate limit exceeded - API requests are restricted to 25/day. Please try again later, or use this application from a different IP.");
                    }
                }
            })
            .catch((err) => {
                swalErrFire("Network request failed. Please check your internet connection or proxy.");
            });
        } 
        else {
            swalErrFire("Please search and choose a valid symbol first.");
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
