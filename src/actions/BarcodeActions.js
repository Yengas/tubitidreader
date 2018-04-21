import { BARCODE_READ, STUDENT_READ_SUCCESS_ACTION, STUDENT_READ_FAILED_ACTION } from './types';

export function barcodeReadAction(data){
  return { type: BARCODE_READ, data };
}

export function studentReadSuccessAction(student){
  return { type: STUDENT_READ_SUCCESS_ACTION, student };
}

export function studentReadFailedAction({ message }){
  return { type: STUDENT_READ_FAILED_ACTION, message };
}
