import React from "react";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';



export default function SearchedArtist(props) {

    function addArtist() {
        console.log('addArtist', props.artist.id);
        props.onAdd(props.artist)
        getTracks();
    }

    function getTracks() {
        props.onGetTracks(props.artist)
        console.log('results', props.playlistTracks)
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