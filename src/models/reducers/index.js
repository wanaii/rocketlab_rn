import {combineReducers} from 'redux';
import login from './login';
import signup from './signup';
import db_storage from './db_storage';

export default combineReducers({
  login,
  signup,
  db_storage,
});
