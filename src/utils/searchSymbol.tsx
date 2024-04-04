import Swal from "sweetalert2";
import { API_KEY, API_URL, SEARCH_FUNCTION_NAME } from "./constants";
import swalLoadingFire from "./swalLoadingFire";

//API call for symbol search
const searchSymbol = async (symbol: string): Promise<any> => {
    swalLoadingFire();
    const data = await fetch(API_URL + "function="+ SEARCH_FUNCTION_NAME +"&keywords=" +symbol + "&apikey="+API_KEY);
    
    const json = await data.json();
    Swal.close();
    return json;
};

export default searchSymbol;
