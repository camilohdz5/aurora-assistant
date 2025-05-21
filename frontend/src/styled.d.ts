import 'styled-components';
import { ThemeType } from './styles/theme'; // Ruta a tu ThemeType

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
} 