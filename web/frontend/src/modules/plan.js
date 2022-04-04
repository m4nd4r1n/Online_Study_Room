import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as plannerAPI from '../lib/api/planner';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'plan/CHANGE_FIELD';
const INITIALIZE_PLAN = 'plan/INITIALIZE_PLAN';

const [ADD_PLAN, ADD_PLAN_SUCCESS, ADD_PLAN_FAILURE] =
  createRequestActionTypes(`plan/ADD_PLAN`);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, // 변수
  value, // 변경할 값
}));
export const initializePlan = createAction(INITIALIZE_PLAN, (plan) => plan); // reg login
export const addPlan = createAction(
  ADD_PLAN,
  ({ subject, date, startTime, endTime }) => ({
    subject,
    date,
    startTime,
    endTime,
  }),
);

// saga 생성
const addPlanSaga = createRequestSaga(addPlan, plannerAPI.addPlan);
export function* planSaga() {
  yield takeLatest(addPlan, addPlanSaga);
}

const initialState = {
  plan: {
    subject: '',
    date: new Date(),
    startTime: '00:00:00',
    endTime: '00:00:00',
  },
  error: null,
};

const plan = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft.plan[key] = value; // form의 key를 value로
      }),
    // 플래너, 플랜추가 전환 시 플랜 초기화
    [INITIALIZE_PLAN]: (state) => ({
      ...state,
      plan: initialState.plan,
      error: null,
    }),
    // 회원가입 성공
    [ADD_PLAN_SUCCESS]: (state, { payload: plan }) => ({
      ...state,
      error: null,
      plan,
    }),
    // 회원가입 실패
    [ADD_PLAN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default plan;
