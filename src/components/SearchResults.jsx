import React from "react";
import List from '@mui/material/List';
import SearchedArtist from "./SearchedArtist";
import UserContext from "../util/CounterContext";
import { useContext } from "react";

export default function SearchResults(props) {

    return (
      <List   className="searchResults" 
              sx={{ width: '100%' }}>
          {props.searchResults.map((artist, index) => {
              return <SearchedArtist  key={index}
                                      onAdd={props.onAdd}
                                      artist={artist} 
                                      onGetTracks={props.onGetTracks}/>})}    
      </List>
  );
}