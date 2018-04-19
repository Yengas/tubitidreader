import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StudentProfile from '../components/StudentProfile';
import BarcodeReader from '../components/BarcodeReader';

export class Home extends Component {
  render(){
    return (
      <View style={styles.container}>
        <BarcodeReader style={styles.camera} />
        <StudentProfile style={styles.profile} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  camera: {
    flex: 8,
  },
  profile: {
    flex: 2,
  }
});

export default Home;
