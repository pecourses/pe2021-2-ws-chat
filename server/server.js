const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { all } = require('./router');

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
  socket.on('send_message', data => {
    console.log('data', data);
    // save to db
  });
  io.emit('hi_from_server', {
    data: 'Message from server',
  });
});

// // подписка на событие
// io.on('событие', () => { })

// // инициация события
// io.emit('событие', {});

// socket.emit - to self
// io.emit - to all
// socket.broadcast - to all except self
