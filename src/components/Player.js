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
      <div className="App">
        { this.props.item ?
          <div className="main-wrapper">
            <div className="now-playing__img">
              <img
                alt="album cover art"
                src={
                  this.state.background.backgroundImage !== "url()"
                    ? this.props.item.album.images[0].url
                    : RecordPlaceholder
                }
              />
            </div>
            <div className="now-playing__side">
              <div className="now-playing__name">{this.props.item.name}</div>
              <div className="now-playing__artist">
                {this.props.item.artists[0].name}
              </div>
              <div className="now-playing__status">
                {this.props.is_playing ? "Playing" : "Paused"}
              </div>
              <div className="progress">
                <div className="progress__bar" style={this.state.progress} />
              </div>
            </div>
            <div className="background" style={this.state.background} />{" "}
          </div> : <p>Commercial Break</p>
        }
      </div>
    );
  }
}

export default Player;
