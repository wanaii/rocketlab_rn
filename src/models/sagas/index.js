import {all} from 'redux-saga/effects';

import login from './login';
import signup from './signup';
import db_storage from './db_storage';

export default function* rootSaga() {
  yield all([login(), signup(), db_storage()]);
}
