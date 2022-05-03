import { createContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({children}){
    const [search, setSearch] = useState('');

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;