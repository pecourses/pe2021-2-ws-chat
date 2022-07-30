import { put } from 'redux-saga/effects';
import {
  createMessageError,
  createMessageRequest,
  getMessagesError,
  getMessagesRequest,
  getMessagesSuccess,
} from '../actions/actionCreators';
import * as API from './../api';

export function * getMessagesSaga ({ limit }) {
  yield put(getMessagesRequest());
  try {
    const {
      data: { data: messages },
    } = yield API.http.getMessages(limit);
    yield put(getMessagesSuccess(messages));
  } catch (err) {
    yield put(getMessagesError(err));
  }
}

export function * createMessageSaga (action) {
  const { payload: newMessage } = action;

  yield put(createMessageRequest());
  try {
    yield API.ws.createMessage(newMessage);
  } catch (err) {
    yield put(createMessageError(err));
  }
}
