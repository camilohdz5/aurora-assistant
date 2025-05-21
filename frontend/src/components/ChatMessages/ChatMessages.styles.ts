import styled, { keyframes } from 'styled-components';

export const MessagesWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.background}; // Fondo del área de chat
`;

interface MessageBubbleProps {
  $sender: 'user' | 'llm';
}

export const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme, $sender }) =>
    $sender === 'user' ? theme.colors.primary : theme.colors.sidebarItemBackground};
  color: ${({ theme, $sender }) =>
    $sender === 'user' ? theme.colors.sidebarText : theme.colors.text};
  align-self: ${({ $sender }) => ($sender === 'user' ? 'flex-end' : 'flex-start')};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: relative;
  word-wrap: break-word;
`;

export const MessageSender = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: inherit; // Hereda de MessageBubble

  svg {
    font-size: 1rem;
  }
`;

export const MessageContent = styled.p`
  margin: 0 0 5px 0;
  line-height: 1.5;
  font-size: 0.95rem;
  color: inherit; // Hereda de MessageBubble
  white-space: pre-wrap; // Para respetar saltos de línea y espacios
`;

export const MessageTimestamp = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
  display: block;
  text-align: right;
  color: inherit; // Hereda de MessageBubble
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0; // Espacio para el indicador

  span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: ${({ theme }) => theme.colors.textLight}; // Color de los puntos
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`; 