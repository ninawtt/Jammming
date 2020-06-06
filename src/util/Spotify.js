import React from 'react';

import Track from '../components/Track/Track';
import { clientID } from '../credential';

let userToken = null;
const url = 'https://accounts.spotify.com/authorize?';
//const redirectURL = 'http://a8113bba71da.ngrok.io'; // for testing endpoint
const redirectURL = 'http://localhost:3000';

//https://accounts.spotify.com/authorize?client_id=bcb27e010cf4466c8c20628a07c2c878&response_type=token&redirect_uri＝http://17fd08926abe.ngrok.io/
//https://accounts.spotify.com/authorize?client_id=bcb27e010cf4466c8c20628a07c2c878&response_type=token&redirect_uri=http://localhost:3000/
//https://accounts.spotify.com/authorize?client_id=bcb27e010cf4466c8c20628a07c2c878&response_type=token&scope=playlist-modify-public&redirect_uri=http://a8113bba71da.ngrok.io/

const Spotify = {
    // get a user’s access token so that they can make requests to the Spotify API later on in the jammming app.
    getAccessToken() {
        let locationHref = window.location.href; // return the current href property
        if (userToken) {
            return userToken;
        } else if (locationHref.match(/access_token=([^&]*)/) && locationHref.match(/expires_in=([^&]*)/)) {
            userToken = locationHref.match(/access_token=([^&]*)/)[1];  //match will return an array contains all matches
            const expiration = locationHref.match(/expires_in=([^&]*)/)[1];
            
            // set the userToken to '' after expiration time
            window.setTimeout(()=> userToken = '', expiration * 1000); // 1 second = 1000 millionseconds

            // clear the parameter from the URL
            // the URL with access token will be like the following link:
            // http://17fd08926abe.ngrok.io/#access_token=BQDXCSyz1TfYiOSmqcw6LYrP6FlDqA_VmF-WHYkqWjYU_o0llyZW0kRCgCO_CmJ0-G9WbJWiRb6IdH7o5AL10UfDB5Iqm9iCmCY1iUvevksMAtBq0Vsr7MGVun0PNtg9y40WPLK9c_WmEOwgvb3W9cw9Xs3l4p58Pp-72dGwodQHrGWTrZb_iUzluxqDbcCKjXJguIA&token_type=Bearer&expires_in=3600
            window.history.pushState('Access Token', null, '/');
            // after pushState, the url will like this: http://17fd08926abe.ngrok.io 
        } else {
            // redirect users to the authorization page to get user access token
            window.location.href = `${url}client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        }
    }, 

    async search(term) {
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
        } catch(error) {
            console.log(error);
        }
    }
}

export default Spotify;