import React from "react";

const clientId = 'abaf3ada327f48d59c8cd0cd5926aef3';
const redirectUri = 'http://localhost:3000/';
// let accessToken;
let accessToken = "";
// let clientAccessToken = "";
let expiresIn = "";
// let user_id = "";
// let playlistID = "";


const Spotify = {
    
    getAccessToken() {
        if (accessToken) {
          return accessToken;
        }
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
        if (accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          expiresIn = expiresInMatch[1];
          window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
          window.history.pushState("Access Token", null, "/");
          return accessToken;
        } else {
          const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = redirect;
        }
      },

    searchSpotify(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=artist&q=${term}`,
            {headers: {
                Authorization: `Bearer ${accessToken}`}
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.artists) {
                    return [];
                }
                return jsonResponse.artists.items.map(artist => ({
                    id: artist.id,
                    name: artist.name,
                    uri: artist.uri,
                    avatar: artist.images[0]
                }))
            })
    },
    
    getTracks(artist) {
        const accessToken = Spotify.getAccessToken();
        const artistId = artist.id;
        return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=PL`,
            {headers: {
                Authorization: `Bearer ${accessToken}`}
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.map(track => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    artist_id: track.artists[0].id,
                    uri: track.uri,
                    cover: track.album.images[0].url,
                    previewUrl: track.preview_url
                }))
            })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;

