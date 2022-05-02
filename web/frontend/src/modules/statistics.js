import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as statisticsAPI from '../lib/api/statistics';
import { takeLatest } from 'redux-saga/effects';

const [
  GET_WEEK_STUDY_TIME,
  GET_WEEK_STUDY_TIME_SUCCESS,
  GET_WEEK_STUDY_TIME_FAILURE,
] = createRequestActionTypes(`statistics/GET_WEEK_STUDY_TIME`);
const [
  GET_DATE_STUDY_TIME,
  GET_DATE_STUDY_TIME_SUCCESS,
  GET_DATE_STUDY_TIME_FAILURE,
] = createRequestActionTypes(`statistics/GET_DATE_STUDY_TIME`);
const UNLOAD_STATISTICS = 'statistics/UNLOAD_STATISTICS';

export const getWeekStudyTime = createAction(
  GET_WEEK_STUDY_TIME,
  ({ userId, year, month, day }) => ({ userId, year, month, day }),
);
export const getDateStudyTime = createAction(
  GET_DATE_STUDY_TIME,
  ({ userId, year, month, day }) => ({ userId, year, month, day }),
);
export const unloadStatistics = createAction(UNLOAD_STATISTICS);

const getWeekStudyTimeSaga = createRequestSaga(
  GET_WEEK_STUDY_TIME,
  statisticsAPI.getWeekStudyTime,
);
const getDateStudyTimeSaga = createRequestSaga(
  GET_DATE_STUDY_TIME,
  statisticsAPI.getDateStudyTime,
);
export function* statisticsSaga() {
  yield takeLatest(GET_WEEK_STUDY_TIME, getWeekStudyTimeSaga);
  yield takeLatest(GET_DATE_STUDY_TIME, getDateStudyTimeSaga);
}

const initialState = {
  weekStudyTime: null,
  dateStudyTime: null,
  timeTable: null,
  error: null,
};

const statistics = handleActions(
  {
    [GET_WEEK_STUDY_TIME_SUCCESS]: (state, { payload: weekStudyTime }) => ({
      ...state,
      weekStudyTime,
    }),
    [GET_WEEK_STUDY_TIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_DATE_STUDY_TIME_SUCCESS]: (state, { payload: dateStudyTime }) => ({
      ...state,
      dateStudyTime: dateStudyTime.dateStudyTime,
      timeTable: dateStudyTime.timeTable,
    }),
    [GET_DATE_STUDY_TIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_STATISTICS]: () => initialState,
  },
  initialState,
);

export default statistics;
