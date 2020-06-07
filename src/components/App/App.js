import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Login from '../Login/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // A method to add a new track to the playlistTracks
  addTrack(newTrack) {
    const {playlistTracks} = this.state;
    console.log(playlistTracks);
    console.log(newTrack);
    if (!playlistTracks.some(track => track.id === newTrack.id)) {
      this.setState( {playlistTracks: [ ...playlistTracks, newTrack]} );
    }
  }

  // A method to remove a new track from the playlistTracks
  removeTrack(removedTrack) {
    const {playlistTracks} = this.state;
    const newPlaylistTracks = playlistTracks.filter(track => track.id !== removedTrack.id);
    this.setState( {playlistTracks: newPlaylistTracks} );
  }

  // A method to update playlistName as newPlaylistName
  updatePlaylistName(newPlaylistName) {
    this.setState( {playlistName: newPlaylistName} );
  }

  // A method to save the current new playlist to user's account
  async savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.notify();
    this.setState( {playlistName: 'New Playlist', playlistTracks: []} );
  }

  // A method to search in spotify by the passed term
  async search(term) {
    const searchResult = await Spotify.search(term);
    console.log(searchResult);
    this.setState( {searchResults: searchResult} );
    console.log(this.state.searchResults);
  }

  // A method to show the notification after the playlist has been saved successfully
  notify() {
    toast("Your playlist has been saved successfully!", {
      position: toast.POSITION.RIGHT
    });
  }

  render() {
    // Get a user’s access token from Spofity so that it can be used to make requests later on in the jammming app
    let userToken = Spotify.getAccessToken();

    // If the userToken is null, call saveTokenFromURL() to parse the token and expiration from the URL
    if (!userToken) {
      userToken = Spotify.saveTokenFromURL();
    }
    
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* If the userToken is null, show the Login page to ask users login */}
          {userToken ? <SearchBar onSearch={this.search}/> : <Login />}
          <div className="App-playlist">
            <ToastContainer />
            <SearchResults searchResults={this.state.searchResults} onAdd={newTrack => {this.addTrack(newTrack)}}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={removedTrack => {this.removeTrack(removedTrack)}}
                      onNameChange={newPlaylistName => {this.updatePlaylistName(newPlaylistName)}}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
