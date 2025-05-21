import styled from 'styled-components';

export const ChatInputForm = styled.form`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.background}; // O un color más oscuro si el fondo general es claro
  border-top: 1px solid ${({ theme }) => theme.colors.sidebarItemBackground}; // Un borde sutil
  // box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
`;

export const InputField = styled.input`
  flex-grow: 1;
  padding: 12px 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.sidebarItemBackground};
  background-color: ${({ theme }) => theme.colors.background}; // O un color de input específico
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33; // Un brillo sutil
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.sidebarItemBackground};
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white; // Asumiendo que el primario es oscuro, texto blanco
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 44px; // Ancho fijo para que sea cuadrado o circular con el ícono
  height: 44px; // Alto fijo

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}; // Podrías oscurecerlo o aclararlo un poco
    filter: brightness(1.1);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.sidebarItemBackground};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
    filter: none;
  }
`; 