import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

export default function useFilter(){
    return useContext(FilterContext);
}