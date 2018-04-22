import { ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS } from '../actions/types';
const defaultState = {
  sync: [],
  desync: [],
  logReadingStatus: 'none'
};

function updateStateWithCheckin(state, { log }){
  if(!log.isSync){
    return { ...state, desync: [ log, ...state.desync ] };
  }else{
    return { ...state, sync: [ log, ...state.sync ] };
  }
}

export default (state = defaultState, action) => {
  switch(action.type){
    case ADD_STUDENT_CHECKIN_LOG:
      return updateStateWithCheckin(state, action);
    case CHANGE_LOG_READING_STATUS:
      return { ...state, logReadingStatus: action.status };
  }

  return state;
};
