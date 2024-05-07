const socket = io();

const messagesList = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const connectionStatus = document.querySelector('.connection-status');

sendButton.addEventListener('click', () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
        sendMessage(messageText);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

socket.on('chat response', (response) => {
    receiveMessage(response, 'bot-message');
