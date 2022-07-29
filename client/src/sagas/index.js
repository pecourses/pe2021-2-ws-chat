import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from './../actions/actionTypes';
import { getMessagesSaga, createMessageSaga } from './messageSagas';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_ACTION, getMessagesSaga);
  yield takeLatest(ACTION_TYPES.CREATE_MESSAGE_ACTION, createMessageSaga);
}

export default rootSaga;
