const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { SOCKET_EVENTS } = require('./constants');
const { Message } = require('./models');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});

const cors = {
  origin: '*',
};

const io = new Server(httpServer, {
  cors,
});

io.on('connection', socket => {
  // Обработка кейса "пришло новое сообщение"
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async message => {
    try {
      const createdMessage = await Message.create(message);
      // отправка сообщения всем
      io.emit(SOCKET_EVENTS.NEW_MESSAGE, createdMessage);
    } catch (err) {
      // отправка сообщения себе, что произошла ошибка
      socket.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, err);
    }
  });

  socket.emit('USER_WELLCOMING', 'Wellcome to conversation!');

  socket.broadcast.emit(
    'NEW_USER_CONNECTION',
    'Test Testivich is joined to conversation'
  );

  socket.on('disconnect', () => {
    console.log('user is disconnected');

    socket.broadcast.emit(
      'USER_LEAVING_CONNECTION',
      'Test Testivich is left to conversation'
    );
  });
});

// Отправлять уже существующим участникам чата уведомление о том, что к беседе присоединился Test Testovich
// Отправлять остающится участникам чата уведомление о том, что Test Testovich покинул беседу

// // подписка на событие
// io.on('событие', () => { })

// // инициация события
// io.emit('событие', {});

// socket.emit - to self
// io.emit - to all
// socket.broadcast.emit - to all except self
