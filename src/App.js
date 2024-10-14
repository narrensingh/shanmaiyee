import React, { useState } from 'react';
import { run } from './geminiService';
import ReactMarkdown from 'react-markdown';
import { MathComponent } from 'mathjax-react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './App.css'; // Import your CSS styles

const Message = React.memo(({ message }) => {
  return (
    <div className="message">
      <strong>{message.user}:</strong>{' '}
      <ReactMarkdown
        children={message.text}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          math: ({ value }) => <MathComponent tex={value} />,
          inlineMath: ({ value }) => <MathComponent tex={value} />,
        }}
      />
    </div>
  );
});

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { user: 'You', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const botResponse = await run(input);
      if (botResponse) {
        const botMessage = { user: 'Bot', text: botResponse };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error('No response from the Gemini API');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <h2>Gemini AI Chatbot</h2>
      {error && <div className="error">{error}</div>}
      <div className="doubt__engine"></div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
