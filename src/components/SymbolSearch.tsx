import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import searchSymbol from "../utils/searchSymbol";
import getMarketData from "../utils/getMarketData";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { changeSymbol, resetAllTimeData } from "../utils/redux/symbolSlice";
import { SymbolData } from "../types/types";
import { setTimeInterval } from "../utils/redux/timeIntervalSlice";
import swalErrFire from "../utils/swalErrFire";
import { setMarketData } from "../utils/redux/marketSlice";

const SymbolSearch: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const getCurSymbol = useAppSelector(store => store.symbol);
    const marketData = useAppSelector(store => store.market.marketData);
    const searchInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Set input value based on the currently selected symbol in Redux state
        if (getCurSymbol && getCurSymbol.symbolData) {
            setInputValue(getCurSymbol.symbolData["1. symbol"] || "");
        }
    }, [getCurSymbol]);

    const handleSearch = async (): Promise<void> => {
        if (searchInput.current && inputValue.trim() !== '') {
            try {
                // Perform symbol search based on input value
                const json = await searchSymbol(inputValue.trim());
                if (json && json?.bestMatches) {
                    if (json?.bestMatches.length === 0) {
                        // Show error message for no search results
                        swalErrFire("No matches found. Please try again with a different search query");
                    }
                    else {
                        // Display search results as suggestions
                        setSearchResults(json?.bestMatches);
                        setShowSuggestions(true);
                    }
                }
                else {
                    // Handle API response errors
                    setSearchResults([]);
                    setShowSuggestions(false);
                    if (Object.keys(json)[0] == "Information") {
                        dispatch(setTimeInterval(""));
                        swalErrFire("Rate limit exceeded - API requests are restricted to 25/day. Please try again later, or use this application from a different IP.");
                    }
                }
            } catch (error) {
                // Handle network request failure
                dispatch(setTimeInterval(""));
                swalErrFire("Network request failed. Please check your internet connection or proxy.");
                setSearchResults([]);
                setShowSuggestions(false);
            }
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // Update input value on change and hide suggestions
        setInputValue(event.target.value);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = async (symbolData: SymbolData): Promise<void> => {
        // Handle click on search suggestion
        dispatch(resetAllTimeData());
        dispatch(changeSymbol(symbolData));
        dispatch(setTimeInterval(""));
        setInputValue(symbolData["1. symbol"]);
        setShowSuggestions(false);

        if (marketData.length == 0) {
            // Fetch market data if not already present
            getMarketData()
            .then((json) => {
                if (Object.keys(json).length > 1 && Object.keys(json)[1] == "markets") {
                    dispatch(setMarketData(json?.markets));
                }
                else {
                    // Handle API response errors
                    if (Object.keys(json)[0] == "Information") {
                        swalErrFire("Rate limit exceeded - API requests are restricted to 25/day. Please try again later, or use this application from a different IP.");
                    }
                    else {
                        swalErrFire("Network request failed. Please check your internet connection or proxy.");
                    }
                }
            })
            .catch((err) => {
                // Handle network request failure
                console.log(err);
                swalErrFire("Network request failed. Please check your internet connection or proxy.");
            });
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 outline-none focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search..."
                ref={searchInput}
                onChange={handleInputChange}
                value={inputValue}
            />
            <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Search
            </button>
            {showSuggestions && searchResults.length > 0 && (
                <ul style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, background: '#fff', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', padding: '8px 0', minWidth: '200px' }}>
                    {searchResults.map((result, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(result)} className="cursor-pointer hover:bg-gray-300 px-4 py-2">
                            {result["1. symbol"]} - {result["2. name"]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SymbolSearch;
