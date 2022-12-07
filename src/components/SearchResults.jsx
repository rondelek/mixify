import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import krawczyk from './../assets/krawczyk.jpeg';
import SearchedArtist from "./SearchedArtist";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function SearchResults(props) {

    return (
      <List   className="searchResults" 
              sx={{ width: '100%' }}>
          {props.searchResults.map((artist, index) => {
              return <SearchedArtist  key={index}
                                      onAdd={props.onAdd}
                                      artist={artist} 
                                      playlistTracks={props.playlistTracks}
                                      setPlaylistTracks={props.setPlaylistTracks}
                                      onGetTracks={props.onGetTracks}/>})}    
      </List>
  );
}