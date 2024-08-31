const ws = new WebSocket('ws://localhost:8080');
const chatContainer = document.getElementById('chatContainer');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'message') {
        const messageElement = document.createElement('div');
        messageElement.className = 'message receiver';
        messageElement.innerText = `${data.sender}: ${data.message}`;
        chatContainer.appendChild(messageElement);
        
    }
};

document.getElementById('sendButton').onclick = () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        ws.send(JSON.stringify({ type: 'message', message }));
        const messageElement = document.createElement('div');
        messageElement.className = 'message sender';
        messageElement.innerText = `Вы: ${message}`;
        chatContainer.appendChild(messageElement);
        messageInput.value = ''; 
        chatContainer.scrollTop = chatContainer.scrollHeight; 
    }
};
