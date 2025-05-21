'use client';

import React, { useEffect, useRef } from 'react';
import {
  MessagesWrapper,
  MessageBubble,
  MessageSender,
  MessageContent,
  MessageTimestamp,
  TypingIndicator,
} from './ChatMessages.styles';
import { FaUser, FaRobot } from 'react-icons/fa'; // Iconos para usuario y LLM

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'llm';
  timestamp: string; // o Date
}

// Datos hardcodeados para los mensajes
const dummyMessages: Message[] = [
  {
    id: '1',
    text: 'Hola, ¿cómo puedo subir un documento para analizarlo?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    text: '¡Hola! Puedes subir tu documento usando el botón de adjuntar (actualmente no implementado en esta UI de ejemplo) o especificando una ruta si ya está en el sistema. ¿Qué tipo de documento es?',
    sender: 'llm',
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: '3',
    text: 'Es un PDF sobre inteligencia artificial.',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: '4',
    text: 'Entendido. Una vez que lo subas, podré ayudarte a responder preguntas sobre él.',
    sender: 'llm',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean; // Para mostrar indicador de "escribiendo"
}

export default function ChatMessages({ messages = dummyMessages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <MessagesWrapper>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} $sender={msg.sender}>
          <MessageSender>
            {msg.sender === 'user' ? <FaUser /> : <FaRobot />} 
            {msg.sender === 'user' ? 'Tú' : 'Aurora'}
          </MessageSender>
          <MessageContent>{msg.text}</MessageContent>
          <MessageTimestamp>
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </MessageTimestamp>
        </MessageBubble>
      ))}
      {isLoading && (
        <MessageBubble $sender="llm">
          <MessageSender><FaRobot /> Aurora</MessageSender>
          <TypingIndicator>
            <span></span><span></span><span></span>
          </TypingIndicator>
        </MessageBubble>
      )}
      <div ref={messagesEndRef} />
    </MessagesWrapper>
  );
} 