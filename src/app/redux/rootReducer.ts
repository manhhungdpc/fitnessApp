import {combineReducers} from 'redux';
import appSlice from './appSlice';
import authSlice from '@src/features/auth/action/authSlice';
import qrSlice from '@src/features/qr/action/qrSlice';
import homeSlice from '@src/features/home/action/homeSlice';
import profileSlice from '@src/features/profile/action/profileSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  qr: qrSlice,
  home: homeSlice,
  profile: profileSlice,
});

export default rootReducer;
