import {
  ADD_STUDENT_CHECKIN_LOG, CHANGE_LOG_READING_STATUS, SYNC_LOG_REQUEST,
  SYNC_LOG_REQUEST_SUCCESS, SYNC_LOG_REQUEST_FAILED, CLEAR_SYNC_RESULT,
  CANCEL_STUDENT_LOG,
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

function syncLogsWithIds(state, { ids, time }){
  const desync = state.desync.filter(({ student }) => ids.indexOf(student.id) === -1);
  const toUpdate = state.desync.filter(({ student }) => ids.indexOf(student.id) !== -1);
  const updated = toUpdate.map(
    ({ student, time, isCancelled, metadata }) =>
      ({ student, time, isCancelled, metadata, isSync: true, sync: { time }})
  );

  return {
    ...state,
    syncInProgress: false,
    syncResult: { error: false },
    desync,
    sync: [ ...updated, ...state.sync].sort(({ time: atime }, { time: btime }) => btime - atime)
  };
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
      return syncLogsWithIds(state, action);
    case SYNC_LOG_REQUEST_FAILED:
      return { ...state, syncInProgress: false, syncResult: { error: true, message: action.message }};
    case CLEAR_SYNC_RESULT:
      return { ...state, syncResult: undefined };
    case CANCEL_STUDENT_LOG:
      return {
        ...state,
        desync: state.desync.map((log) => {
          if(log.student.id !== action.id || log.time !== action.time|| log.isSync)
            return log;

          return { ...log, isCancelled: true };
        })
      };
  }

  return state;
};
