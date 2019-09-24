import React, { Component } from "react";
import "./NavBar.css";

export class NavBar extends Component {
    state = {
        navOpen: false,
    }
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    this.setState({ navOpen: true})
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    this.setState({ navOpen: false})
  }

  render() {
      const { navOpen } = this.state
      const { displayName, userImage } = this.props
    return (
      <div>
        { !navOpen &&
        <span
          className="menu-toggle"
          onClick={this.openNav}
        >
          &#9776;
        </span>
        }
        <div id="mySidenav" className="sidenav">
          <p className="closebtn" onClick={this.closeNav}>
            &times;
          </p>
          <img className="avatar" alt="profile avatar" src={userImage} />
          <p className="username">{displayName}</p>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Clients</a>
          <a href="/">Contact</a>
        </div>
      </div>
    );
  }
}

export default NavBar;
