import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
  width: 260px; // Ancho típico para sidebars de chat
  height: 100%; // Ocupa toda la altura disponible
  background-color: ${({ theme }) => theme.colors.primary}; // Mismo color que el Sidebar existente
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarItemBackground}; // Borde para separar del chat
`;

export const NewChatButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.sidebarText}; // Borde sutil
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarItemBackground};
    color: ${({ theme }) => theme.colors.sidebarTextActive};
  }
`;

export const SessionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; // Para scroll si hay muchas sesiones
  flex-grow: 1;
`;

interface SessionItemProps {
  $isActive?: boolean;
}

export const SessionItem = styled.li<SessionItemProps>`
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.sidebarItemBackground : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.sidebarTextActive : theme.colors.sidebarText};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      !$isActive && theme.colors.sidebarItemBackground};
    color: ${({ theme, $isActive }) =>
      !$isActive && theme.colors.sidebarTextActive};
  }
`;

export const SessionLink = styled.a`
  color: inherit; // Hereda color de SessionItem
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; // Para nombres de sesión largos
  margin-bottom: 4px;

  &:hover {
    text-decoration: none; // Asegurar que no haya subrayado al hacer hover si no se desea
  }
`;

export const SessionDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight}; // Un color más tenue para la fecha
  opacity: 0.8;
`; 