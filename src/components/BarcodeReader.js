import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, PermissionsAndroid, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { barcodeReadAction } from '../actions'

export class CameraUnauthorizedView extends PureComponent {
  render(){
    return (
      <View>
        <Text>Not authorized!</Text>
      </View>
    );
  }
}

export class BarcodeReader extends Component {
  render(){
    return (
      <View style={styles.container}>
        <RNCamera style={styles.camera} onBarCodeRead={this.handleBarcodeRead.bind(this)} type={'back'} />
      </View>
    );
  }

  async UNSAFE_componentWillMount(){
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      'title': 'Camera izni!',
      'message':  'Lütfen kameraya izin ver!'
    });
  }

  handleBarcodeRead({ type, data }){
    console.log(data);
    if(type === 'QR_CODE')
      this.props.barcodeReadAction(data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default connect(null, { barcodeReadAction })(BarcodeReader);
