import React from "react";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';



export default function SearchedArtist(props) {

    function addArtist() {
        props.onAdd(props.artist);
        getTracks();
    }

    function getTracks() {
        props.onGetTracks(props.artist)
    }

    let avatarUrl = '';
    if (props.artist.avatar !== undefined) {
        if (props.artist.avatar.hasOwnProperty('url')) {
            avatarUrl = props.artist.avatar.url
        }
    }


    return (
        <ListItem onClick={addArtist}>
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