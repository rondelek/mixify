import React from "react";
import List from '@mui/material/List';
import SearchedArtist from "./SearchedArtist";
import { useContext } from "react";
import SearchContextProvider from "../util/SearchContext";
import { SearchContext } from "../util/SearchContext";


export default function SearchResults(props) {

  const {searchResults, addArtist} = useContext(SearchContext);


    return (
      <List   className="searchResults" 
              sx={{ width: '100%' }}>
          {searchResults.map((artist, index) => {
              return <SearchedArtist  key={index}
                                      artist={artist} 
                                      onGetTracks={props.onGetTracks}/>})}    
      </List>
  );
}