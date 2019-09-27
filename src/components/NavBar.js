import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import './NavBar.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer(props) {

const { userImage, displayName } = props
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

    const listOfPlaylists = () => {
    const { playlists, getSongNames } = props;
    return playlists.map(pl => {
      const trackLink = { link: pl.tracks.href };
      return (
        <p
          className="click-list"
          onClick={e => getSongNames(e, trackLink)}
          key={pl.id}
        >
          {pl.name}
        </p>
      );
    });
  }

  const logUserOut = () => {
    document.cookie = "token=;"
    window.location.reload()
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
<img className="avatar" alt="profile avatar" src={userImage} />
<p className="username">{displayName}</p>
      </List>
      <Divider />
      <p className="playlist-header">Playlists: </p>
      <Divider />
      <List>
      {listOfPlaylists()}
      </List>
      <Divider />
      <List>
        <p className="click-list" onClick={logUserOut}>Logout</p>
      </List>
    </div>
  );

  return (
    <div>
      <div className="nav-header">
      <Button onClick={toggleDrawer('left', true)} style={{color: "white", fontSize: "1.25em"}}>&#9776;</Button>
      </div>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}

// export class NavBar extends Component {
//   state = {
//     navOpen: false
//   };
//   listOfPlaylists() {
//     const { playlists } = this.props;
//     return playlists.map(pl => {
//       const trackLink = { link: pl.tracks.href };
//       return (
//         <p
//           className="click-list"
//           onClick={e => this.props.getSongNames(e, trackLink)}
//           key={pl.id}
//         >
//           {pl.name}
//         </p>
//       );
//     });
//   }
//   openNav = () => {
//     document.getElementById("mySidenav").style.width = "250px";
//     this.setState({ navOpen: true });
//   };

//   closeNav = () => {
//     document.getElementById("mySidenav").style.width = "0";
//     this.setState({ navOpen: false });
//   };
//   refreshSong = () => {
//     const { currentlyPlaying } = this.props;
//     let token = hash.access_token;
//     currentlyPlaying(token);
//   };
//   render() {
//     const { navOpen } = this.state;
//     const { displayName, userImage } = this.props;
//     return (
//       <div>
//         {!navOpen && (
//           <span className="menu-toggle" onClick={this.openNav}>
//             &#9776;
//           </span>
//         )}
        
//         <div id="mySidenav" className="sidenav">
//           <p className="closebtn" onClick={this.closeNav}>
//             &times;
//           </p>
//           <img className="avatar" alt="profile avatar" src={userImage} />
//           <p className="username">{displayName}</p>
//           <hr />
//           <h5 className="menu-header">Playlists:</h5>
//           <hr />
//           {this.listOfPlaylists()}
//           <Link
//             to="/"
//             onClick={() => this.props.currentlyPlaying(hash.access_token)}
//           >
//             Home
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// export default NavBar;
