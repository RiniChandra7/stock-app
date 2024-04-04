import { API_KEY, API_URL, SEARCH_FUNCTION_NAME } from "./constants";

//API call for symbol search
const searchSymbol = async (symbol: string): Promise<any> => {
    const data = await fetch(API_URL + "function="+ SEARCH_FUNCTION_NAME +"&keywords=" +symbol + "&apikey="+API_KEY);
    
    const json = await data.json();
    return json;
};

export default searchSymbol;
