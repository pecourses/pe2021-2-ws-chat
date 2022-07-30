import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import { io } from 'socket.io-client';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// ---------------------------
const socket = io('http://localhost:5000');

socket.emit('send_message', { message: 'HI)))' });

socket.on('hi_from_server', data => {
  console.log('data', data);
});
