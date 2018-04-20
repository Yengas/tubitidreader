import { combineReducers } from 'redux';
import BarcodeReducer from './BarcodeReducer';
import CameraReducer from './CameraReducer';

export default combineReducers({
  barcode: BarcodeReducer,
  camera: CameraReducer,
});
