import { CAMERA_START, BARCODE_READ } from '../actions/types';
import { cameraCloseAction } from '../actions';
import { ofType } from 'redux-observable';
import { debounceTime } from 'rxjs/operators';

/**
 * Closes the camera after n seconds of it's start and no barcodes have been read.
 * @param delay time in millis
 * @return {function(*)}
 */
export const createAutoCameraCloserEpic = (delay = 10000) =>
  (action$) => action$.pipe(
    ofType(CAMERA_START, BARCODE_READ),
    debounceTime(delay),
  ).map(() => cameraCloseAction());
