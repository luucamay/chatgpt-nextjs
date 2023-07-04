import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    setConversation((prev) => prev + `User: ${message}\n`);

    const { data } = await axios.post('/api/chat', {
      message,
      conversation,
    });

    setConversation((prev) => prev + `AI: ${data.message}\n`);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat with GPT-4</h1>
      <textarea value={conversation} readOnly />
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
