import React, { useState, useEffect } from 'react';

type Message = {
  id: number;
  text: string;
  from: string;
};

const MessageApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulating incoming message after 20 seconds
      const newMessage: Message = {
        id: Math.random(),
        text: 'Hello! How are you?',
        from: 'Friend',
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMessageSend = () => {
    if (replyText.trim() !== '') {
      const replyMessage: Message = {
        id: Math.random(),
        text: replyText,
        from: 'You',
      };
      setMessages(prevMessages => [...prevMessages, replyMessage]);
      setReplyText('');
    }
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <p>{`${message.from}: ${message.text}`}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your reply..."
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default MessageApp;