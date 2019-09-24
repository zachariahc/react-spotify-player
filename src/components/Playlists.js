import React, { Component } from 'react';
import hash from "../hash";
import { getPlaylistTracks } from '../utils'
import './Playlist.css'
export class Playlists extends Component {
    // componentDidMount() {
    //     // Set token
    //     let token = hash.access_token;
    //     if (token) {
    //       // Set token
    //       this.setState({
    //         token: token
    //       });
    //     //   this.getCurrentlyPlaying(token);
    //     //   this.getUserPlaylists(token);
    //       // this.getPlaylistSongs(token);
    //     }
    //   }

    test = (e) => {
        console.log(e)
    }

    async getSongNames(e, url){
        let token = hash.access_token;
        e.preventDefault()

        console.log(url.link)
       const { tracks } = await getPlaylistTracks(token, url.link)
       console.log(tracks)

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
                {/* {this.displayTracks()} */}
            </div>
        )
    }
}

export default Playlists
