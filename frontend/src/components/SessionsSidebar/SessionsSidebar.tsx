'use client';

import React from 'react';
import {
  SidebarWrapper,
  SessionList,
  SessionItem,
  SessionDate,
  NewChatButton,
  SessionLink,
} from './SessionsSidebar.styles';
import { FaPlus } from 'react-icons/fa';

// Datos hardcodeados para las sesiones
const dummySessions = [
  { id: '1', name: 'Conversación sobre React Hooks', date: '2024-07-28' },
  { id: '2', name: 'Ideas para proyecto Next.js', date: '2024-07-27' },
  { id: '3', name: 'Preguntas sobre Langchain', date: '2024-07-26' },
  { id: '4', name: 'Ayuda con Docker', date: '2024-07-25' },
];

interface SessionsSidebarProps {
  currentSessionId?: string;
  onSelectSession: (sessionId: string) => void;
  onCreateNewSession: () => void;
}

export default function SessionsSidebar({
  currentSessionId,
  onSelectSession,
  onCreateNewSession,
}: SessionsSidebarProps) {
  return (
    <SidebarWrapper>
      <NewChatButton onClick={onCreateNewSession}>
        <FaPlus /> Nueva Conversación
      </NewChatButton>
      <SessionList>
        {dummySessions.map((session) => (
          <SessionItem
            key={session.id}
            $isActive={session.id === currentSessionId}
            onClick={() => onSelectSession(session.id)}
          >
            <SessionLink href={`/aurora-assistant/session/${session.id}`}>
              {session.name}
            </SessionLink>
            <SessionDate>{new Date(session.date).toLocaleDateString()}</SessionDate>
          </SessionItem>
        ))}
      </SessionList>
    </SidebarWrapper>
  );
} 