import React, { Component } from 'react';
import hash from "../hash";
import { getPlaylistTracks } from '../utils'
import './Playlist.css'
var uniqid = require('uniqid');
export class Playlists extends Component {
    state = {
        albums: [],
        artistNames: []
    }
    async getSongNames(e, url){
        let token = hash.access_token;
        e.preventDefault()
       const { tracks } = await getPlaylistTracks(token, url.link)
       const trackArray =[]

       const trackInfo = tracks.map(trackName => {
            console.log("track data", trackName)
            const namesOfAlbums = trackName.track
            trackArray.push({name: namesOfAlbums.name})
            this.setState({albums: trackArray})
            return namesOfAlbums
       })

       const nameArray = []
       trackInfo.map(names => {
           console.log("names data", names)
          names.artists.map(names => {
              return nameArray.push({name: names.name, id: names.id})
          })
          this.setState({artistNames: nameArray})
          return names
       })
    }

    displayArtistNames(){
      const { artistNames } = this.state 
      return artistNames.map(name => {
        return (
            <p key={uniqid()}>Artist Name: {name.name}</p>
        )
    })
    }

    displayTrackNames(){
      const { albums } = this.state 
      return albums.map(name => {
        return (
            <p key={uniqid()}>Track Name: {name.name}</p>
        )
    })
    }

    listOfPlaylists(){
        const { playlists } = this.props
        return playlists.map(pl => {
            const trackLink = { link: pl.tracks.href}

            return (
                <p onClick={e => this.getSongNames(e, trackLink)} key={pl.id}>{`${pl.name} Tracks: ${pl.tracks.total}`}</p>
            )
        })

    }
    render() {
        return (
            <div className="playlist-main">
            <div class="grid-container">
  <div class="grid-item">{this.listOfPlaylists()}</div>
  <div class="grid-item">{this.displayTrackNames()}</div>
  <div class="grid-item">{this.displayArtistNames()}</div>
</div>
            </div>
        )
    }
}

export default Playlists
