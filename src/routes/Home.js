import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StudentProfile from '../components/StudentProfile';

export class Home extends Component {
  render(){
    return (
      <View>
        <StudentProfile />
      </View>
    );
  }
}

export default Home;
