import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as studyAPI from '../libs/api/study';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';

const [GET_ATTENDANCE, GET_ATTENDANCE_SUCCESS, GET_ATTENDANCE_FAILURE] =
  createRequestActionTypes('main/GETATTENDANCE');
const [SET_ATTENDANCE, SET_ATTENDANCE_SUCCESS, SET_ATTENDANCE_FAILURE] =
  createRequestActionTypes('main/SETATTENDANCE');

export const getAttendance = createAction(GET_ATTENDANCE, ({ userID }) => ({
  userID,
}));
export const setAttendance = createAction(
  SET_ATTENDANCE,
  ({ userID, date }) => ({ userID, date }),
);

const getAttendanceSaga = createRequestSaga(
  GET_ATTENDANCE,
  studyAPI.getAttendance,
);

const setAttendanceSaga = createRequestSaga(
  SET_ATTENDANCE,
  studyAPI.setAttendance,
);

export function* attendanceInfoSaga() {
  yield takeLatest(GET_ATTENDANCE, getAttendanceSaga);
  yield takeLatest(SET_ATTENDANCE, setAttendanceSaga);
}

const initialState = {
  dates: null,
  getError: null,
  setError: null,
};

const attendanceInfo = handleActions(
  {
    [GET_ATTENDANCE_SUCCESS]: (state, { payload: dates }) => ({
      ...state,
      dates,
      getError: null,
    }),
    [GET_ATTENDANCE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getError: error,
    }),
    [SET_ATTENDANCE_SUCCESS]: (state, { payload: dates }) => ({
      ...state,
      dates,
      setError: null,
    }),
    [SET_ATTENDANCE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      setError: error,
    }),
  },
  initialState,
);

export default attendanceInfo;
