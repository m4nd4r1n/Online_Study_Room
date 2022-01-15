import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import userInfo, { userInfoSaga } from './userInfo';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  userInfo,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), userInfoSaga()]);
}

export default rootReducer;
