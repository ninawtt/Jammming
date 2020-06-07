import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    // An event handler to handle playlist name changed in the input box
    handleNameChange(e) {
        const newPlaylistName = e.target.value;
        this.props.onNameChange(newPlaylistName);
    }

    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                {this.props.playlistTracks.length > 0 ? <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button> : null}
                <span>{this.props.saveSuccessMsg}</span>
            </div>
        );
    }
}

export default Playlist;