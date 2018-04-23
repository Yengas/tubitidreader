import Rx from 'rxjs/Rx';
import { map, flatMap, delay } from 'rxjs/operators';
import { addStudentCheckinLog, syncLogRequestSuccess, syncLogRequestFailed } from '../actions/index';
import { STUDENT_READ_SUCCESS_ACTION, SYNC_LOG_REQUEST } from '../actions/types';
import { ofType } from 'redux-observable';

export class StudentEpics{
  constructor(tubitIDStorage){
    this.tubitIDStorage = tubitIDStorage;
  }

  addStudentLogOnQrCodeRead = (action$, store) =>
    action$.pipe(
      ofType(STUDENT_READ_SUCCESS_ACTION),
      map(({ student }) => {
        const { student: { logReadingStatus }} = store.getState();
        return addStudentCheckinLog(student, new Date().valueOf(), { status: logReadingStatus });
      })
    );

  handleSyncLogsRequest = (action$) =>
    action$.pipe(
      ofType(SYNC_LOG_REQUEST),
      flatMap(({ logs }) =>
        Rx.Observable.fromPromise(
          this.tubitIDStorage.logsPut(logs)
        )
          .map(({ results, time }) => ({ ids: results.map(({ studentId }) => studentId), time }))
          .map(({ ids, time }) => syncLogRequestSuccess(ids, time))
          .catch((err) => Rx.Observable.of(syncLogRequestFailed(err.message)))
      )
    );

}

export default StudentEpics;
