import React from "react";
import SymbolDetails from './SymbolDetails';
import { useAppSelector } from "../hooks/storeHooks";
import TimeIntervalBtnGroup from "./TimeIntervalBtnGroup";
import CandlestickGraph from "./CandlestickGraph";

const Body: React.FC = () => {
    const symbolData = useAppSelector(store => store.symbol);

    return (
        <div className="flex flex-1">
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-200 flex flex-col">
                    <TimeIntervalBtnGroup />
                    <CandlestickGraph />
                </div>
            </div>
            
            <div className="w-1/5 bg-gray-100 p-4">
                {
                    symbolData.symbolData ? 
                        <SymbolDetails symbolData={symbolData.symbolData} /> : 
                        <p className='p-4'>Search for a symbol to view market data</p>
                }
            </div>
        </div>
    );
};

export default Body;