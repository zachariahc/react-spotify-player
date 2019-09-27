import React, { Component } from "react";
import uniqid from "uniqid";
import "./PlaylistSongs.css";

export class PlaylistSongs extends Component {
  displayArtistNames() {
    const { artistNames } = this.props;
    // console.log("Loggin artists", artistNames.length);
    return artistNames.map(name => {
      return (
        <li className="track-artist-song" key={uniqid()}>
          {name.name}
        </li>
      );
    });
  }

  displayTrackNames() {
    const { albums } = this.props;
    // console.log("Loggin albums", albums.length);
    return albums.map(name => {
      return (
        <li className="track-artist-song" key={uniqid()}>
          {name.name}
        </li>
      );
    });
  }
  render() {
    const { albums } = this.props;
    return (
      <div>
        {albums.length !== 0 ? (
          <div className="playlist-songs-grid-container">
            <div className="playlist-songs-grid-item">
              <p>Artist: </p>
              <ul>{this.displayArtistNames()}</ul>
            </div>
            <div className="playlist-songs-grid-item">
              <p>Track: </p>
              <ul>{this.displayTrackNames()}</ul>
            </div>
          </div>
        ) : (
          <div className="playlist-flex-container">
            <div>Select a playlist to display info</div>
          </div>
        )}
      </div>
    );
  }
}

export default PlaylistSongs;
