import Rx from 'rxjs/Rx';
import { flatMap, distinct } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { BARCODE_READ } from '../actions/types';
import { studentReadSuccessAction, studentReadFailedAction } from '../actions';
import { wrapStreamInCameraSession } from './CameraEpics';

export class BarcodeEpics {
  constructor(parser){
    this.parser = parser;
  }

  // given a barcode stream, tries to decode the data into a student stream.
  decodeBarcodeStream(barcodeRead$){
    return barcodeRead$.pipe(
      flatMap(({ data }) =>
        Rx.Observable.fromPromise(this.parser.decode(data))
          .map((student) => studentReadSuccessAction(student))
          .catch((e) => Rx.Observable.of(studentReadFailedAction(e)))
      )
    );
  }

  // emits every qr code read, whenever they are read.
  decode(action$){
    const barcode$ = action$.pipe(ofType(BARCODE_READ));
    return this.decodeBarcodeStream(barcode$);
  }

  // doesn't emit the same qr code twice in one camera session.
  decodeDistinct(action$){
    const distinctBarcodePerCameraSession$ = wrapStreamInCameraSession(
      action$,
      action$.pipe(
        ofType(BARCODE_READ),
        // barcodes are distinct by their data.
        distinct(({ data }) => data)
      )
    );

    return this.decodeBarcodeStream(distinctBarcodePerCameraSession$);
  }
}

export default BarcodeEpics;
