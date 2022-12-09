import React, { useState } from "react";
import './../css/styles';
import SearchBar from "./SearchBar";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SearchContextProvider from "../util/SearchContext";




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

    const [open, setOpen] = useState(true);    

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
                                <SearchBar setOpen={setOpen} onClick={handleClick}/>
                                {open &&
                                    <SearchResults />
                                }
                            </Box>
                        </ClickAwayListener>
                    </Box>
                    <Playlist />
                </div>
                </SearchContextProvider>
            </div>
        </ThemeProvider>
    )
};