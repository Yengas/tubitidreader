import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StudentLogType } from '../models/StudentTypes';
import { cameraStartAction, barcodeReadAction } from '../actions';
import BarcodeReader from '../components/BarcodeReader';
import CameraClosed from "../components/CameraClosed";
import StudentSyncList from '../components/StudentSyncList';
import ReaderRole from '../components/ReaderRole';
import I18n from '../i18n';

type Props = {
  cameraState: {
    open: boolean,
    inactive: boolean,
  },
  studentState: {
    sync: Array<StudentLogType>,
    desync: Array<StudentLogType>,
  },
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
        onBarcodeRead={(data) => this.props.barcodeReadAction(data)}
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

  // Sync the un-synced qr code reads with the database.
  syncButtonPressed(){
    // not implemented
  }

  render(){
    const { cameraState: { open, inactive }, studentState: { sync, desync } } = this.props;

    const readerSection = open
      ? this.renderBarcodeReader()
      : this.renderCameraClosed(inactive);

    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>{readerSection}</View>
        <View style={styles.statusContainer}>
          <View style={styles.roleAndSyncContainer}>
            <ReaderRole
              roles={[{ name: 'Entering', value: 0 }, { name: 'Leaving', value: 1 }]}
              onChange={(idx, name) => console.log('Changed', idx, name)}
              selectedValue={0}/>
            <MCIcon.Button
              name="cloud-sync"
              borderRadius={2}
              backgroundColor="rgba(33, 150, 243, 1)"
              style={styles.syncButton}
              onPress={() => this.syncButtonPressed()}>
                {I18n.t('sync_button_message')}
            </MCIcon.Button>
          </View>
          <StudentSyncList
            syncStudents={sync}
            desyncStudents={desync}
            style={styles.studentSyncList}/>
        </View>
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
  statusContainer: {
    flex: 65,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10 / PixelRatio.get(),
    alignSelf: 'stretch',
  },
  roleAndSyncContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10 / PixelRatio.get(),
  },
  studentSyncList: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 10 / PixelRatio.get(),
    paddingBottom: 110 / PixelRatio.get(),
  },
  syncButton: {
  }
});


function mapStateToProps(state){
  const { camera, student } = state;

  const cameraState =
    camera.open === null
      ? { open: false, inactive: false }
      : camera.open
        ? { open: true, inactive: false }
        : { open: false, inactive: true };

  const studentState = {
    sync: student.sync,
    desync: student.desync,
  };

  return { cameraState, studentState };
}

export default connect(mapStateToProps, { cameraStartAction, barcodeReadAction })(Home);
