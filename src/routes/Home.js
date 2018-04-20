import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StudentProfile from '../components/StudentProfile';
import BarcodeReader from '../components/BarcodeReader';
import I18n from '../i18n';

export class Home extends Component {
  render(){
    return (
      <View style={styles.container}>
        <BarcodeReader
          cameraPermissionRequestTitle={I18n.t('camera_permission_title')}
          cameraPermissionRequestMessage={I18n.t('camera_permission_message')}
          style={styles.camera} />
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
    flex: 35,
  },
  profile: {
    flex: 65,
  }
});

export default Home;
