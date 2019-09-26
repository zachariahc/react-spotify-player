import React, { Component } from "react";
import "./Playlist.css";
export class Playlists extends Component {
  listOfPlaylists() {
    const { playlists } = this.props;
    return playlists.map(pl => {
      const trackLink = { link: pl.tracks.href };
      return (
        <p
          className="click-list"
          onClick={e => this.props.getSongNames(e, trackLink)}
          key={pl.id}
        >
          {pl.name}
        </p>
      );
    });
  }
  render() {
    return (
      <div className="playlist-main">
          <div className="playlist-item">
            <h3>Playlists: </h3>
            {this.listOfPlaylists()}
          </div>
      </div>
    );
  }
}

export default Playlists;
