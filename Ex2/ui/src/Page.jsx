import React from 'react';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {
  Glyphicon, Nav, Navbar,
  NavItem,
  NavDropdown, MenuItem, Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Search from './Search.jsx';
import UserContext from './UserContext.js';
import SignInNavItem from './SignInNavItem.jsx';

function NavBar({ user, onUserChange }) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Issue tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>Issue List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>Report</NavItem>
        </LinkContainer>
        <LinkContainer to="/about">
          <MenuItem>About</MenuItem>
        </LinkContainer>
      </Nav>
      <Col sm={5}>
        <Navbar.Form>
          <Search />
        </Navbar.Form>
      </Col>
      <Nav pullRight>
        <IssueAddNavItem user={user} />
        <SignInNavItem user={user} onUserChange={onUserChange} />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/vasansr/pro-mern-stack-2">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: { signedIn: false } }
    this.onUserChange = this.onUserChange.bind(this)
  }

  async componentDidMount() {
    this.loadData()
  }

  onUserChange(user) {
    this.setState({ user }) // ? On change tout l'user pas juste une propri??t?? de user ? --> C'est ?? cause de l'immutabilit??
  }

  // ! Le pattern usuel loadData
  // ! Le pattern usuel loadData, qui ici fera : un appel ?? l???api `/auth/user pour recuperer l???information sur l???authentification, avec aussi les informations `utilisateurs, et on donne ces valeurs donc au `state.

  async loadData() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, givenName } = result; // Le cookie ??tant dans la req, le serveur v??rifie le jwt dedans le cookie, et renvoyer les credentials (voir dans api/auth.js getUser() et /signin)
    this.setState({ user: { signedIn, givenName } }); // ? C'est curieux qu'ils setState avec givenName alors que c'est pas une variable d'??tat
  }

  render() {
    const { user } = this.state
    // Context : Tous les descendants ont acces au contexte.
    return (
      <div>
        <NavBar user={user} onUserChange={this.onUserChange} />
        <Grid fluid>
          <UserContext.Provider value={user}>
            <Contents />
          </UserContext.Provider>
        </Grid>
        <Footer />
      </div>
    )
  }
}

// ! On passe une variable d'etat vers un composant qui est un peu profond, mais dans le livre ils vont expliquer apr??s g??rer cette communication entre le state d'un composant et un composant profond d'une meilleure mani??re que par tous les interm??diaires
