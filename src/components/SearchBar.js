import React, { Component } from "react";
import { getSearchResults, addSongToPlaylist } from "../utils";
import "./SearchBar.css";
export class SearchBar extends Component {
  state = {
    searchQuery: "",
    results: []
  };
  submitSearch = async () => {
    const { searchQuery } = this.state;
    const { token } = this.props;
    const data = await getSearchResults(token, searchQuery);
    const {
      tracks: { items }
    } = data;
    let resultsArray = [];
    items.map(results => {
      return resultsArray.push(results);
    });
    this.setState({ results: resultsArray });
  };

  confirmAddSong = async (e, name, trackId, trackUri) => {
    const { token, playlistName, playlistId } = this.props;
    // let token = hash.access_token;
    console.log(e, name, trackUri);
    console.log(this.props);

    const pleaseConfirm = window.confirm(
      `Are you sure you want to add? ${name.name} to ${playlistName}?`
    );

    // TODO: if user selects true. Add to selected playlist
    if (pleaseConfirm === true) {
      addSongToPlaylist(token, trackUri, playlistId);
    }
  };

  displayResults = () => {
    const { results } = this.state;
    // console.log(results)
    return results.map(result => {
      const name = { name: result.name };
      const trackId = { trackId: result.id };
      const trackUri = { trackUri: result.uri };
      return (
        <p
          className="search-font"
          onClick={e => this.confirmAddSong(e, name, trackId, trackUri)}
          key={result.id}
        >
          {result.name}
        </p>
      );
    });
  };

  render() {
    const { playlistName } = this.props;

    return (
      <div className="main-bar">
        {playlistName !== "" ? (
          <React.Fragment>
            <div className="search-controls">
              <div>
                <p>Search for song: </p>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Enter a song to search for..."
                  onChange={e =>
                    this.setState({
                      searchQuery: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <button
                  className="search-button"
                  type="submit"
                  onClick={this.submitSearch}
                >
                  Search
                </button>
              </div>
            </div>

            <div>{this.displayResults()}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="search-controls">
              <div>
                <p>Search for song: </p>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Please select a playlist to search..."
                  onChange={e =>
                    this.setState({
                      searchQuery: e.target.value
                    })
                  }
                  disabled
                />
              </div>

              <div>
                <button
                  className="search-button"
                  type="submit"
                  onClick={this.submitSearch}
                  disabled
                >
                  Search
                </button>
              </div>
            </div>

            <div>{this.displayResults()}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default SearchBar;
