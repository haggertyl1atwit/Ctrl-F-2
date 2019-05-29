import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    inputValue: 'Enter search target here'
};

_handleTextChange = inputValue => {
    this.setState({ inputValue });
};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={styles.input}
            />
        </View>
        <View style={styles.bot}>
          <View style={styles.botLeft}><Text style={styles.botLeftText}>Clear</Text></View>
          <View style={styles.botRight}><Text style={styles.botRightText}>Enter</Text></View>
        </View>
      </View>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    backgroundColor: '#2E2E2E',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bot: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
  },
  botLeft: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botRight: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botRightText: {
    fontSize: 50,
  },
  botLeftText: {
    fontSize: 50,
  },
  input: {
    fontSize: 30,
    color: 'white',
    width: 390,
    height: 200,
    padding: 24, 
  },
});