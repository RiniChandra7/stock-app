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

    // Handler for interval button click
    const handleIntervalClick = async (interval: string): Promise<void> => {
        // Check if a valid symbol is selected and if interval or symbol has changed
        if (symbol != null && (symbol["1. symbol"] !== lastSymbol || interval !== lastInterval)) {
            dispatch(setTimeInterval(interval));
            setLastSymbol(symbol["1. symbol"]);
            setLastInterval(interval);

            // Make API call to fetch data for the selected symbol and interval
            timeApiCall(symbol["1. symbol"], interval)
            .then((json) => {
                // Check if data is retrieved successfully
                if (Object.keys(json).length > 1) {
                    const keyName = Object.keys(json)[1];

                    // Dispatch the fetched data to the appropriate Redux slice based on interval
                    switch (interval) {
                        case "1min":
                            dispatch(setData1min(json[keyName]));
                            break;
                        case "5min":
                            dispatch(setData5min(json[keyName]));
                            break;
                        case "15min":
                            dispatch(setData15min(json[keyName]));
                            break;
                        case "30min":
                            dispatch(setData30min(json[keyName]));
                            break;
                        case "60min":
                            dispatch(setData60min(json[keyName]));
                            break;
                        case "day":
                            dispatch(setDataDaily(json[keyName]));
                            break;
                        case "week":
                            dispatch(setDataWeekly(json[keyName]));
                            break;
                        case "month":
                            dispatch(setDataMonthly(json[keyName]));
                            break;
                        default:
                            break;
                    }
                }
                else {
                    // Handle errors based on API response
                    if (Object.keys(json)[0] == "Error Message") {
                        swalErrFire('The data for the chosen interval '+interval+" is unavailable for the symbol "+symbol["1. symbol"] + ". Please choose a larger interval or try another symbol.");
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
    };

    return (
        <div className="flex justify-start items-center h-full p-4">
            {/* Render interval buttons */}
            {intervals.map((interval, index) => (
                <TimeIntervalButton key={index} interval={interval} onClick={() => handleIntervalClick(interval)} />
            ))}
        </div>
    );
};

export default TimeIntervalBtnGroup;
