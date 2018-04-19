import { combineEpics } from 'redux-observable';
import BarcodeEpics from "./BarcodeEpics";

export default (parser) => {
  const barcodeEpics = new BarcodeEpics(parser);

  return combineEpics(
    barcodeEpics.decode.bind(barcodeEpics),
  );
};
