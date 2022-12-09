import React from "react";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../util/SearchContext";


export default function SelectedArtists(props) {

    const {selectedArtists, removeArtist} = useContext(SearchContext);

    function handleRemoveArtist(artist) {
        removeArtist(artist)
    }   


    return (
        <div className="selectedArtists">
            {selectedArtists.map((artist, index) => {

                let avatarUrl = '';
                if (artist.avatar !== undefined) {
                    if (artist.avatar.hasOwnProperty('url')) {
                        avatarUrl = artist.avatar.url
                    }
                }
                
                return (
                        <Chip   className="selectedArtist"
                                key={index}
                                color="secondary" 
                                onDelete={() => handleRemoveArtist(artist)}
                                label={artist.name}
                                avatar={<Avatar src={avatarUrl}/>} /> 
                    )
            })}
        </div>
    )
}