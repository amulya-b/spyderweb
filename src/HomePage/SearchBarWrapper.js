import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function getSuggestionValue(suggestion) {
    return suggestion;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion}</span>
    )
}

class SearchBarWrapper extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };
    }

    loadSuggestions = (input) => {
        this.setState({
            isLoading: true
        });
        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const endpoint = '/w/api.php?action=opensearch&format=json&search=' + input + '&namespace=0&limit=10&profile=normal';
        axios.get(proxyurl + 'https://en.wikipedia.org' + endpoint)
            .then(response => {
                console.log('SUCCESS');
                console.log(response);
                let result = [];
                for (let i = 0; i < response.data[1].length; i++) {
                    result.push(response.data[1][i]);
                }
                console.log(result);
                this.setState({
                    suggestions: result,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log('ERROR');
                throw err;
            });
    };

    onChange = (event, { newValue}) => {
        this.setState({
            value: newValue
        })
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.loadSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleSearch = () => {
        if (this.state.value !== '') {
            this.props.getSearchResults(this.state.value);
        }
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "What are you looking for?",
            value,
            onChange: this.onChange
        };
        let input = this.state.value.replace(/ /g, "%20");
        let url = "/results/search=" + input;
        return (
            <div style = {{margin: '0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <h1>spyderweb</h1>
                <br/>
                <div style={{float: 'left', marginRight: '10px'}}>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <Button bsStyle="success" onClick = {this.handleSearch} style={{float: 'right'}}>
                    <Link style={{color: "white"}} to={url}>Search</Link>
                </Button>
            </div>
        )
    }
}

export default SearchBarWrapper;
