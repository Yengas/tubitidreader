import { CAMERA_START, BARCODE_READ } from '../actions/types';
import { cameraCloseAction } from '../actions';
import { ofType } from 'redux-observable';
import { debounceTime, distinct, mergeMap, startWith, takeUntil } from 'rxjs/operators';

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

/**
 * Given a stream, re-runs it between each camera start action.
 * @param action$ the original action stream.
 * @param stream$ the stream to wrap in camera sessions. if its shared, there will be lost elements, otherwise it will restart each time.
 * @param initialStart whether to wait for the first camera start action.
 */
export const wrapStreamInCameraSession = (action$, stream$, initialStart = true) => {
  const cameraStartAction = action$.pipe(ofType(CAMERA_START));

  return (
    initialStart
      // Maybe the camera is already started before?
      ? cameraStartAction.pipe(startWith(null))
      : cameraStartAction
  ).pipe(
    mergeMap(() => stream$.pipe(takeUntil(cameraStartAction))),
  );
};
