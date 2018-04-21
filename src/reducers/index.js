import { combineReducers } from 'redux';
import CameraReducer from './CameraReducer';

export default combineReducers({
  camera: CameraReducer,
});
