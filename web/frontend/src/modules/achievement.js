import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as achievementAPI from '../lib/api/achievement';
import { takeLatest } from 'redux-saga/effects';

const [READ_ACHIEVEMENT, READ_ACHIEVEMENT_SUCCESS, READ_ACHIEVEMENT_FAILURE] =
  createRequestActionTypes(`achievement/READ_ACHIEVEMENT`);

export const readAchievement = createAction(READ_ACHIEVEMENT);

const readAchievementSaga = createRequestSaga(
  READ_ACHIEVEMENT,
  achievementAPI.readAhievement,
);
export function* achievementSaga() {
  yield takeLatest(READ_ACHIEVEMENT, readAchievementSaga);
}

const initialState = {
  achievements: null,
  error: null,
};

const achievement = handleActions(
  {
    [READ_ACHIEVEMENT_SUCCESS]: (state, { payload: achievements }) => ({
      ...state,
      achievements,
    }),
    [READ_ACHIEVEMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default achievement;
