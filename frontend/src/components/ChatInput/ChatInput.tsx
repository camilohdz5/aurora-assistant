'use client';

import React, { useState } from 'react';
import { ChatInputForm, InputField, SubmitButton } from './ChatInput.styles';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <ChatInputForm onSubmit={handleSubmit}>
      <InputField
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje a Aurora..."
        disabled={isLoading}
      />
      <SubmitButton type="submit" disabled={isLoading || !message.trim()}>
        {isLoading ? 'Enviando...' : <FaPaperPlane />}
      </SubmitButton>
    </ChatInputForm>
  );
} 