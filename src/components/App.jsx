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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




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
        MuiButton: {
          styleOverrides: {
            root: {
              color: 'secondary',
            },
          },
        },
      },
  });

export default function App() {

    const client = new QueryClient();

    const [open, setOpen] = useState(true);    

    function handleClick() {
        setOpen((prev) => !prev);
    }

    function handleClickAway() {
        setOpen(false);
    }

    return (
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
            <div className="App">
                <h1>MIXIFY</h1>
                <SearchContextProvider>
                <div className="create-playlist">
                    <Box className="search">
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <Box>
                                <SearchBar  handleClick={handleClick} 
                                            setOpen={setOpen} 
                                            onClick={handleClick}/>
                                {open &&
                                    <SearchResults setOpen={setOpen}/>
                                }
                            </Box>
                        </ClickAwayListener>
                    </Box>
                    <Playlist />
                </div>
                </SearchContextProvider>
            </div>
        </ThemeProvider>
      </QueryClientProvider>
    )
};