import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme'; // Asegúrate que la ruta sea correcta

interface GlobalStylesProps {
  theme?: ThemeType; // Se hace opcional la prop theme
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme!.colors.background};
    color: ${({ theme }) => theme!.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    // Otros estilos globales que necesites
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme!.colors.primary};
    text-decoration: none;
  }

  // Puedes añadir más estilos base para h1, p, etc. aquí
`;

export default GlobalStyles; 