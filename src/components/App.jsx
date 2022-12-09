import React, { useState } from "react";
import './../css/styles';
import SearchBar from "./SearchBar";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Spotify from "../util/Spotify";
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useContext } from "react";
import SearchContextProvider from "../util/SearchContext";
import { SearchContext } from "../util/SearchContext";




const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: 'rgb(152, 83, 146)',
      },
    },
    components: {
        // Name of the component
        MuiListItem: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              backgroundColor: 'rgb(254,254,255)',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgb(152, 83, 146, .2)',
             },
            },
          },
        },
      },
  });

export default function App() {

    // const [searchResults, setSearchResults] = useState([]);
    // const [selectedArtists, setSelectedArtists] = useState([]);
    // const [playlistTracks, setPlaylistTracks] = useState([]);
    const [open, setOpen] = useState(true);    

    function addArtist(artist) {
        setSelectedArtists(oldSelectedArtists => {
            if (oldSelectedArtists.includes(artist)) {
                return oldSelectedArtists;
            } else {
                return [...oldSelectedArtists, artist]
            }
        })
    }

    function removeArtist(artist) {
        setSelectedArtists(oldSelectedArtists => oldSelectedArtists.filter(a => artist !== a));
        setPlaylistTracks(oldPlaylistTracks => oldPlaylistTracks.filter(track => artist.id !== track.artist_id));
    }

    function searchSpotify(term) {
        setOpen(true)
        if (term === undefined) {
            setSearchResults([])
        } else {
            Spotify.searchSpotify(term).then(results => {
                setSearchResults(results)
            })
        }
    }

    function getTracks(artist) {
        Spotify.getTracks(artist).then(results => {
            setPlaylistTracks([...playlistTracks, ...results])
        })
    }

    function handleClick() {
        setOpen((prev) => !prev);
    }

    function handleClickAway() {
        setOpen(false);
    }
  
  

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <h1>MIXIFY</h1>
                <SearchContextProvider>
                <div className="create-playlist">
                    <Box className="search">
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <Box>
                                <SearchBar onSearch={searchSpotify} onClick={handleClick}/>

                                {open &&
                                    <SearchResults  searchResults={searchResults}
                                                    setPlaylistTracks={setPlaylistTracks}
                                                    onGetTracks={getTracks}
                                                    onAdd={addArtist}/>
                                }
                            </Box>
                        </ClickAwayListener>
                    </Box>
                    <Playlist   selectedArtists={selectedArtists}
                                setSelectedArtists={setSelectedArtists}
                                playlistTracks={playlistTracks}
                                setPlaylistTracks={setPlaylistTracks}
                                onAdd={addArtist}
                                onRemove={removeArtist}/>
                </div>
                </SearchContextProvider>
            </div>
        </ThemeProvider>
    )
};