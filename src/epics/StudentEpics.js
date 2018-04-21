import { STUDENT_READ_SUCCESS_ACTION, CAMERA_START } from '../actions/types';
import { ofType } from 'redux-observable';
import { distinct, map, mergeMap, startWith, takeUntil } from 'rxjs/operators';

/**
 * Creates a distinct student read stream, where each user will be processed once per camera session.
 * @param action$ stream of redux actions.
 */
export const distinctStudentRead$ = (action$) =>{
  const cameraStartAction = action$.pipe(ofType(CAMERA_START));

  return cameraStartAction.pipe(
    // start processing users, even if the camera start action is not sent yet. Maybe the default is camera open?
    startWith(null),
    // create a new stream of distinct student read actions. until the next camera start action comes in.
    mergeMap(() =>
      action$.pipe(
        ofType(STUDENT_READ_SUCCESS_ACTION),
        takeUntil(cameraStartAction),
        // only look at the ids of the students. which will be unique for each different one.
        distinct(({ student: { id } }) => id)
      )
    ),
  );
};
