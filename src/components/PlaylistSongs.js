import React, { Component } from 'react'
import uniqid from 'uniqid';
import './PlaylistSongs.css';

export class PlaylistSongs extends Component {
  displayArtistNames() {
    const { artistNames } = this.props;
    return artistNames.map(name => {
      return <p className="track-artist" key={uniqid()}>{name.name}</p>;
    });
  }

  displayTrackNames() {
    const { albums } = this.props;
    return albums.map(name => {
      return <p className="track-artist" key={uniqid()}>{name.name}</p>;
    });
  }
    render() {
        return (
     <div>
        <div className="playlist-songs-grid-container">

          <div className="playlist-songs-grid-item">
            <h3>Artist: </h3>
            {this.displayArtistNames()}
          </div>
          <div className="playlist-songs-grid-item">
            <h3>Track: </h3>
            {this.displayTrackNames()}
          </div>

        </div>
            </div>
        )
    }
}

export default PlaylistSongs
