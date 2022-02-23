import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as messengerAPI from '../lib/api/messenger';
//import * as messengerSockAPI from '../lib/socket/messenger';
import { takeLatest } from 'redux-saga/effects';

const [LIST_MESSENGERS, LIST_MESSENGERS_SUCCESS, LIST_MESSENGERS_FAILURE] =
  createRequestActionTypes('messengers/LIST_MESSENGERS'); // 메신저 리스트

export const listMessengers = createAction(LIST_MESSENGERS);

// saga 생성
const listMessengersSaga = createRequestSaga(
  listMessengers,
  messengerAPI.listMessengers,
);
export function* messengersSaga() {
  yield takeLatest(listMessengers, listMessengersSaga);
}

const initialState = {
  messengers: null,
  error: null,
};

const messengers = handleActions(
  {
    [LIST_MESSENGERS_SUCCESS]: (state, { payload: messengers }) => ({
      ...state,
      messengers: messengers,
    }),
    [LIST_MESSENGERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default messengers;
