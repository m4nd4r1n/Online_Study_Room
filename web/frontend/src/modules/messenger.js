import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as messengerAPI from '../lib/api/messenger';
import { takeLatest } from 'redux-saga/effects';

const [LIST_MESSEGES, LIST_MESSEGES_SUCCESS, LIST_MESSEGES_FAILURE] =
  createRequestActionTypes('messenger/LIST_MESSEGES'); // 메시지 리스트

export const listMessages = createAction(LIST_MESSEGES, ({ messengerId }) => ({
  messengerId,
}));

// saga 생성
const listMessagesSaga = createRequestSaga(
  listMessages,
  messengerAPI.listMessages,
);
export function* messengerSaga() {
  yield takeLatest(listMessages, listMessagesSaga);
}

const initialState = {
  messages: [],
  subscription: null,
  error: null,
};

const messenger = handleActions(
  {
    [LIST_MESSEGES_SUCCESS]: (state, { payload: messages }) => ({
      ...state,
      messages: messages,
    }),
    [LIST_MESSEGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState,
);

export default messenger;
