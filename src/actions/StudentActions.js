import { ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS } from './types';

export function addStudentCheckinLog(student, time, metadata, sync = null, cancelled = false){
  const isSync = sync !== null;
  const isCancelled = !!cancelled;
  const log = Object.assign({}, { student, time, metadata, isSync, isCancelled }, isSync ? { sync } : {});

  return { type: ADD_STUDENT_CHECKIN_LOG, log };
}

export function changeLogReadingStatus(status){
  return { type: CHANGE_LOG_READING_STATUS, status };
}
