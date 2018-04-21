import { combineReducers } from 'redux';
import CameraReducer from './CameraReducer';
import StudentReducer from './StudentReducer';

export default combineReducers({
  camera: CameraReducer,
  student: StudentReducer,
});
