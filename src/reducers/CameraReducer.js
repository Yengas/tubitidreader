import { CAMERA_START, CAMERA_CLOSE} from '../actions/types';

export default (state = { open: null }, action) => {
  switch(action.type){
    case CAMERA_START:
      return { ...state, open: true };
    case CAMERA_CLOSE:
      return { ...state, open: false };
  }

  return state;
};
