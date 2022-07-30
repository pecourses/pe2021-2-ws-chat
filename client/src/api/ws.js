import { io } from 'socket.io-client';
import {
  createMessageError,
  createMessageSuccess,
} from '../actions/actionCreators';
import store from './../store';
import CONSTANTS from './../constants';

const { NEW_MESSAGE, NEW_MESSAGE_ERROR } = CONSTANTS.SOCKET_EVENTS;

const socket = io('http://localhost:5000');

export const createMessage = newMessage => socket.emit(NEW_MESSAGE, newMessage);

socket.on(NEW_MESSAGE, newMessage => {
  store.dispatch(createMessageSuccess(newMessage));
});

socket.on(NEW_MESSAGE_ERROR, err => {
  store.dispatch(createMessageError(err));
});

socket.on('USER_WELLCOMING', message => {
  console.log('message', message);
});

socket.on('NEW_USER_CONNECTION', message => {
  console.log('message', message);
});

socket.on('USER_LEAVING_CONNECTION', message => {
  console.log('message', message);
});
