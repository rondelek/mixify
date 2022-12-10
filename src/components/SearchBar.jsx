import React, { useEffect } from "react";
import Input from '@mui/material/Input';
import { useState, useContext } from "react";
import { SearchContext } from "../util/SearchContext";
import { useQuery } from '@tanstack/react-query'; 


export default function SearchBar(props) {

    // const {} = useQuery(["cat"], () => )

    const {onSearchSpotify} = useContext(SearchContext)

    const [searchTerm, setSearchTerm] = useState();
    
    useEffect(() => {
        handleSearchSpotify()
    }, [searchTerm])

    function handleTermChange(e) {
        setSearchTerm(e.target.value)
    }
    

    function handleSearchSpotify() {
        props.setOpen(true);
        onSearchSpotify(searchTerm);
    }

    return (
        <div>
            <Input  placeholder="Find an artist" 
                    onClick={props.handleClick}
                    onChange={handleTermChange}
                    color="secondary"
                    fullWidth/>
        </div>
    )
}