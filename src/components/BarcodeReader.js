import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

type Props = {
  cameraPermissionRequestTitle: string,
  cameraPermissionRequestMessage: string,
  onBarcodeRead: (data: string) => void,
};

export class BarcodeReader extends PureComponent<Props> {
  static defaultProps = {
    cameraPermissionRequestTitle: 'Camera Permission',
    cameraPermissionRequestMessage: 'Please give access to your camera!',
  };

  render(){
    return (
      <View style={[styles.container, this.props.style]}>
        <RNCamera style={styles.camera} onBarCodeRead={this.handleBarcodeRead.bind(this)} type={'back'} />
      </View>
    );
  }

  async UNSAFE_componentWillMount(){
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      'title': this.props.cameraPermissionRequestTitle,
      'message': this.props.cameraPermissionRequestMessage,
    });
  }

  handleBarcodeRead({ type, data }){
    if(type === 'QR_CODE')
      this.props.onBarcodeRead(data);
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

export default BarcodeReader;
