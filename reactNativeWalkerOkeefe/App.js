import { StyleSheet, Text, View } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import { auth } from './src/firebase/config';
import { Component } from 'react';

export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      initialScreen:'Login'
    }
  }
  
  render(){
    return (
        <MainNavigation initial={this.state.initialScreen} />
    );
  }
}