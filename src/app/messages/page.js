"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/readMessages');
        setContent(response.data.content);
      } catch (error) {
        setError('Failed to load messages');
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <pre>{content}</pre>
    </div>
  );
};

export default Messages;
