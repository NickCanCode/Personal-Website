# or with npm
npm install @statsfm/spotify.js
import { SpotifyAPI } from '@statsfm/spotify.js';

const api = new SpotifyAPI({
  clientCredentials: {
    clientId: '',
    clientSecret: '',
  },
  accessToken: '', // optional, required for private user data
  refreshToken: '', // optional, required for private user data and automatic token refreshing
});

const tracks = await api.tracks
  .list([
    '2cc8Sw1OnCuA5bV8nqWqpE',
    '4a8pP5X2lxwU5aprY44jLn',
    '5lIFsEWj9IjNEALbHnPosE',
    '4S4RWAA749dKyJQ5CiKEBJ',
    '4ZtFanR9U6ndgddUvNcjcG',
  ])
  .then((tracks) => {
    tracks.forEach((track) => {
      console.log(`${track.name} - ${track.artists[0].name}`);
    });
  })
  .catch(console.error);