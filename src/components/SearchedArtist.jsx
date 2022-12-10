import React from "react";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useContext } from "react";
import SearchContextProvider from "../util/SearchContext";
import { SearchContext } from "../util/SearchContext";




export default function SearchedArtist(props) {

    const {addArtist, onGetTracks} = useContext(SearchContext);

    function handleAddArtist() {
        addArtist(props.artist);
        handleGetTracks();
    }

    function handleGetTracks() {
        onGetTracks(props.artist)
    }

    let avatarUrl = '';
    if (props.artist.avatar !== undefined) {
        if (props.artist.avatar.hasOwnProperty('url')) {
            avatarUrl = props.artist.avatar.url
        }
    }


    return (
        <ListItem onClick={handleAddArtist}>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={avatarUrl}/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body1" alignItems="center" fontWeight={600}>
                        {props.artist.name}
                    </Typography>
                }
            />
        </ListItem>
    )
}