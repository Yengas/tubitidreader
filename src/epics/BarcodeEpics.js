import { map, concat } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { BARCODE_READ } from '../actions/types';
import { setReadStudent } from '../actions';

export class BarcodeEpics {
  constructor(){

  }

  decode(action$, store){
    return action$.pipe(
      ofType(BARCODE_READ),
      map(({ data }) => setReadStudent(data)),
    );
  }
}

export default BarcodeEpics;
