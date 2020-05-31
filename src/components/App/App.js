import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          "name": "Stuck with U",
          "artist": "Ariana Grande",
          "album": "Stuck with U",
          "id": 1        
        },
        {
          "name": "Intentions",
          "artist": "Justin Beiber",
          "album": "Intentions",
          "id": 2
        },
        {
          "name": "Beautiful People",
          "artist": "Ed Sheeran",
          "album": "No.6 Collaborations Project",
          "id": 3
        }
      ],
      playlistName: "Nina's playlist",
      playlistTracks: [
        {
          "name": "Don't Start Now",
          "artist": "Dua Lipa",
          "album": "Future Nostalgia",
          "id": 4        
        },
        {
          "name": "Say So (feat. Nicki Minaj)",
          "artist": "Doja Cat",
          "album": "Say So (feat. Nicki Minaj)",
          "id": 5
        },
        {
          "name": "bad guy",
          "artist": "Billie Eilish",
          "album": "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
          "id": 6
        },
        {
          "name": "Intentions",
          "artist": "Justin Beiber",
          "album": "Intentions",
          "id": 2
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(newTrack) {
    const {playlistTracks} = this.state;
    console.log(playlistTracks);
    console.log(newTrack);
    if (!playlistTracks.some(track => track.id === newTrack.id)) {
      this.setState( {playlistTracks: [ ...playlistTracks, newTrack]} );
    }
  }

  removeTrack(removedTrack) {
    const {playlistTracks} = this.state;
    const newPlaylistTracks = playlistTracks.filter(track => track.id !== removedTrack.id);
    this.setState( {playlistTracks: newPlaylistTracks} );
  }

  updatePlaylistName(newPlaylistName) {
    this.setState( {playlistName: newPlaylistName} );
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={newTrack => {this.addTrack(newTrack)}}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={removedTrack => {this.removeTrack(removedTrack)}}
                      onNameChange={newPlaylistName => {this.updatePlaylistName(newPlaylistName)}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
