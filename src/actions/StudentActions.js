import { ADD_STUDENT_CHECKIN_LOG } from './types';

export function addStudentCheckinLog(student, time, metadata, sync = null){
  return { type: ADD_STUDENT_CHECKIN_LOG, student, time, metadata, sync };
}
