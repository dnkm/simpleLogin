import React, { Component } from 'react';
import './App.css';

import {firebase, db} from './utils/firebase';
import LoginForm from './containers/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loginError: undefined
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var email = user.email;
        var uid = user.uid;
        console.log("You are logged in", email, uid);
        this.setState({user: {
          email, uid
        }})
      } else {
        console.log("You are now logged out");
      }
    });

    this.trySignup = this.trySignup.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
  }
  trySignup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({
        loginError: errorMessage
      })
    });
  }

  tryLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({
        loginError: errorMessage
      })
    });
  }

  render() {

    const {user} = this.state;

    return (
      <div>
        Hello

        <img 
          style={
            {width: "100%"}
          }
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" />
        <img 
          style={
            {width: "100%"}
          }
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" />
        <img 
          style={
            {width: "100%"}
          }
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" />
        <img 
          style={
            {width: "100%"}
          }
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" />
        <img 
          style={
            {width: "100%"}
          }
          src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" />
        { user && <div>hello user</div> }
        { !user && <LoginForm 
                      loginError={this.state.loginError}
                      trySignup={this.trySignup}
                      tryLogin={this.tryLogin}
                      /> }
      </div>
    );
  }
}

export default App;
