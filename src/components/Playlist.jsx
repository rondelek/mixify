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

    const [error, setError] = useState(0);

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
        if (playlistName === undefined) {
            setError(1)
        } else {
            setError(0)
        }
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
                    placeholder="Playlist's name" 
                    color="secondary"
                    inputProps={{min: 0, style: { textAlign: 'center' , color: '#985392'}}}
            />
            <SelectedArtists    className="playlist__artists"
                                playlistName={playlistName}/>
            {playlistTracks.length === 0 &&
                <p className="playlist__noartist">No artists selected</p>
            }
            {playlistTracks.length !== 0 &&
                <>            

                    <div className="playlist__sort">
                        <Sort />
                    </div>
                    <div className="playlist__tracks">
                        <PlaylistTracks />
                    </div>
                    {error === 1 &&
                    <p className="playlist__error">Enter playlist's name</p>
                    }
                    <Button variant="contained" 
                            color="secondary" 
                            onClick={handleSavePlaylist}
                            sx={{marginBottom: '.5rem'}}>
                                SAVE PLAYLIST
                    </Button>
                    <Button onClick={clearPlaylist} color="error" size="small" startIcon={<ClearAllIcon />}>
                        Clear
                    </Button>
                </>
            }
        </div>
    )
}