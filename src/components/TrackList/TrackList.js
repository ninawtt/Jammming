import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => <Track key={track.id} track={track} />)}
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
            </div>
        );
    }
}

export default TrackList;