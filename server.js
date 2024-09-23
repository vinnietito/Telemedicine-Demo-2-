const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);  // Initialize Socket.IO with HTTP server

// Serve your static files (e.g., the client-side code)
app.use(express.static('public'));

// Handle connection events
io.on('connection', (socket) => {
  console.log('A user connected');

  // You can listen for custom events and respond
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
