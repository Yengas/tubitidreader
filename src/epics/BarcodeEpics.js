import Rx from 'rxjs/Rx';
import { map, flatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { BARCODE_READ } from '../actions/types';
import { studentReadSuccessAction, studentReadFailedAction } from '../actions';

export class BarcodeEpics {
  constructor(parser){
    this.parser = parser;
  }

  decode(action$, store){
    return action$.pipe(
      ofType(BARCODE_READ),
      flatMap(({ data }) =>
        Rx.Observable.fromPromise(this.parser.decode(data))
          .map((student) => studentReadSuccessAction(student))
          .catch((e) => Rx.Observable.of(studentReadFailedAction(e)))
      )
    );
  }
}

export default BarcodeEpics;
