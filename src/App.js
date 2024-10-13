import React, { useState } from 'react';
import { getGeminiResponse } from './geminiService';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { user: 'You', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await getGeminiResponse(input);
      const botMessage = { user: 'Bot', text: botResponse };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        user: 'Bot',
        text: 'Sorry, there was an error processing your request.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      console.error('Error:', error);
    }

    setInput('');
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Shanmaiyee</h2>

      <div
        style={{
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          style={{ padding: '10px', width: '80%', marginRight: '10px' }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
