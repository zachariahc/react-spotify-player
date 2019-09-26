import React, { Component } from "react";
import { getSearchResults } from "../utils";
import hash from "../hash";
import "./SearchBar.css";

export class SearchBar extends Component {
  state = {
    searchQuery: "",
    results: []
  };
  logState = async () => {
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
        {/* <input  onChange={e => this.searchInput(e)}></input> */}
        <input
          type="text"
          placeholder="Search.."
          onChange={e =>
            this.setState({
              searchQuery: e.target.value
            })
          }
          onSubmit={this.logState}
        />
        <button type="submit" onClick={this.logState}>
          Search
        </button>
        <div>{this.displayResults()}</div>
      </div>
    );
  }
}

export default SearchBar;
