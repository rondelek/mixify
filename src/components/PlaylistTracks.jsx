import React from "react";
import PlaylistTrack from "./PlaylistTrack";
import List from '@mui/material/List';
import { useContext } from "react";
import { SearchContext } from "../util/SearchContext";



export default function PlaylistTracks(props) {

    const {playlistTracks, setPlaylistTracks} = useContext(SearchContext);
    return (
        <List sx={{ width: '100%'}}>
            {playlistTracks.map((track, index) => {
                return (
                    <PlaylistTrack  key={index}
                                    track={track}/>
                )
            })}
        </List>
    )
}