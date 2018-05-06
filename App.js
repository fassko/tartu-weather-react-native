import React, { Component } from 'react';

import {
  StyleSheet
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
