import { BARCODE_READ, SET_READ_STUDENT, READ_STUDENT_FAILED } from './types';

export function barcodeReadAction(data){
  return { type: BARCODE_READ, data };
}

export function setReadStudent(student){
  return { type: SET_READ_STUDENT, student };
}

export function readStudentFailed({ message }){
  return { type: READ_STUDENT_FAILED, message };
}
