import React from "react";
import Input from '@mui/material/Input';
import SelectedArtists from "./SelectedArtists";
import PlaylistTracks from "./PlaylistTracks";



export default function Playlist(props) {
    return (
        <div className="playlist">
            <Input  className="playlist__input"
                    defaultValue="My playlist"
                    placeholder="My playlist" 
                    color="secondary"
                    inputProps={{min: 0, style: { textAlign: 'center' , color: '#985392'}}}
                    disableUnderline/>
            {/* <p className="playlist__noartist">No artists selected</p> */}
            <SelectedArtists    className="playlist__artists"
                                selectedArtists={props.selectedArtists}
                                setSelectedArtists={props.setSelectedArtists}
                                playlistTracks={props.playlistTracks}
                                setPlaylistTracks={props.setPlaylistTracks}
                                onRemove={props.onRemove}/>
            <div className="playlist__tracks">
                <PlaylistTracks playlistTracks={props.playlistTracks}
                                setPlaylistTracks={props.setPlaylistTracks}/>
            </div>
        </div>
    )
}