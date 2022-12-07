import * as React from 'react';
import ReactAudioPlayer from "react-audio-player";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function PlaylistSong(props) {

  let hasPreview = props.track.previewUrl ? true : false;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.track.cover} />
        </ListItemAvatar>
        <ListItemText
          primary={props.track.title}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.track.artist}
              </Typography>
            </>
          }
        />
                      {hasPreview &&
                <ReactAudioPlayer
                  className="audioPlayer"
                  controlsList="nodownload"
                  src={props.track.previewUrl}
                  controls
              />
              }
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}