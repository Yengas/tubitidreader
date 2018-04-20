import { SET_READ_STUDENT, READ_STUDENT_FAILED } from '../actions/types';

export default (state = { student: null }, action) => {
  switch(action.type){
    case SET_READ_STUDENT:
      return { ...state, student: action.student };
    case READ_STUDENT_FAILED:
      return { ...state, student: null };
  }

  return state;
}
