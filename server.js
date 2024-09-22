const socket = io();  // Connect to Socket.io server
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Load past messages when connecting
socket.on('output-messages', (data) => {
    data.forEach(message => displayMessage(message));
});

// Event listener for form submission
chatForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const message = messageInput.value;

    // Get user role (doctor or patient)
    const role = prompt('Enter your role: doctor or patient').toLowerCase();
    const username = prompt('Enter your name');

    // Send message to server
    const chatData = { username, message, role };
    socket.emit('chatMessage', chatData);

    // Clear the input field
    messageInput.value = '';
});

// Display new messages from server
socket.on('message', (data) => {
    displayMessage(data);
});

// Function to display a message in the chat box
function displayMessage({ username, message, role }) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (role === 'doctor') {
        messageElement.classList.add('doctor-message');
        messageElement.textContent = `Dr. ${username}: ${message}`;
    } else {
        messageElement.classList.add('user-message');
        messageElement.textContent = `${username}: ${message}`;
    }

    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}
