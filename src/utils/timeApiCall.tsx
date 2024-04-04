import Swal from "sweetalert2";
import swalLoadingFire from './swalLoadingFire';
import { API_KEY, API_URL, DAY_FUNCTION_NAME, MINUTE_FUNCTION_NAME, MONTH_FUNCTION_NAME, WEEK_FUNCTION_NAME } from "./constants";

// Utility function to make API calls for time series data
const timeApiCall = async (symbol: string, interval: string): Promise<any> => {
    let funcName: string = "";

    // Determine the function name based on the specified interval
    if (interval.includes("min")) {
        funcName = MINUTE_FUNCTION_NAME;
    } else if (interval === "day") {
        funcName = DAY_FUNCTION_NAME;
    } else if (interval === "week") {
        funcName = WEEK_FUNCTION_NAME;
    } else {
        funcName = MONTH_FUNCTION_NAME;
    }

    let apiAddress: string = "";

    // Construct the API URL based on the function name and interval
    if (funcName == MINUTE_FUNCTION_NAME) {
        apiAddress = API_URL + "function="+ funcName +"&symbol=" +symbol + "&interval=" + interval + "&apikey=" +API_KEY;
    }
    else {
        apiAddress = API_URL + "function="+ funcName +"&symbol=" +symbol + "&apikey=" +API_KEY;
    }

    swalLoadingFire();
    // Fetch data from the constructed API URL
    const data = await fetch(apiAddress);
    const json = await data.json();
    Swal.close();

    return json;
};

export default timeApiCall;
