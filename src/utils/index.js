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

export async function addSongToPlaylist(token, trackUri) {
  // console.log("token in index utils", token)
  console.log(("track uri in index utils", trackUri.trackUri))
  console.log(token)
  const params = {
    headers: { Authorization: "Bearer " + token }
  };
  try {
    const { data } = await axios.post(`https://api.spotify.com/v1/playlists/6JTqzWCvkqridgNloB3DEp/tracks?uris=spotify%3Atrack%3A6ktyZo4Wjc6zTHnLuvmIDU`, params);
    console.log("This is data in index utils", data)
    return data
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
}
