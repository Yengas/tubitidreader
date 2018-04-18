import { combineReducers } from 'redux';
import BarcodeReducer from './BarcodeReducer';

export default combineReducers({
  barcode: BarcodeReducer,
});
