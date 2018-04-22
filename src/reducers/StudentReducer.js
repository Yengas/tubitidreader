import {
  ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS, SYNC_LOG_REQUEST,
  SYNC_LOG_REQUEST_SUCCESS, SYNC_LOG_REQUEST_FAILED, CLEAR_SYNC_RESULT
} from '../actions/types';

export const defaultState = {
  sync: [],
  desync: [],
  logReadingStatus: 'none',
  syncInProgress: false,
  syncResult: undefined,
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
    case SYNC_LOG_REQUEST:
      return { ...state, syncInProgress: true };
    case SYNC_LOG_REQUEST_SUCCESS:
      return { ...state, syncInProgress: false, syncResult: { error: false } };
    case SYNC_LOG_REQUEST_FAILED:
      return { ...state, syncInProgress: false, syncResult: { error: true, message: action.message }};
    case CLEAR_SYNC_RESULT:
      return { ...state, syncResult: undefined };
  }

  return state;
};
