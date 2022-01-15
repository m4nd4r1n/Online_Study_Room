import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as studyAPI from '../lib/api/study';
import { takeLatest } from 'redux-saga/effects';

const [GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE] =
  createRequestActionTypes('userInfo/GET_USER_INFO');

export const getUserInfo = createAction(GET_USER_INFO);

const getUserInfoSaga = createRequestSaga(GET_USER_INFO, studyAPI.getUserInfo);
export function* userInfoSaga() {
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
}

const initialState = {
  info: null,
  error: null,
};

const userInfo = handleActions(
  {
    [GET_USER_INFO_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      info,
    }),
    [GET_USER_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default userInfo;
