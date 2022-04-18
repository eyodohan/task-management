import { combineReducers } from 'redux';
import authReducer from './auth';
import taskReducer from './task';

export default combineReducers({
  auth: authReducer,
  task: taskReducer,
});
