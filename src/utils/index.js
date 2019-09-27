import axios from "axios";

export async function getUserID(token) {
  const params = {
    headers: { Authorization: "Bearer " + token }
  };
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/me", params);
    return {
      username: data.id,
      displayName: data.display_name,
      userImage: data.images[0].url
    };
  } catch (err) {
    console.error(err);
  }
}

export async function getSearchResults(token, searchQuery) {
  const params = {
    headers: { Authorization: "Bearer " + token }
  };
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/search?q=name:${searchQuery}&type=track`, params);
    return data
  } catch (err) {
    console.error(err);
  }
}

export async function getPlaylistTracks(token, playlist_url) {
  const params = {
    headers: { Authorization: "Bearer " + token }
  };
  try {
    const { data } = await axios.get(`${playlist_url}`, params);

    return {
      tracks: data.items
    };
  } catch (err) {
    console.error(err);
  }
}

export function addSongToPlaylist(token, trackUri, playlist_id) {
  // console.log("token in index utils", token)
  console.log(("track uri in index utils", trackUri.trackUri))
  console.log(token)
  try {
    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${trackUri.trackUri}`, {
    method: 'post',
    headers: { Authorization: "Bearer " + token }
  }).then(res => {
    return res.json();
  }).then(data => {
    if(data.snapshot_id !== undefined){
      console.log('Song added.')
    }
  });
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
}
