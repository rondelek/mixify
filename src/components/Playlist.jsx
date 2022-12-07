import React from "react";
import Input from '@mui/material/Input';
import SelectedArtists from "./SelectedArtists";
import PlaylistTracks from "./PlaylistTracks";
import Button from '@mui/material/Button';


export default function Playlist(props) {
    return (
        <div className="playlist">
            <Input  className="playlist__input"
                    defaultValue="My playlist"
                    placeholder="My playlist" 
                    color="secondary"
                    inputProps={{min: 0, style: { textAlign: 'center' , color: '#985392'}}}
                    disableUnderline/>
            <SelectedArtists    className="playlist__artists"
                                selectedArtists={props.selectedArtists}
                                setSelectedArtists={props.setSelectedArtists}
                                playlistTracks={props.playlistTracks}
                                setPlaylistTracks={props.setPlaylistTracks}
                                onRemove={props.onRemove}/>
            {props.playlistTracks.length === 0 &&
                <p className="playlist__noartist">No artists selected</p>
            }
            {props.playlistTracks.length !== 0 &&
                <>
                    <div className="playlist__tracks">
                        <PlaylistTracks playlistTracks={props.playlistTracks}
                                        setPlaylistTracks={props.setPlaylistTracks}/>
                    </div>
                    <Button variant="contained" color="secondary">SAVE PLAYLIST</Button>
                </>
            }
        </div>
    )
}