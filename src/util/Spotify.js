import React from 'react';

import { clientID } from '../credential';

let userToken = null;
const corsPrependURL = 'https://cors-anywhere.herokuapp.com/';

const Spotify = {
    getAccessToken() {
        return userToken;
    },

    // Redirect the user to the Spotify authentication page 
    authentication() {
        const url = 'https://accounts.spotify.com/authorize?';
        const redirectURL = 'http://localhost:3000';
        //const redirectURL = 'http://a8113bba71da.ngrok.io'; // for testing endpoint

        // redirect users to the authorization page to get user access token
        window.location.href = `${url}client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    },

    // Parse the token and expiration from the URL
    saveTokenFromURL() {
        let locationHref = window.location.href; // return the current href property
        if (locationHref.match(/access_token=([^&]*)/) && locationHref.match(/expires_in=([^&]*)/)) {
            userToken = locationHref.match(/access_token=([^&]*)/)[1];  //match will return an array contains all matches
            const expiration = locationHref.match(/expires_in=([^&]*)/)[1];
            
            // set the userToken to '' after expiration time
            window.setTimeout(()=> userToken = '', expiration * 1000); // 1 second = 1000 millionseconds

            // clear the parameter from the URL
            // the URL with access token will be like the following link:
            // http://17fd08926abe.ngrok.io/#access_token=BQDXCSyz1TfYiOSmqcw6LYrP6FlDqA_VmF-WHYkqWjYU_o0llyZW0kRCgCO_CmJ0-G9WbJWiRb6IdH7o5AL10UfDB5Iqm9iCmCY1iUvevksMAtBq0Vsr7MGVun0PNtg9y40WPLK9c_WmEOwgvb3W9cw9Xs3l4p58Pp-72dGwodQHrGWTrZb_iUzluxqDbcCKjXJguIA&token_type=Bearer&expires_in=3600
            window.history.pushState('Access Token', null, '/');
            // after pushState, the url will like this: http://17fd08926abe.ngrok.io 
            return userToken;
        } else {
            return null;
        }
    },

    // A method to call Spotify search api
    async search(term) {
        const userToken = this.getAccessToken();
        if(userToken) {
            const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
            try {
                const response = await fetch(urlToFetch, {
                    headers: {
                        "Authorization":  `Bearer ${userToken}` 
                    }
                });
    
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return jsonResponse.tracks ? jsonResponse.tracks.items.map(track => {
                        return {key: track.id,
                                id: track.id,
                                name: track.name,
                                artist: track.artists[0].name,
                                album: track.album.name,
                                uri: track.uri}
                    }) : [];
                }
                throw new Error('Request failed!');
            } catch(error) {
                console.log(error);
            }
        } else {
            this.authentication();
        }
    },

    // A method to call Spotify Users Profile api
    async getUserID() {
        const userToken = this.getAccessToken();
        let userID = null;
        const urlToFetch = 'https://api.spotify.com/v1/me';
        try {
            const response = await fetch(urlToFetch, {
                headers: {
                    "Authorization":  `Bearer ${userToken}`
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                userID = jsonResponse.id;
                return userID;
            }
            throw new Error('Request failed!');
        } catch (error) {
            console.log(error);
        }
    },

    // A method to call Spotify create a Playlist api
    async createNewPlayList(userID, playListName) {
        const urlToFetch = `${corsPrependURL}https://api.spotify.com/v1/users/${userID}/playlists`;
        let playlistID = null;
        try {
            const response = await fetch(urlToFetch, 
                {
                    method: 'POST',
                    headers: {  
                        "Authorization":  `Bearer ${userToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name: playListName})
                });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                playlistID = jsonResponse.id;
                return playlistID;
            }
            throw new Error('Request failed!');
        } catch (error) {
            console.log(error);
        }
    },

    // A method to call Spotify add items to a playlist api
    async addTracksToPlaylist(playlistID, trackURIs) {
        const urlToFetch = `${corsPrependURL}https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        try {
            const response = await fetch(urlToFetch,
                {
                    method: 'POST',
                    headers: {  
                    "Authorization":  `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({uris: trackURIs})
                });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error('Request failed!');
        } catch (error) {
            console.log(error);
        }
    },

    // A method to save a playlist
    async savePlaylist(playListName, trackUrlList) {
        if (!playListName || !trackUrlList) {
            return;
        }
        
        const userID = await this.getUserID();
        //console.log(userID);
        const playlistID = await this.createNewPlayList(userID, playListName);
        //console.log(playlistID);
        const jsonResponse = await this.addTracksToPlaylist(playlistID, trackUrlList);
    }
}

export default Spotify;