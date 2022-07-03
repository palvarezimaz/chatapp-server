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
});

///Server chat rooms ////// NEEDS WORK
const chatRooms = ['General', 'Jokies', 'clock-room'];

// app.get('/', (req, res) => {
//   res.send(
//     '<h1>ChatApp Server - Thanks for putting me up!</h1><br><h3>Access the client via port 3000</h3>'
//   );
// });

// User name - HANDSHAKE -- NEEDS WORK
io.use((socket, next) => {
  const userN = socket.handshake.auth.user;
  socket.userName = userN;
  next();
});

//////// Adding user to the list of users
io.on('connection', (socket) => {
  const users = [];

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.userName,
    });
  }

  io.emit('users', users);

  // notify existing users
  // socket.broadcast.emit('user connected', {
  //   userID: socket.id,
  //   username: socket.userName,
  // });

  console.log('a user connected');
  console.log(`Socket id: ${socket.id}`);

  // socket.join(chatRooms[0]);

  /// Unique welcome message
  socket.on('Welcome Message', (name) => {
    console.log(`User ${name} has joined room ${chatRooms[0]}`);
    // io.emit('Welcome Message', name);
  });

  // General send message
  socket.on('chat message', (data) => {
    io.emit('chat message', {
      username: socket.userName,
      message: data,
      timestamp: new Date().toLocaleTimeString(),
    });
    // io.in(chatRooms[0]).emit('chat message', msg);

    console.log(`User ${socket.userName} wrote ${data}`);
    console.log(users);
  });

  // forward the private message to the right recipient
  socket.on('direct message', ({ content, to }) => {
    socket.to(to).emit('private message', {
      username: socket.userName,
      message: content,
      timestamp: new Date().toLocaleTimeString(),
    });
  });
  /////////// This needs work ///////
  // notify users upon disconnection
  socket.on('disconnect', () => {
    io.emit('user disconnected', socket.id); //
    //
    // socket.leave(chatRooms[0]);
    console.log('user disconnected', socket.id);
  });
});

////////////// SERVER PORT
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
