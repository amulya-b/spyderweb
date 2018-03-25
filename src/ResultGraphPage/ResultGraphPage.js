import React, { Component } from 'react';
import axios from 'axios';

class ResultGraphPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
        if (this.props.searchInput !== '') {
            let input = this.props.searchInput;
            console.log(input);
            let searchInput = input.replace(/ /g, "%20");
            console.log(searchInput);
            const proxyurl = "https://cors-anywhere.herokuapp.com/"
            let endpoint = '/w/api.php?action=query&format=json&prop=links&titles=' + searchInput + '&pllimit=max';
            axios.get(proxyurl + 'https://en.wikipedia.org' + endpoint)
                .then(response => {
                    console.log(response.data);
                    let links = [];
                    for (let key in response.data.query.pages) {
                        let element = response.data.query.pages[key];
                        if (element.title !== input) {
                            continue;
                        }
                        links = element.links;
                    }
                    this.setState({
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
        return (
            <div>
                <p>You searched for: {this.props.searchInput}</p>
            </div>
        )
    }
}

export default ResultGraphPage;
