import { ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS } from './types';

export function addStudentCheckinLog(student, time, metadata, sync = null, cancelled = false){
  return { type: ADD_STUDENT_CHECKIN_LOG, student, time, metadata, sync, cancelled };
}

export function changeLogReadingStatus(status){
  return { type: CHANGE_LOG_READING_STATUS, status };
}
