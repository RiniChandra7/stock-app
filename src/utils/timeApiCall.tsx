import { API_KEY, API_URL, DAY_FUNCTION_NAME, MINUTE_FUNCTION_NAME, MONTH_FUNCTION_NAME, WEEK_FUNCTION_NAME } from "./constants";

const timeApiCall = async (symbol: string, interval: string): Promise<any> => {
    let funcName: string = "";

    if (interval.includes("min")) {
        funcName = MINUTE_FUNCTION_NAME;
    }
    else if (interval == "day") {
        funcName = DAY_FUNCTION_NAME;
    }
    else if (interval == "week") {
        funcName = WEEK_FUNCTION_NAME;
    }
    else {
        funcName = MONTH_FUNCTION_NAME;
    }

    if (funcName == MINUTE_FUNCTION_NAME) {
        const data = await fetch(API_URL + "function="+ funcName +"&symbol=" +symbol + "&interval=" + interval + "&apikey=" +API_KEY);
        const json = await data.json();

        return json;
    }
    else {
        const data = await fetch(API_URL + "function="+ funcName +"&symbol=" +symbol + "&apikey=" +API_KEY);
        const json = await data.json();

        return json;
    }
    
};

export default timeApiCall;
