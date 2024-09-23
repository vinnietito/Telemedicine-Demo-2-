const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');

// Create an express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Replace with your MySQL username
    password: 'V@38080135k',       // Replace with your MySQL password
    database: 'telemedicinedemo2'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// Handle socket connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Retrieve chat history from MySQL
    db.query('SELECT * FROM chats ORDER BY timestamp ASC', (err, result) => {
        if (err) throw err;
        socket.emit('output-messages', result); // Send chat history to new user
    });

    // Listen for new chat messages
    socket.on('chatMessage', (data) => {
        const { username, message, role } = data;

        // Insert the message into the MySQL database
        const query = 'INSERT INTO chats (username, message, role) VALUES (?, ?, ?)';
        db.query(query, [username, message, role], (err, result) => {
            if (err) throw err;

            // Broadcast the new message to all clients
            io.emit('message', { username, message, role });
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
