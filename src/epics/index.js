import { combineEpics } from 'redux-observable';
import BarcodeEpics from './BarcodeEpics';
import StudentEpics from './StudentEpics';
import { createAutoCameraCloserEpic } from './CameraEpics';

export default (parser, tubitIDStorage) => {
  const barcodeEpics = new BarcodeEpics(parser);
  const studentEpics = new StudentEpics(tubitIDStorage);
  // close camera after 10 seconds of inactivity
  const autoCameraCloserEpic = createAutoCameraCloserEpic(10000);

  return combineEpics(
    barcodeEpics.decodeDistinct,
    studentEpics.addStudentLogOnQrCodeRead,
    studentEpics.handleSyncLogsRequest,
    autoCameraCloserEpic
  );
};
