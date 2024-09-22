// chat.js

// Select elements
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message");

// Event listener for form submission
chatForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the user's message
    const userMessage = messageInput.value;
    
    // Display the user's message in the chat box
    displayMessage(userMessage, "user");

    // Clear the input field after sending the message
    messageInput.value = "";

    // Simulate doctor's response after a short delay
    setTimeout(() => {
        const doctorResponse = generateDoctorResponse(userMessage);
        displayMessage(doctorResponse, "doctor");
    }, 1000);
});

// Function to display a message in the chat box
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
        messageElement.textContent = `You: ${message}`;
    } else if (sender === "doctor") {
        messageElement.classList.add("doctor-message");
        messageElement.textContent = `Doctor: ${message}`;
    }

    // Append the message to the chat box
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate a simple doctor's response
function generateDoctorResponse(userMessage) {
    const responses = [
        "Please provide more details about your symptoms.",
        "I recommend scheduling an appointment for further evaluation.",
        "Make sure to stay hydrated and rest.",
        "If the symptoms persist, please visit the clinic.",
        "Have you taken any medications for this issue?",
        "Please try to avoid stressful activities."
    ];

    // Respond with a random message from the list
    return responses[Math.floor(Math.random() * responses.length)];
}
