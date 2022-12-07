import React from "react";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

export default function SelectedArtists(props) {

    function handleDelete(artist) {
        props.onRemove(artist)
        console.log('artist:' + ' ' + props.selectedArtists)
    }


    return (
        <div className="selectedArtists">
            {props.selectedArtists.map((artist, index) => {
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
                                onDelete={() => handleDelete(artist)}
                                label={artist.name}
                                avatar={<Avatar src={avatarUrl}/>} /> 
                    )
            })}
        </div>
    )
}