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
        const { student: { logReadingStatus }} = store.getState();
        return addStudentCheckinLog(student, new Date().valueOf(), { status: logReadingStatus });
      })
    );

}

export default StudentEpics;
