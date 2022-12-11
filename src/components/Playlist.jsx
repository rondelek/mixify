import React, { useContext } from "react";
import Input from '@mui/material/Input';
import SelectedArtists from "./SelectedArtists";
import PlaylistTracks from "./PlaylistTracks";
import Button from '@mui/material/Button';
import { useState } from "react";
import { SearchContext } from "../util/SearchContext";
import { savePlaylist } from "../util/Spotify";
import Sort from "./Sort";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Typography from '@mui/material/Typography';


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

    function handleSavePlaylist() {
        const trackUris = playlistTracks.map(track => track.uri);
        savePlaylist(playlistName, trackUris).then(() => {
            setPlaylistTracks([])
            setSelectedArtists([])
        })
    };

    function clearPlaylist() {
        setPlaylistTracks([]);
        setSelectedArtists([]);
        console.log(playlistTracks)
        console.log(selectedArtists)
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
                    <Button onClick={clearPlaylist} color="error" size="small" sx={{fontSize: '.5rem', display: "flex", flexDirection: "row", position: "absolute", top: "11px", right: "15px"}} startIcon={<ClearAllIcon />}>
                        Clear
                    </Button>
                    <div className="playlist__sort">
                        <Sort />
                    </div>
                    <div className="playlist__tracks">
                        <PlaylistTracks />
                    </div>
                    <Button variant="contained" 
                            color="secondary" 
                            onClick={handleSavePlaylist}
                            sx={{marginBottom: '.5rem'}}>
                                SAVE PLAYLIST
                    </Button>
                </>
            }
        </div>
    )
}