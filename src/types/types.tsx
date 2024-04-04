// Interface representing data structure for symbol information
export interface SymbolData {
    "1. symbol": string;      // Symbol ticker (e.g., AAPL)
    "2. name": string;        // Full name of the symbol (e.g., Apple Inc.)
    "3. type": string;        // Type of the symbol (e.g., Equity)
    "4. region": string;      // Region where the symbol is listed (e.g., United States)
    "5. marketOpen": string;  // Market open time (e.g., 09:30 AM)
    "6. marketClose": string; // Market close time (e.g., 04:00 PM)
    "7. timezone": string;    // Timezone of the market (e.g., US/Eastern)
    "8. currency": string;    // Currency used for the symbol (e.g., USD)
    "9. matchScore": string;  // Match score indicating relevance in search results
}

// Interface representing time series data for historical prices and volume
export interface TimeSeriesData {
    [timestamp: string]: {    // Key is timestamp (string), value is object with price and volume data
        "1. open": string;    // Opening price at the timestamp
        "2. high": string;    // Highest price during the interval
        "3. low": string;     // Lowest price during the interval
        "4. close": string;   // Closing price at the timestamp
        "5. volume": string;  // Volume of trading at the timestamp
    };
}
