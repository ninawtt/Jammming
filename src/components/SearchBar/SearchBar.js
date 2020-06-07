import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    // A method to call onSearch method from the props by passing the current term value
    search() {
        this.props.onSearch(this.state.term);
    }

    // An event hanlder to handle the term changed in the input box
    handleTermChange(e) {
        const term = e.target.value;
        this.setState( {term: term} );
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;