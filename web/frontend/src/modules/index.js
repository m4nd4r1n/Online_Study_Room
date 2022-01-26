import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import userInfo, { userInfoSaga } from './userInfo';
import attendanceInfo, { attendanceInfoSaga } from './attendanceInfo';
import planner, { plannerSaga } from './planner';
import plan, { planSaga } from './plan';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  userInfo,
  attendanceInfo,
  planner,
  plan,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    userInfoSaga(),
    attendanceInfoSaga(),
    plannerSaga(),
    planSaga(),
  ]);
}

export default rootReducer;
