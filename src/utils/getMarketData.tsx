import { API_KEY, API_URL, MARKET_FUNCTION_NAME } from "./constants";

//Api call for market data
const getMarketData = async (): Promise<any> => {
    const data = await fetch(API_URL + "function="+ MARKET_FUNCTION_NAME + "&apikey="+API_KEY);
    
    const json = await data.json();
    return json;
};

export default getMarketData;