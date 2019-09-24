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
            const namesOfAlbums = trackName.track
            // this.setState({albums: {name: namesOfAlbums.name}})
            trackArray.push({name: namesOfAlbums.name})
            this.setState({albums: trackArray})
            return namesOfAlbums
       })

       const nameArray = []
       trackInfo.map(names => {
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

    displayAlbumNames(){
      const { albums } = this.state 
      console.log("loggin albums", albums)
      return albums.map(name => {
          console.log(name.name)
        return (
            <p key={uniqid()}>Album Name: {name.name}</p>
        )
    })
    }

    displayList(){
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
                <h3 className="playlist-header">Playlists</h3>
                {this.displayList()}
                {this.displayArtistNames()}
                {this.displayAlbumNames()}
            </div>
        )
    }
}

export default Playlists
