import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as plannerAPI from '../lib/api/planner';
import { takeLatest } from 'redux-saga/effects';

const [READ_PLANNER, READ_PLANNER_SUCCESS, READ_PLANNER_FAILURE] =
  createRequestActionTypes(`planner/READ_PLANNER`);
const UNLOAD_PLANNER = 'planner/UNLOAD_PLANNER';

export const readPlanner = createAction(
  READ_PLANNER,
  ({ year, month, day, userId }) => ({
    year,
    month,
    day,
    userId,
  }),
);
export const unloadPlanner = createAction(UNLOAD_PLANNER);

const readPlannerSaga = createRequestSaga(READ_PLANNER, plannerAPI.readPlanner);
export function* plannerSaga() {
  yield takeLatest(READ_PLANNER, readPlannerSaga);
}

const initialState = {
  plans: null,
  error: null,
};

const planner = handleActions(
  {
    [READ_PLANNER_SUCCESS]: (state, { payload: plans }) => ({
      ...state,
      plans,
    }),
    [READ_PLANNER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PLANNER]: () => initialState,
  },
  initialState,
);

export default planner;
