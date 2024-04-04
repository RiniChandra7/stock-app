import React from "react";
import { SymbolData } from "../types/types";

const SymbolDetails: React.FC<{ symbolData: SymbolData }> = ({ symbolData }) => {
    return (
        <div className="bg-white rounded shadow-md p-4 transition-transform duration-300 transform hover:scale-105">
            <div className="text-lg font-bold mb-2">{symbolData["1. symbol"]}</div>
            <div className="text-sm mb-2 italic">{symbolData["2. name"]}</div>
            <div className="text-sm mb-2">{symbolData["3. type"]} - {symbolData["4. region"]}</div>
            <div className="text-sm mb-2"><em>Market Hours:</em> {symbolData["5. marketOpen"]} to {symbolData["6. marketClose"]} ({symbolData["7. timezone"]})</div>
            <div className="text-sm mb-2"><em>Currency: </em>{symbolData["8. currency"]}</div>
        </div>
    );
};

export default SymbolDetails;
