import React, { Component } from 'react'

export class TestComp extends Component {
    displaySongNames(){
        const { albums } = this.props
        return albums.map(x => {
            return(
                <p>{x.name}</p>
            )
        })
    }
    render() {
        console.log(this.props.albums)
        return (
            <div>
                {/* <h2>Hello</h2> */}
                { this.props.albums !== undefined && 
                    <span>{this.displaySongNames()}</span>
                }
               {/* {this.props.name}  */}
            </div>
        )
    }
}

export default TestComp
