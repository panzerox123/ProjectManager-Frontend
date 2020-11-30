import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './views/Login'
import Register from './views/Register'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const { auth } = require('./services/Auth')


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged_in: 0,
      data: {}
    }

  }
  async componentDidMount() {
    const auth_check = await auth();
    //console.log(auth_check);
    if (auth_check) this.setState({ logged_in: 1, data: auth_check });
    this.log_out = this.log_out.bind(this);
  }

  async log_in() {
    const auth_check = await auth();
    if (auth_check) this.setState({ logged_in: 1, data: auth_check });
  }

  log_out() {
    localStorage.removeItem('x-access-token');
    this.setState({ logged_in: 0 });
  }

  authentication() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Project Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/register">Signup</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Router>
    );
  }

  home() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Project Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/new_team">New Team</Nav.Link>
            <Nav.Link href="/join_team">Join Team</Nav.Link>
            <Nav.Link onClick={this.log_out}>{this.state.data.email}</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </Router>
    )
  }

  render() {
    return this.state.logged_in ? this.home() : this.authentication();
  }
}

export default App;