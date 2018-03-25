import React, { Component } from 'react';
import SearchBarWrapper from '../HomePage/SearchBarWrapper';

class Home extends Component {
    render() {
        return (
            <div>
                <SearchBarWrapper getSearchResults = {this.props.getSearchResults} />
            </div>
        )
    }
}

export default Home;
