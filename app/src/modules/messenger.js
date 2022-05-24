import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../libs/createRequestSaga';
import * as messengerAPI from '../libs/api/messenger';
import { takeLatest } from 'redux-saga/effects';

const SET_MESSENGER_ID = 'messenger/SET_MESSENGER_ID';
const RECEIVE_MESSAGE = 'messenger/RECEIVE_MESSAGE';
const [LIST_MESSEGES, LIST_MESSEGES_SUCCESS, LIST_MESSEGES_FAILURE] =
  createRequestActionTypes('messenger/LIST_MESSEGES'); // 메시지 리스트

export const setMessengerId = createAction(
  SET_MESSENGER_ID,
  ({ messengerId, receiver }) => ({ messengerId, receiver }),
);
export const receiveMessage = createAction(
  RECEIVE_MESSAGE,
  (message) => message,
);
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
  messengerId: null,
  receiver: null,
  messages: [],
  subscription: null,
  error: null,
};

const messenger = handleActions(
  {
    [SET_MESSENGER_ID]: (state, { payload: { messengerId, receiver } }) => ({
      ...state,
      messengerId,
      receiver,
    }),
    [RECEIVE_MESSAGE]: (state, { payload: message }) => ({
      ...state,
      messages: [...state.messages, message],
    }),
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
