// Base URL for the Alpha Vantage API
export const API_URL: string = "https://www.alphavantage.co/query?";

// Function names for specific API calls
export const SEARCH_FUNCTION_NAME: string = "SYMBOL_SEARCH";
export const MINUTE_FUNCTION_NAME: string = "TIME_SERIES_INTRADAY";
export const DAY_FUNCTION_NAME: string = "TIME_SERIES_DAILY";
export const WEEK_FUNCTION_NAME: string = "TIME_SERIES_WEEKLY";
export const MONTH_FUNCTION_NAME: string = "TIME_SERIES_MONTHLY";
export const MARKET_FUNCTION_NAME: string = "MARKET_STATUS";

// Available time intervals for fetching time series data
export const AVAILABLE_TIME_INTERVALS: string[] = [
    "1min",
    "5min",
    "15min",
    "30min",
    "60min",
    "day",
    "week",
    "month",
];

// API key for accessing the Alpha Vantage API
export const API_KEY: string = "RIBXT3XYLI69PC0Q";
