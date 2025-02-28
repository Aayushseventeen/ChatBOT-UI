import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim()) {
            const userMessage = { sender: 'User', text: input };
            setMessages((prev) => [...prev, userMessage]);

            try {
                const response = await axios.post('http://localhost:8000/chat', { message: input });
                const botMessage = { sender: 'Bot', text: response.data.reply };
                setMessages((prev) => [...prev, botMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
            }

            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <h1>Chatbot UI</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'User' ? 'user-message' : 'bot-message'}>
                        <strong>{msg.sender}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
