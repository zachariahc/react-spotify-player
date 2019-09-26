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
          <p className="now-playing">
            Now Playing:{" "}
            <span className="artist-name">{this.props.item.name}</span> By:{" "}
            <span className="artist-name">
              {this.props.item.artists[0].name}
            </span>
          </p>
          {/* <div className="progress">
        <div className="progress__bar" style={this.state.progress} />
        </div> */}
        </div>
        {/* <div> */}
        {/* <p>Now Playing: {this.props.item.name}</p> */}
        {/* <div className="now-playing__name">{this.props.item.name}</div> */}
        {/* <p>By: {this.props.item.artists[0].name}</p> */}
        {/* <div className="now-playing__artist">
            {this.props.item.artists[0].name}
          </div> */}
        {/* <div className="progress">
        <div className="progress__bar" style={this.state.progress} />
        </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Player;
