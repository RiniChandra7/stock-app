import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import searchSymbol from "../utils/searchSymbol";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { changeSymbol } from "../utils/symbolSlice";
import { SymbolData } from "../types/types";

const SymbolSearch: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const getCurSymbol = useAppSelector(store => store.symbol);
    const timeInterval = useAppSelector(store => store.timeInterval);
    const searchInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (getCurSymbol && getCurSymbol.symbolData) {
            setInputValue(getCurSymbol.symbolData["1. symbol"] || "");
        }
    }, [getCurSymbol]);

    const handleSearch = async (): Promise<void> => {
        if (searchInput.current && inputValue.trim() !== '') {
            try {
                console.log(inputValue.trim());
                const json = await searchSymbol(inputValue.trim());
                setSearchResults(json?.bestMatches || []);
                console.log(json?.bestMatches);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Error occurred during search:", error);
                setSearchResults([]);
                setShowSuggestions(false);
            }
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
        setShowSuggestions(false); // Hide suggestions when input changes
    };

    const handleSuggestionClick = (symbolData: SymbolData): void => {
        dispatch(changeSymbol(symbolData));
        setInputValue(symbolData["1. symbol"]); // Update local input value
        setShowSuggestions(false);
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
