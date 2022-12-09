import React, { useEffect } from "react";
import Input from '@mui/material/Input';
import { useState, useContext } from "react";
import { SearchContext } from "../util/SearchContext";


export default function SearchBar(props) {

    const {searchSpotify} = useContext(SearchContext)

    const [searchTerm, setSearchTerm] = useState();
    
    useEffect(() => {
        handleSearchSpotify()
    }, [searchTerm])

    function handleTermChange(e) {
        setSearchTerm(e.target.value)
    }
    

    function handleSearchSpotify() {
        props.setOpen(true);
        searchSpotify(searchTerm);
    }

    return (
        <div>
            <Input  placeholder="Find an artist" 
                    onChange={handleTermChange}
                    color="secondary"
                    fullWidth/>
        </div>
    )
}