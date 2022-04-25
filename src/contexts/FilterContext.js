import { createContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({children}){
    const [filter, setFilter] = useState('');

    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext;