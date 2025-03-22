const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = 3002;
const app = express();
const server = http.createServer(app);

origin = 'https://palvarezimaz.github.io/chatapp-client';

const io = socketIo(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

// User name - HANDSHAKE
io.use((socket, next) => {
  const userN = socket.handshake.auth.user;
  socket.userName = userN;
  next();
});

//////// Adding user to the list of users
io.on('connection', (socket) => {
  let users = [];

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.userName,
    });
  }

  io.emit('users', users);
  console.log('a user connected');
  console.log(`Socket id: ${socket.id}`);

  socket.on('chat message', (data) => {
    io.emit('chat message', {
      username: socket.userName,
      message: data,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // forward the private message to the right recipient
  socket.on('direct message', ({ content, to }) => {
    socket.to(to).emit('direct message', {
      message: content,
      to: to,
      from: socket.userName,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  /// SERVER SIDE
  socket.on('disconnect', () => {
    socket.emit('user disconnected', socket.id); //
    let users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: socket.userName,
      });
    }
    io.emit('users', users);
    console.log('user disconnected', socket.id);
  });
});

////////////// SERVER PORT
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
