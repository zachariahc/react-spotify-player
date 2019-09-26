import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import PlaylistSongs from "./PlaylistSongs";
import Player from "./Player";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function MainGrid(props) {
  const {
    playlists,
    item,
    is_playing,
    progress_ms,
    userImage,
    displayName,
    tracks,
    albums,
    artistNames
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Player
              item={item}
              is_playing={is_playing}
              progress_ms={progress_ms}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
              <PlaylistSongs 
              albums={albums} 
              artistNames={artistNames}
              />
        </Grid>
        <Grid item xs={12} sm={6}>
              <SearchBar/>
        </Grid>
      </Grid>
      
    </div>
  );
}
