import { useContext } from "react";
import SearchContext from "../contexts/SearchContext";

export default function useSearch(){
    return useContext(SearchContext);
}