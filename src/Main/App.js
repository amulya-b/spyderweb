import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Home from '../HomePage/Home';
import About from '../Miscellaneous/About';
import ResultGraphPage from '../ResultGraphPage/ResultGraphPage';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            searchInput: ''
        };
    }

    getSearchResults = (searchInput) => {
        this.setState({
            searchInput: searchInput
        })
    };

    render() {
        return (
            <div className="App">
                <Navbar inverse fluid>
                    <div style={{position: 'relative', width:"50%", margin:"0 auto"}}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">spyderweb</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                    </div>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem>
                                <Button bsStyle="info">
                                    <Link style={{color: "white"}} to="/about"> About</Link>
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button bsStyle="info">
                                    <Link style={{color: "white"}} to="/contact"> Contact Us</Link>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route exact path="/" render = {() => <Home getSearchResults={this.getSearchResults.bind(this)} />} />
                <Route path="/about" component = {About} />
                <Route path="/results/search=:searchInput" component = {ResultGraphPage} />
            </div>
        );
    }
}

export default App;
