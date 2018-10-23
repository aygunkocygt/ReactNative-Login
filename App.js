import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/component/LoginForm';
import Spinner from './src/component/Spinner';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCA2aQqk67nyqig5J36uHF8SpBqSB6fBSA',
      authDomain: 'kimlikdogrulama-5d560.firebaseapp.com',
      databaseURL: 'https://kimlikdogrulama-5d560.firebaseio.com',
      projectId: 'kimlikdogrulama-5d560',
      storageBucket: 'kimlikdogrulama-5d560.appspot.com',
      messagingSenderId: '440698355547'
    });


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

clickLogout() {
 firebase.auth().signOut();
}

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <TouchableOpacity onPress={this.clickLogout.bind(this)} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      );
      case false:
      return (

        <LoginForm />

      );
      default:
      return (
        <View>
        <Spinner size="large" />
        </View>
      );
    }
  }

  render() {
    return (

     this.renderContent()

    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});

export default App;
