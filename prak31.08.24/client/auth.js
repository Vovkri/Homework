
const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'auth') {
                if (data.success) {
                    window.location.href = 'C:/Users/Студент212-1/Documents/prak31.08.24/client/chat.html';
                } else {
                    document.getElementById('message').innerText = 'Неверное имя пользователя или пароль';
                }
            } else if (data.type === 'register') {
                if (data.success) {
                    document.getElementById('message').innerText = 'Регистрация успешна! Теперь вы можете войти.';
                } else {
                    document.getElementById('message').innerText = data.error;
                }
            }
        };

        document.getElementById('authButton').onclick = () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const hashedPassword = CryptoJS.SHA256(password).toString(); 
        ws.send(JSON.stringify({ type: 'auth', username, password: hashedPassword }));
        };

        document.getElementById('registerButton').onclick = () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const hashedPassword = CryptoJS.SHA256(password).toString(); 
        ws.send(JSON.stringify({ type: 'register', username, password: hashedPassword }));
        };