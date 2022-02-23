import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import userInfo, { userInfoSaga } from './userInfo';
import attendanceInfo, { attendanceInfoSaga } from './attendanceInfo';
import planner, { plannerSaga } from './planner';
import plan, { planSaga } from './plan';
import achievement, { achievementSaga } from './achievement';
import messenger, { messengerSaga } from './messenger';
import messengers, { messengersSaga } from './messengers';
import statistics, { statisticsSaga } from './statistics';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  userInfo,
  attendanceInfo,
  planner,
  plan,
  achievement,
  messenger,
  messengers,
  statistics,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    userInfoSaga(),
    attendanceInfoSaga(),
    plannerSaga(),
    planSaga(),
    achievementSaga(),
    messengerSaga(),
    messengersSaga(),
    statisticsSaga(),
  ]);
}

export default rootReducer;
