import { SET_READ_STUDENT } from '../actions/types';

export default (state = { student: null }, action) => {
  switch(action.type){
    case SET_READ_STUDENT:
      return { student: action.student };
  }

  return state;
}
