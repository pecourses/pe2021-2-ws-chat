import axios from 'axios';
import { io } from 'socket.io-client';
import {
  createMessageError,
  createMessageSuccess,
} from '../actions/actionCreators';
import store from './../store';

// http
const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

// ws
const SOCKET_EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR',
};

const socket = io('http://localhost:5000');

export const createMessage = newMessage =>
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);

socket.on(SOCKET_EVENTS.NEW_MESSAGE, newMessage => {
  store.dispatch(createMessageSuccess(newMessage));
});

socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, err => {
  store.dispatch(createMessageError(err));
});
