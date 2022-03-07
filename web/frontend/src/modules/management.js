import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as managementAPI from '../lib/api/management';
import { takeLatest } from 'redux-saga/effects';

const [GET_STUDENT_INFO, GET_STUDENT_INFO_SUCCESS, GET_STUDENT_INFO_FAILURE] =
  createRequestActionTypes('management/GET_STUDENT_INFO');
const [GET_STUDY_TIME, GET_STUDY_TIME_SUCCESS, GET_STUDY_TIME_FAILURE] =
  createRequestActionTypes('management/GET_STUDY_TIME');
const [
  ACCEPT_STUDY_TIME,
  ACCEPT_STUDY_TIME_SUCCESS,
  ACCEPT_STUDY_TIME_FAILURE,
] = createRequestActionTypes('management/ACCEPT_STUDY_TIME');

export const getStudentInfo = createAction(GET_STUDENT_INFO);
export const getStudyTime = createAction(GET_STUDY_TIME);
export const acceptStudyTime = createAction(ACCEPT_STUDY_TIME, ({ date }) => ({
  date,
}));

const getStudentInfoSaga = createRequestSaga(
  GET_STUDENT_INFO,
  managementAPI.getStudentInfo,
);
const getStudyTimeSaga = createRequestSaga(
  GET_STUDY_TIME,
  managementAPI.getStudyTime,
);
const acceptStudyTimeSaga = createRequestSaga(
  ACCEPT_STUDY_TIME,
  managementAPI.acceptStudyTime,
);
export function* managementSaga() {
  yield takeLatest(GET_STUDENT_INFO, getStudentInfoSaga);
  yield takeLatest(GET_STUDY_TIME, getStudyTimeSaga);
  yield takeLatest(ACCEPT_STUDY_TIME, acceptStudyTimeSaga);
}

const initialState = {
  info: null,
  studyTime: null,
  error: null,
};

const management = handleActions(
  {
    [GET_STUDENT_INFO_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      info,
    }),
    [GET_STUDENT_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_STUDY_TIME_SUCCESS]: (state, { payload: studyTime }) => ({
      ...state,
      studyTime,
    }),
    [GET_STUDY_TIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ACCEPT_STUDY_TIME_SUCCESS]: (state, { payload: studyTime }) => ({
      ...state,
      studyTime,
    }),
    [ACCEPT_STUDY_TIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default management;
