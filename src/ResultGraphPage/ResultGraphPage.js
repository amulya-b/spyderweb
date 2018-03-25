import React, { Component } from 'react';
import axios from 'axios';

class ResultGraphPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: null,
            links: []
        };
        if (this.props.searchInput !== '') {
            let searchInput = this.props.match.params.searchInput;
            let input = searchInput.replace(/%20/g, " ");
            console.log(searchInput);
            const proxyurl = "https://cors-anywhere.herokuapp.com/"
            let endpoint = '/w/api.php?action=query&format=json&prop=links&titles=' + searchInput + '&redirects=1&pllimit=max';
            axios.get(proxyurl + 'https://en.wikipedia.org' + endpoint)
                .then(response => {
                    console.log(response.data);
                    let links = [];
                    for (let key in response.data.query.pages) {
                        let element = response.data.query.pages[key];
                        if (element.title !== input && response.data.query.hasOwnProperty("redirects") &&
                            element.title !== response.data.query.redirects[0].to) {
                            continue;
                        }
                        links = element.links;
                    }
                    this.setState({
                        query: response.data.query,
                        links: links
                    });
                    console.log(this.state.links);
                })
                .catch(err => {
                    throw err;
                });
        }
    }

    render() {
        console.log(this);
        let redirects = null;
        if (this.state.query !== null && this.state.query.hasOwnProperty("redirects")) {
            redirects = <p>Your search was redirected to {this.state.query.redirects[0].to}</p>
        }
        return (
            <div>
                <p>You searched for: {this.props.match.params.searchInput}</p>
                {redirects}
            </div>
        )
    }
}

export default ResultGraphPage;
