import React, { Component } from "react";
import hash from "../hash";
import { getPlaylistTracks } from "../utils";
import "./Playlist.css";
var uniqid = require("uniqid");
export class Playlists extends Component {
  state = {
    albums: [],
    artistNames: []
  };
  async getSongNames(e, url) {
    let token = hash.access_token;
    e.preventDefault();
    const { tracks } = await getPlaylistTracks(token, url.link);
    const trackArray = [];

    const trackInfo = tracks.map(trackName => {
      // console.log("track data", trackName)
      const namesOfAlbums = trackName.track;
      trackArray.push({ name: namesOfAlbums.name });
      this.setState({ albums: trackArray });
      return namesOfAlbums;
    });

    const nameArray = [];
    trackInfo.map(names => {
      //    console.log("names data", names)
      names.artists.map(names => {
        return nameArray.push({ name: names.name, id: names.id });
      });
      this.setState({ artistNames: nameArray });
      return names;
    });
  }

  displayArtistNames() {
    const { artistNames } = this.state;
    return artistNames.map(name => {
      return <p className="track-artist" key={uniqid()}>{name.name}</p>;
    });
  }

  displayTrackNames() {
    const { albums } = this.state;
    return albums.map(name => {
      return <p className="track-artist" key={uniqid()}>{name.name}</p>;
    });
  }

  listOfPlaylists() {
    const { playlists } = this.props;
    return playlists.map(pl => {
      const trackLink = { link: pl.tracks.href };

      return (
        <p className="click-list" onClick={e => this.getSongNames(e, trackLink)} key={pl.id}>
          {pl.name}
        </p>
      );
    });
  }
  render() {
    return (
      <div className="playlist-main">
        <div className="grid-container">
          <div className="grid-item playlist-grid">
              <h3>Playlists: </h3>
          {this.listOfPlaylists()}
          </div>
          <div className="grid-item">
          <h3>Tracks: </h3>
          {this.displayTrackNames()}
          </div>
          <div className="grid-item">
          <h3>Artist: </h3>
          {this.displayArtistNames()}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlists;
