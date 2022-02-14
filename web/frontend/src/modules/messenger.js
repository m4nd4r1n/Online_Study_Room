import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as messengerAPI from '../lib/api/messenger';
import * as messengerSockAPI from '../lib/socket/messenger';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'messenger/CHANGE_FIELD';
const INITIALIZE_MESSENGER = 'messenger/INITIALIZE_MESSENGER';
const [SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILURE] =
  createRequestActionTypes('messenger/SUBSCRIBE'); // 구독
const UNSUBSCRIBE = 'messenger/UNSUBSCRIBE'; // 구독 해제
const [LIST_MESSEGES, LIST_MESSEGES_SUCCESS, LIST_MESSEGES_FAILURE] =
  createRequestActionTypes('messenger/LIST_MESSEGES'); // 메시지 리스트
const [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE] =
  createRequestActionTypes('messenger/SEND_MESSAGE'); //메시지 전송
const RECEIVE_MESSAGE = 'messenger/RECEIVE_MESSAGE'; // 메시지 수진

export const changeField = createAction(CHANGE_FIELD, ({ message }) => ({
  message,
}));
export const initializeMessenger = createAction(INITIALIZE_MESSENGER);
export const subscribe = createAction(SUBSCRIBE, ({ messengerId }) => ({
  messengerId,
}));
export const unsubscribe = createAction(UNSUBSCRIBE);
export const listMessages = createAction(LIST_MESSEGES, ({ messengerId }) => ({
  messengerId,
}));
export const sendMessage = createAction(
  SEND_MESSAGE,
  ({ messengerId, message }) => ({
    messengerId,
    message,
  }),
);
export const receiveMessage = createAction(RECEIVE_MESSAGE, ({ message }) => ({
  message,
}));

// saga 생성
const subscribeSaga = createRequestSaga(
  subscribe,
  messengerSockAPI.sendMessage,
);
const sendMessageSaga = createRequestSaga(
  sendMessage,
  messengerSockAPI.sendMessage,
);
const listMessagesSaga = createRequestSaga(
  listMessages,
  messengerAPI.listMessages,
);
export function* messengerSaga() {
  yield takeLatest(subscribe, subscribeSaga);
  yield takeLatest(sendMessage, sendMessageSaga);
  yield takeLatest(listMessages, listMessagesSaga);
}

const initialState = {
  messages: [],
  message: '',
  subscription: null,
  error: null,
};

const messenger = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { message } }) => ({
      ...state,
      message: message,
    }),
    [INITIALIZE_MESSENGER]: (state) => ({
      ...state,
      message: initialState.message,
      error: null,
    }),
    [SUBSCRIBE_SUCCESS]: (state, { payload: subscription }) => ({
      ...state,
      subscription: subscription,
    }),
    [SUBSCRIBE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [UNSUBSCRIBE]: (state) => ({
      ...state,
      subscription: state.subscription.unsubscribe(),
    }),
    [LIST_MESSEGES_SUCCESS]: (state, { payload: messages }) => ({
      ...state,
      messages: messages,
    }),
    [LIST_MESSEGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [SEND_MESSAGE_SUCCESS]: (state) => ({
      ...state,
      message: initialState.message,
    }),
    [SEND_MESSAGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [RECEIVE_MESSAGE]: (state, { payload: message }) => ({
      ...state,
      messages: state.messages.concat(message),
    }),
  },
  initialState,
);

export default messenger;
