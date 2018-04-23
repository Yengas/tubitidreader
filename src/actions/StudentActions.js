import {
  ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS, SYNC_LOG_REQUEST,
  SYNC_LOG_REQUEST_SUCCESS, SYNC_LOG_REQUEST_FAILED, CLEAR_SYNC_RESULT,
  CANCEL_STUDENT_LOG,
} from './types';

export function addStudentCheckinLog(student, time, metadata, sync = null, cancelled = false){
  const isSync = sync !== null;
  const isCancelled = !!cancelled;
  const log = Object.assign({}, { student, time, metadata, isSync, isCancelled }, isSync ? { sync } : {});

  return { type: ADD_STUDENT_CHECKIN_LOG, log };
}

export function changeLogReadingStatus(status){
  return { type: CHANGE_LOG_READING_STATUS, status };
}

export function syncLogRequest(logs){
  return { type: SYNC_LOG_REQUEST, logs };
}

export function syncLogRequestSuccess(ids, time = Date.now()){
  return { type: SYNC_LOG_REQUEST_SUCCESS, ids, time };
}

export function syncLogRequestFailed(message){
  return { type: SYNC_LOG_REQUEST_FAILED, message };
}

export function clearSyncResult(){
  return { type: CLEAR_SYNC_RESULT };
}

export function cancelStudentLog(id, time){
  return { type: CANCEL_STUDENT_LOG, id, time };
}
