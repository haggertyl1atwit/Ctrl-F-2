import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}></View>
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
    backgroundColor: 'black',
    flex: 2,
    flexDirection: 'row',
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
});