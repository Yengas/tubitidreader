import { map } from 'rxjs/operators';
import { addStudentCheckinLog } from '../actions/index';
import { STUDENT_READ_SUCCESS_ACTION } from '../actions/types';
import { ofType } from 'redux-observable';

export class StudentEpics{
  constructor(){
  }

  addStudentLogOnQrCodeRead = (action$, store) =>
    action$.pipe(
      ofType(STUDENT_READ_SUCCESS_ACTION),
      map(({ student }) => {
        // get metadata with store.getState and append it...
        return addStudentCheckinLog(student, new Date().valueOf(), {})
      })
    );

}

export default StudentEpics;
