import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

const [FIND, FIND_SUCCESS, FIND_FAILURE] =
  createRequestActionTypes('auth/FIND');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // 로그인 / 회원가입 / 찾기
    key, // 변수
    value, // 변경할 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // reg login
export const register = createAction(
  REGISTER,
  ({
    email,
    password,
    impUID,
    school,
    stdName,
    phoneFirst,
    phoneMiddle,
    phoneLast,
  }) => ({
    email,
    password,
    impUID,
    school,
    stdName,
    phoneFirst,
    phoneMiddle,
    phoneLast,
  }),
);
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));

export const find = createAction(FIND, ({ impUID, email }) => ({
  impUID,
  email,
}));

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const findSaga = createRequestSaga(FIND, authAPI.find);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(FIND, findSaga);
}

// state 초기화
const initialState = {
  register: {
    email: '',
    password: '',
    passwordConfirm: '',
    impUID: '',
    school: '',
    stdName: '',
    phoneFirst: '',
    phoneMiddle: '',
    phoneLast: '',
  },
  login: {
    email: '',
    password: '',
  },
  find: {
    impUID: '',
    email: '',
  },
  auth: null,
  authError: null,
};

// action 발생 시
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // form의 key를 value로
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
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
