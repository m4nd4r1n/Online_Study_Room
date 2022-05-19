import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';
import * as authAPI from '../libs/api/auth';

const [FIND, FIND_SUCCESS, FIND_FAILURE] =
  createRequestActionTypes('auth/FIND');

export const find = createAction(FIND, ({ impUID, email }) => ({
  impUID,
  email,
}));

// saga 생성
const findSaga = createRequestSaga(FIND, authAPI.find);
export function* authSaga() {
  yield takeLatest(FIND, findSaga);
}

// state 초기화
const initialState = {
  auth: null,
  authError: null,
};

// action 발생 시
const auth = handleActions(
  {
    // 찾기 성공
    [FIND_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 찾기 실패
    [FIND_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
