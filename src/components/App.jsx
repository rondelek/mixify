import React, { useState, useEffect } from "react";
import './../css/styles';
import SearchBar from "./SearchBar";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import { green, blue } from '@mui/material/colors';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import krawczyk from './../assets/krawczyk.jpeg';
import Spotify from "../util/Spotify";



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

    const [searchResults, setSearchResults] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([])

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


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <h1>MIXIFY</h1>
                {/* <button onClick={}>token</button> */}
                <div className="create-playlist">
                    <div className="search">
                        <SearchBar onSearch={searchSpotify}/>
                        <SearchResults  searchResults={searchResults}
                                        selectedArtists={selectedArtists}
                                        setSelectedArtists={setSelectedArtists}
                                        playlistTracks={playlistTracks}
                                        setPlaylistTracks={setPlaylistTracks}
                                        onGetTracks={getTracks}
                                        onAdd={addArtist}/>
                    </div>
                    <Playlist   selectedArtists={selectedArtists}
                                setSelectedArtists={setSelectedArtists}
                                playlistTracks={playlistTracks}
                                setPlaylistTracks={setPlaylistTracks}
                                onAdd={addArtist}
                                onRemove={removeArtist}/>
                </div>
            </div>
        </ThemeProvider>
    )
};