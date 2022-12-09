import React, { useContext } from "react";
import Input from '@mui/material/Input';
import SelectedArtists from "./SelectedArtists";
import PlaylistTracks from "./PlaylistTracks";
import Button from '@mui/material/Button';
import Spotify from "../util/Spotify";
import { useState } from "react";
import { SearchContext } from "../util/SearchContext";


export default function Playlist(props) {

    const {searchResults, 
        setSearchResults, 
        selectedArtists, 
        setSelectedArtists,
        playlistTracks,
        setPlaylistTracks,
        removeArtist } = useContext(SearchContext)

    const [playlistName, setPlaylistName] = useState();

    function handleChangePlaylistName(e) {
        setPlaylistName(e.target.value)
    }

    function savePlaylist() {
        const trackUris = playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistTracks([])
            setSelectedArtists([])
        })
    }

    return (
        <div className="playlist">
            <Input  className="playlist__input"
                    name={playlistName}
                    // defaultValue="My playlist"
                    onChange={handleChangePlaylistName}
                    placeholder="My playlist" 
                    color="secondary"
                    inputProps={{min: 0, style: { textAlign: 'center' , color: '#985392'}}}
                    disableUnderline/>
            <SelectedArtists    className="playlist__artists"
                                playlistName={playlistName}/>
            {playlistTracks.length === 0 &&
                <p className="playlist__noartist">No artists selected</p>
            }
            {playlistTracks.length !== 0 &&
                <>
                    <div className="playlist__tracks">
                        <PlaylistTracks />
                    </div>
                    <Button variant="contained" 
                            color="secondary" 
                            onClick={savePlaylist}>
                                SAVE PLAYLIST
                    </Button>
                </>
            }
        </div>
    )
}