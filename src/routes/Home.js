import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import { cameraStartAction } from '../actions';
import BarcodeReader from '../components/BarcodeReader';
import CameraClosed from "../components/CameraClosed";
import StudentProfile from '../components/StudentProfile';
import I18n from '../i18n';

type Props = {
  cameraState: {
    open: boolean,
    inactive: boolean,
  }
};

export class Home extends Component<Props> {
  static defaultProps = {
    open: false,
    inactive: false,
  };

  renderBarcodeReader(){
    return (
      <BarcodeReader
        cameraPermissionRequestTitle={I18n.t('camera_permission_title')}
        cameraPermissionRequestMessage={I18n.t('camera_permission_message')}
        style={styles.camera} />
    );
  }

  renderCameraClosed(inactive){
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.cameraStartAction()}>
          <CameraClosed inactive={inactive} />
      </TouchableOpacity>
    );
  }

  render(){
    const { cameraState: { open, inactive} } = this.props;

    const readerSection = open
      ? this.renderBarcodeReader()
      : this.renderCameraClosed(inactive);

    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>{readerSection}</View>
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
  cameraContainer: {
    flex: 35,
    alignSelf: 'stretch',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  profile: {
    flex: 65,
    paddingTop: 10 / PixelRatio.get(),
  }
});


function mapStateToProps(state){
  const { camera } = state;

  const cameraState =
    camera.open === null
      ? { open: false, inactive: false }
      : camera.open
        ? { open: true, inactive: false }
        : { open: false, inactive: true };

  return { cameraState };
}

export default connect(mapStateToProps, { cameraStartAction })(Home);
