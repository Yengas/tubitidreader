import Rx from 'rxjs/Rx';
import { map, flatMap, delay } from 'rxjs/operators';
import { addStudentCheckinLog, syncLogRequestSuccess, syncLogRequestFailed } from '../actions/index';
import { STUDENT_READ_SUCCESS_ACTION, SYNC_LOG_REQUEST } from '../actions/types';
import { ofType } from 'redux-observable';

export class StudentEpics{
  constructor(){
  }

  sendSyncRequest(logs){
    // dummy impl. return all ids as synced.
    // TODO: implement for real.
    return Rx.Observable.of({ time: Date.now(), ids: logs.map(x => x.student.id) }).pipe(
      // simulate 2 secs of lag.
        delay(2000)
      );
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
        this.sendSyncRequest(logs)
          .map(({ ids, time }) => syncLogRequestSuccess(ids, time))
          .catch((err) => Rx.Observable.of(syncLogRequestFailed(err.message)))
      )
    );

}

export default StudentEpics;
