import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    // A method to call onAdd from props by passing the track value
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    // A method to call onRemove from props by passing the track value
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    // A method to set the button event listeners
    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;