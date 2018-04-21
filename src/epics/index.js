import { combineEpics } from 'redux-observable';
import BarcodeEpics from './BarcodeEpics';
import { createAutoCameraCloserEpic } from './CameraEpics';

export default (parser) => {
  const barcodeEpics = new BarcodeEpics(parser);
  // close camera after 10 seconds of inactivity
  const autoCameraCloserEpic = createAutoCameraCloserEpic(10000);

  return combineEpics(
    barcodeEpics.decodeDistinct.bind(barcodeEpics),
    autoCameraCloserEpic
  );
};
