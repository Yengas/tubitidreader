import { combineEpics } from 'redux-observable';
import BarcodeEpics from "./BarcodeEpics";

export default () => {
  const barcodeEpics = new BarcodeEpics();

  return combineEpics(
    barcodeEpics.decode,
  );
};
