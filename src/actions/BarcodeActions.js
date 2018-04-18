import { BARCODE_READ, SET_READ_STUDENT } from './types';

export function barcodeReadAction(data){
  return { type: BARCODE_READ, data };
}

export function setReadStudent(student){
  return { type: SET_READ_STUDENT, student };
}
