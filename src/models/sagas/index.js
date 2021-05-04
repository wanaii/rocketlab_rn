import {all} from 'redux-saga/effects';

import login from './login';
import signup from './signup';

export default function* rootSaga() {
  yield all([login(), signup()]);
}
