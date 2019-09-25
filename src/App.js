import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import { getUserID } from "./utils";
import hash from "./hash";
import Player from "./components/Player";
import Playlists from "./components/Playlists";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
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
      url: "",
      timeOfSong: ""
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
  getCurrentlyPlaying = async token => {
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
          progress_ms: data.progress_ms,
          timeOfSong: data.item.duration_ms
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      this.setState({
        playlists: data.items,
        displayName: displayName,
        userImage: userImage,
        // tracks: tracks,
        url: data.url
      });

      const { timeOfSong, progress_ms } = this.state;
      const refreshSong = timeOfSong - progress_ms;
      if (progress_ms !== null) {
        setInterval(() => {
          this.getCurrentlyPlaying(token);
        }, refreshSong);
      }
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
      <div className="">
        <header className="">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {!this.state.token && (

              <div className="flex-container">
                <div className="side-containers" >1</div>
                <div>
                  {" "}
                  <a
                    className="btn btn--login App-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      "%20"
                    )}&response_type=token&show_dialog=true`}
                  >
                    Login to Spotify
                  </a>
                </div>
                <div className="side-containers" >3</div>
              </div>

          )}
          {this.state.token && (
            <div>
              <NavBar
                userImage={userImage}
                displayName={displayName}
                currentlyPlaying={this.getCurrentlyPlaying}
              />
              <div className="flex-container">
                <div className="side-containers" >
                    <Playlists
                      playlists={playlists}
                      tracks={tracks}
                    />
                </div>
                <div>
                <Player
                item={item}
                is_playing={is_playing}
                progress_ms={progress_ms}
              />
                </div>
                <div className="side-containers" >
                  <SearchBar />
                </div>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
