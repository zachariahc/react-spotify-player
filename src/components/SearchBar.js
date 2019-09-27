import React, { Component } from "react";
import { getSearchResults } from "../utils";
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
  confirmAddSong = (e, name, trackId) => {
    console.log(e, name, trackId)
    const pleaseConfirm = window.confirm(`Are you sure you want to add? ${name.name}`)
    // TODO: if user selects true. Add to selected playlist
    if(pleaseConfirm === true){
      console.log("User selected true", trackId.trackId)
    }
  }
  displayResults = () => {
    const { results } = this.state;
    console.log(results)
    return results.map(result => {
      console.log(result.name)
      const name = { name: result.name}
      const trackId = { trackId: result.id}
      return (
        <p className="search-font" onClick={e => this.confirmAddSong(e, name, trackId)} key={result.id}>
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
