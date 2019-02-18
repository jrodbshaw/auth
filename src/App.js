import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";

// * import Components
import { Header, Button, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    // * Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyC3cEsOv3boIFxtUK_2ilrjnl_g3F0821Q",
      authDomain: "auth-59fb9.firebaseapp.com",
      databaseURL: "https://auth-59fb9.firebaseio.com",
      projectId: "auth-59fb9",
      storageBucket: "auth-59fb9.appspot.com",
      messagingSenderId: "799737571518"
    });
    // * organise when user signs in or out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
};
