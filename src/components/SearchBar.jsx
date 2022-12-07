import React, { useEffect } from "react";
import Input from '@mui/material/Input';
import { useState } from "react";


export default function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState();
    
    useEffect(() => {
        searchSpotify()
    }, [searchTerm])

    function handleTermChange(e) {
        setSearchTerm(e.target.value)
    }
    

    function searchSpotify() {
        props.onSearch(searchTerm);
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