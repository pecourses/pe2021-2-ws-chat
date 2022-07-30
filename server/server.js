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

  socket.on('disconnect', () => {
    console.log('user is disconnected');
  });
});

// // подписка на событие
// io.on('событие', () => { })

// // инициация события
// io.emit('событие', {});

// socket.emit - to self
// io.emit - to all
// socket.broadcast - to all except self
