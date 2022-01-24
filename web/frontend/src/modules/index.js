import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import userInfo, { userInfoSaga } from './userInfo';
import attendanceInfo, { attendanceInfoSaga } from './attendanceInfo';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  userInfo,
  attendanceInfo,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), userInfoSaga(), attendanceInfoSaga()]);
}

export default rootReducer;
