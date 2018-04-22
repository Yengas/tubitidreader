import { combineReducers } from 'redux';
import CameraReducer from './CameraReducer';
import StudentReducer from './StudentReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const studentPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['sync', 'desync']
};

export default combineReducers({
  camera: CameraReducer,
  student: persistReducer(studentPersistConfig, StudentReducer),
});
