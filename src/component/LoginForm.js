import React, { Component } from 'react';
import {
  StyleSheet,
   Text,
   ImageBackground,
    TextInput,
     View,
     TouchableOpacity,
      Alert
    } from 'react-native';
import firebase from 'firebase';
import Spinner from './Spinner';


class LoginForm extends Component {
  state ={ email: '', password: '', loading: false };
  clickLogin() {
    this.setState({ loading: true });
    const { email, password } = this.state;

    if (email === '' || password === '') {
      this.setState({ loading: false });
      Alert.alert(
        'Mesaj',
        'Her iki alanda Dolu olmalı!',
        [
          { text: 'Tamam', onPress: () => null }
        ]
      );
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.loginSucces.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.loginSucces.bind(this))
      .catch(this.loginFail.bind(this));
    });
  }
  }
  loginSucces() {
  console.log('Başarılı');
  this.setState({ loading: false });
  }
  loginFail() {
console.log('Başarısız');
this.setState({ loading: false });
Alert.alert(
  'Mesaj',
  'Kullanıcı adı veya şifreniz yanlış!',
  [
    { text: 'Tamam', onPress: () => null }
  ]
);
}

renderButton() {
  if (!this.state.loading) {
    return (<TouchableOpacity onPress={this.clickLogin.bind(this)} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>);
  }
  return <Spinner size="small" />;
}

render() {
  return (
    <View style={styles.container} >
      <ImageBackground source={require('../img/b2.jpg')} style={styles.backgroundImage} >
      <View style={styles.content}>
      <Text style={styles.logo}> LOGIN </Text>

      <View style={styles.inputContainer}>
      <TextInput
      underlineColorAndroid='transparent'
      style={styles.input}
      placeholder='E-Mail'
      value={this.state.email}
      onChangeText={email => this.setState({ email })}
      />

      <TextInput
      underlineColorAndroid='transparent'
      style={styles.input}
      placeholder='Password'
      value={this.state.password}
      secureTextEntry={true}
      onChangeText={password => this.setState({ password })}
      />
      {this.renderButton()}

      </View>

      </View>
      </ImageBackground>

    </View>

   );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
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

export default LoginForm;
