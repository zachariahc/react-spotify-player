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
  displayResults = () => {
    const { results } = this.state;
    return results.map(result => {
      return (
        <p className="search-font" key={result.id}>
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
              placeholder="Search.."
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
