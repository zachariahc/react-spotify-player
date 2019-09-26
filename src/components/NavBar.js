import React, { Component } from "react";
import { Link } from "react-router-dom";
import Playlists from './Playlists';
import hash from "../hash";
import "./NavBar.css";

export class NavBar extends Component {
  state = {
    navOpen: false
  };
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    this.setState({ navOpen: true });
  };

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    this.setState({ navOpen: false });
  };
  refreshSong = () => {
    const { currentlyPlaying } = this.props;
    let token = hash.access_token;
    currentlyPlaying(token);
  };
  render() {
    const { navOpen } = this.state;
    const { displayName, userImage } = this.props;
    return (
      <div>
        {!navOpen && (
          <span className="menu-toggle" onClick={this.openNav}>
            &#9776;
          </span>
        )}
        <div id="mySidenav" className="sidenav">
          <p className="closebtn" onClick={this.closeNav}>
            &times;
          </p>
          <img className="avatar" alt="profile avatar" src={userImage} />
          <p className="username">{displayName}</p>
          <Link to="/playlists">Playlists</Link>
          <Link to="/">Nav 2</Link>
          <Link to="/">Nav 3</Link>
          <Link to="/">Nav 4</Link>
          <Link
            to="/"
            onClick={() => this.props.currentlyPlaying(hash.access_token)}
          >
            Home
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
