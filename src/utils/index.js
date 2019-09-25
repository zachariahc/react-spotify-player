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
