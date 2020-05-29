import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [
        {
          "name": "Stuck with U",
          "artist": "Ariana Grande",
          "album": "Stuck with U"        
        },
        {
          "name": "Intentions",
          "artist": "Justin Beiber",
          "album": "Intentions"
        },
        {
          "name": "Beautiful People",
          "artist": "Ed Sheeran",
          "album": "No.6 Collaborations Project"
        }
      ]
    }
    
    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
