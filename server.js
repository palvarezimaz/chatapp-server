const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
}); //in case server and client run on different urls

app.get('/', (req, res) => {
  res.send(
    '<h1>ChatApp Server - Thanks for putting me up!</h1><br><h3>Access the client via port 3000</h3>'
  );
});

//  Chat rooms
// const chatRooms = ['General', 'Jokies', 'clock-room'];

// User name - HANDSHAKE
// io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error('invalid username'));
//   }
//   socket.username = username;
//   next();
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('test', (userName) => {
    // io.emit('return message', userName);
  });
  // fetch existing users
  // const users = [];
  // for (let [id, socket] of io.of('/').sockets) {
  //   users.push({
  //     userID: id,
  //     username: socket.username,
  //   });
  // }
  // socket.emit('users', users);

  // console.log('client connected: ', socket.id);
  // /// LOGIN WORK NEEDED
  // // socket.join('clock-room');
  // socket.join(chatRooms[0]);

  // notify existing users
  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });
  // forward the private message to the right recipient
  socket.on('private message', ({ content, to }) => {
    socket.to(to).emit('private message', {
      content,
      from: socket.id,
    });
  });

  // notify users upon disconnection
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', socket.id);
    console.log('user disconnected');
  });
});

////////////// SERVER PORT
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
