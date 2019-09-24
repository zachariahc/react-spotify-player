import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import { getUserID } from "./utils";
import hash from "./hash";
import Player from "./components/Player";
import Playlists from "./components/Playlists";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      playlists: [],
      displayName: "",
      userImage: "",
      tracks: [],
      url: ''
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let token = hash.access_token;
    if (token) {
      // Set token
      this.setState({
        token: token
      });
      this.getCurrentlyPlaying(token);
      this.getUserPlaylists(token);
    }
  }

  async getCurrentlyPlaying(token) {
    const params = {
      headers: { Authorization: "Bearer " + token }
    };
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/player",
        params
      );
      if (data.is_playing) {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  getUserPlaylists = async token => {
    // Make a call using the token
    const params = {
      headers: { Authorization: "Bearer " + token }
    };
    try {
      const { username, displayName, userImage } = await getUserID(token);
     
      const { data } = await axios.get(
        `https://api.spotify.com/v1/users/${username}/playlists`,
        params
      );
      // const { tracks, } = await getPlaylistTracks(token,)

      this.setState({
        playlists: data.items,
        displayName: displayName,
        userImage: userImage,
        // tracks: tracks,
        url: data.url
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      playlists,
      item,
      is_playing,
      progress_ms,
      userImage,
      displayName,
      tracks
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <div>
              <NavBar userImage={userImage} displayName={displayName} />
              <Player
              item={item}
              is_playing={is_playing}
              progress_ms={progress_ms} 
              />
              <Switch>
                {/* <Route
                  exact path="/"
                  render={props => (
                    <Player
                      {...props}
                      item={item}
                      is_playing={is_playing}
                      progress_ms={progress_ms}
                    />
                  )}
                /> */}

                <Route
                  path="/playlists"
                  render={props => (
                    <Playlists {...props} playlists={playlists} tracks={tracks} />
                  )}
                />
              </Switch>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
