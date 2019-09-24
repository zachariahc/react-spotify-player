import React, { Component } from 'react'
import './Playlist.css'
export class Playlists extends Component {
    componentDidUpdate(){
  
    }

    test = (e) => {
        console.log(e.target)
    }
    displayList(){
        const { playlists } = this.props
        return playlists.map(pl => {
            return (
                <p onClick={e => this.test(e)} key={pl.id}>{pl.name}</p>
            )
        })
    }
    render() {
        return (
            <div className="playlist-main">
                <h3 className="playlist-header">Playlists</h3>
                {this.displayList()}
            </div>
        )
    }
}

export default Playlists
