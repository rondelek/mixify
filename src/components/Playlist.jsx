import React from "react";
import Input from '@mui/material/Input';
import SelectedArtists from "./SelectedArtists";
import PlaylistTracks from "./PlaylistTracks";
import Button from '@mui/material/Button';
import Spotify from "../util/Spotify";
import { useState } from "react";


export default function Playlist(props) {

    const [playlistName, setPlaylistName] = useState();

    function handleChangePlaylistName(e) {
        setPlaylistName(e.target.value)
    }

    function savePlaylist() {
        const trackUris = props.playlistTracks.map(track => track.uri);
        console.log(trackUris, playlistName)
        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            props.setPlaylistTracks([])
            props.setSelectedArtists([])
        })
    }

    return (
        <div className="playlist">
            <Input  className="playlist__input"
                    name={playlistName}
                    defaultValue="My playlist"
                    onChange={handleChangePlaylistName}
                    placeholder="My playlist" 
                    color="secondary"
                    inputProps={{min: 0, style: { textAlign: 'center' , color: '#985392'}}}
                    disableUnderline/>
            <SelectedArtists    className="playlist__artists"
                                selectedArtists={props.selectedArtists}
                                setSelectedArtists={props.setSelectedArtists}
                                playlistTracks={props.playlistTracks}
                                setPlaylistTracks={props.setPlaylistTracks}
                                playlistName={playlistName}
                                setPlaylistName={setPlaylistName}
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
                    <Button variant="contained" 
                            color="secondary" 
                            onClick={savePlaylist}
                            playlistTracks={props.playlistTracks}
                            setPlaylistTracks={props.setPlaylistTracks}>
                                SAVE PLAYLIST
                    </Button>
                </>
            }
        </div>
    )
}