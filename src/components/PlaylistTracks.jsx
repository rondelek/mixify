import React from "react";
import PlaylistTrack from "./PlaylistTrack";
import List from '@mui/material/List';


export default function PlaylistTracks(props) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.playlistTracks.map((track, index) => {
                return (
                    <PlaylistTrack   key={index}
                                    track={track}/>
                )
            })}
        </List>
    )
}