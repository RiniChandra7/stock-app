import React, { useEffect } from "react";
import { SymbolData } from "../types/types";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { setCurrentRegion } from "../utils/redux/marketSlice";

const MarketDetails: React.FC<{ symbolData: SymbolData }> = ({ symbolData }) => {
    const dispatch = useAppDispatch();
    const getCurSymbol = useAppSelector(store => store.symbol);
    const marketData = useAppSelector(store => store.market.marketData);

    // Find the matched market based on region from symbolData
    const matchedMarket = marketData.find(obj => symbolData['4. region'].includes(obj.region) || obj.region.includes(symbolData['4. region']));
    //set the current region's market details in the redux store
    useEffect(() => {
        if (matchedMarket) {
            dispatch(setCurrentRegion(matchedMarket));
        }
    }, [matchedMarket]);

    // Retrieve the current market region from Redux state
    const currentMarket = useAppSelector(store => store.market.currentRegion);

    // If currentMarket is not available, return null to prevent rendering
    if (!currentMarket)
        return null;

    // Render market details based on currentMarket
    return (
        <div className="bg-white rounded shadow-md p-4 transition-transform duration-300 transform hover:scale-105 mt-5">
            <div className="text-lg font-bold mb-2">{currentMarket.region} Market</div>
            <div className="text-sm mb-2 italic">{currentMarket.current_status}</div>
            <div className="text-sm mb-2">{currentMarket.local_open} - {currentMarket.local_close} local time </div>
            <div className="text-sm mb-2"><em>Primary Exchanges:</em> {currentMarket.primary_exchanges}</div>
            {currentMarket.notes != "" && <div className="text-sm mb-2">{currentMarket.notes}</div>}
        </div>
    );
};

export default MarketDetails;
