import {combineReducers} from 'redux';
import appSlice from './appSlice';
import authSlice from '@src/features/auth/action/authSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
});

export default rootReducer;
