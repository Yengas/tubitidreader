import { ADD_STUDENT_CHECKIN_LOG } from '../actions/types';
const defaultState = {
  sync: [],
  desync: [],
};

function updateStateWithCheckin(state, { student, time, metadata, sync }){
  const isSync = sync !== null;
  const log = Object.assign({}, { student, time, metadata, isSync }, isSync ? { sync } : {});

  if(!isSync){
    return { ...state, desync: [ log, ...state.desync ] };
  }else{
    return { ...state, sync: [ log, ...state.sync ] };
  }
}

export default (state = defaultState, action) => {
  switch(action.type){
    case ADD_STUDENT_CHECKIN_LOG:
      return updateStateWithCheckin(state, action);
  }

  return state;
};
