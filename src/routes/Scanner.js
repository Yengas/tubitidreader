import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StudentLogType } from '../models/StudentTypes';
import {
  cameraStartAction, barcodeReadAction, changeLogReadingStatus, syncLogRequest, clearSyncResult, cancelStudentLog
} from '../actions';
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
    selectedStatus: string,
    syncInProgress: boolean,
    syncResult: {
      error: boolean,
      message: string,
    }
  },
};

export class Home extends Component<Props> {
  static defaultProps = {
    open: false,
    inactive: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps){
    const syncResult = nextProps && nextProps.studentState ? nextProps.studentState.syncResult : undefined;

    if(syncResult){
      this.showSyncResultDialog(syncResult);
      this.props.clearSyncResult();
    }
  }

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
    this.props.syncLogRequest(
      this.props.studentState.desync.filter(x => !x.isSync)
    );
  }

  showSyncResultDialog(syncResult){
    Alert.alert(
      syncResult.error ? I18n.t('sync_request_dialog_error_title') : I18n.t('sync_request_dialog_success_title'),
      !syncResult.error
        ? I18n.t('sync_request_dialog_success_description')
        : I18n.t('sync_request_dialog_error_description').replace('%s', syncResult.message),
      [ { text: I18n.t('sync_request_dialog_ok') } ],
    );
  }

  render(){
    const {
      cameraState: { open, inactive },
      studentState: { sync, desync, selectedStatus, syncInProgress, syncResult }
    } = this.props;


    const readerSection = open
      ? this.renderBarcodeReader()
      : this.renderCameraClosed(inactive);

    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>{readerSection}</View>
        <View style={styles.statusContainer}>
          <View style={styles.roleAndSyncContainer}>
            <ReaderRole
              roles={[{ name: 'Enter', value: 'enter' }, { name: 'Leaving', value: 'leave' }]}
              onChange={(value, name) => this.props.changeLogReadingStatus(value)}
              selectedValue={selectedStatus}/>
            <MCIcon.Button
              name="cloud-sync"
              borderRadius={2}
              backgroundColor={syncInProgress ? '#808080' : 'rgba(33, 150, 243, 1)'}
              style={styles.syncButton}
              disabled={syncInProgress}
              onPress={() => this.syncButtonPressed()}>
                {syncInProgress ? I18n.t('sync_button_inProgress_message') : I18n.t('sync_button_message')}
            </MCIcon.Button>
          </View>
          <StudentSyncList
            syncStudents={sync}
            desyncStudents={desync}
            onStudentLogCancel={(id) => this.props.cancelStudentLog(id)}
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
    selectedStatus: student.logReadingStatus,
    syncInProgress: student.syncInProgress,
    syncResult: student.syncResult,
  };

  return { cameraState, studentState };
}

export default connect(mapStateToProps, {
  cameraStartAction, barcodeReadAction, changeLogReadingStatus, syncLogRequest, clearSyncResult, cancelStudentLog
})(Home);
