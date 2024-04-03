import { API_KEY, API_URL, SEARCH_FUNCTION_NAME } from "./constants";

const searchSymbol = async (symbol: string): Promise<any> => {
    //console.log(API_URL + "function="+ SEARCH_FUNCTION_NAME +"&keywords=" +symbol + "&apikey=RIBXT3XYLI69PC0Q");

    const data = await fetch(API_URL + "function="+ SEARCH_FUNCTION_NAME +"&keywords=" +symbol + "&apikey="+API_KEY);
    
    const json = await data.json();
    console.log(json);
    return json;
};

export default searchSymbol;
