import React, { Component } from "react";
import { getSearchResults, addSongToPlaylist } from "../utils";
import hash from "../hash";
import "./SearchBar.css";

export class SearchBar extends Component {
  state = {
    searchQuery: "",
    results: []
  };
  submitSearch = async () => {
    const { searchQuery } = this.state;
    let token = hash.access_token;
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
    let token = hash.access_token;
    console.log(e, name, trackId, trackUri)
    // const pleaseConfirm = window.confirm(`Are you sure you want to add? ${name.name}`)
    // TODO: if user selects true. Add to selected playlist
    await addSongToPlaylist(token, trackUri)
    // if(pleaseConfirm === true){
    //   console.log("User selected true", trackUri.trackUri)
    //   addSongToPlaylist(token, trackUri)
     
    // }
  }

  displayResults = () => {
    const { results } = this.state;
    return results.map(result => {
      // console.log(result.name)
      // console.log(result)
      const name = { name: result.name}
      const trackId = { trackId: result.id}
      const trackUri = { trackUri: result.uri}
      return (
        <p className="search-font" onClick={e => this.confirmAddSong(e, name, trackId, trackUri)} key={result.id}>
          {result.name}
        </p>
      );
    });
  };

  
  
  render() {
    return (
      <div className="main-bar">
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
      </div>
    );
  }
}

export default SearchBar;
