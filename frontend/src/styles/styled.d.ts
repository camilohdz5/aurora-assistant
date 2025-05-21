import 'styled-components';
import { ThemeType } from './theme'; // Importa tu tipo de tema

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeType['colors'];
    fonts: ThemeType['fonts'];
    sidebarWidth: ThemeType['sidebarWidth'];
  }
} 