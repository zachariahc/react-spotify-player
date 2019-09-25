import React, { Component } from "react";
import RecordPlaceholder from "../assets/images/record.png";
import "./Player.css";

class Player extends Component {
  state = {
    background: {},
    progress: {}
  };

  checkForStyles() {
    if (this.props.item.album.images[0].url !== null) {
      const backgroundStyles = {
        backgroundImage: `url(${this.props.item.album.images[0].url})`
      };

      const progressBarStyles = {
        width:
          (this.props.progress_ms * 100) / this.props.item.duration_ms + "%"
      };

      this.setState({
        background: backgroundStyles,
        progress: progressBarStyles
      });
    }
  }

  render() {
    return (
      <div className="flex-container-player">
        <div>
          {" "}
          <img
            alt="album cover art"
            src={
              this.state.background.backgroundImage !== "url()"
                ? this.props.item.album.images[0].url
                : RecordPlaceholder
            }
          />
        </div>
        <div>
          <p>Now Playing: </p>
          <div className="now-playing__name">{this.props.item.name}</div>
          <p>By: </p>
          <div className="now-playing__artist">
            {this.props.item.artists[0].name}
          </div>
          <div className="progress">
            <div className="progress__bar" style={this.state.progress} />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

{
  /* <div className="">
{ this.props.item && this.props.is_playing !== "Paused" ?


<div className="grid-container">

  <div className="grid-item">
    <p className="now-playing_title">Now Playing: </p>
      <img
        alt="album cover art"
        src={
          this.state.background.backgroundImage !== "url()"
            ? this.props.item.album.images[0].url
            : RecordPlaceholder
        }
      />
    </div>

    <div className="grid-item">
        {/* name of song */
}
// <div className="now-playing__name">{this.props.item.name}</div>
{
  /* Artist name */
}
// <div className="now-playing__artist">
// {this.props.item.artists[0].name}
// </div>
{
  /* progress bar */
}
// <div className="progress">
// <div className="progress__bar" style={this.state.progress} />
// </div>
// </div>

// </div> : <p>Paused or Commercial Break</p>

// </div> */}
