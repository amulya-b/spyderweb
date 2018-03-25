import React, { Component } from 'react';

class ResultGraphPage extends Component {
    render() {
        console.log(this);
        return (
            <div>
                <p>You searched for: {this.props.searchInput}</p>
            </div>
        )
    }
}

export default ResultGraphPage;
