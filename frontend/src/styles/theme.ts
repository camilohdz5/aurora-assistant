export const theme = {
  colors: {
    primary: '#007bff', // Un azul llamativo, puedes ajustarlo
    background: '#1a1a1a', // Gris oscuro casi negro
    sidebarItemBackground: '#1a1a1a', // Igual al fondo para el efecto deseado
    text: '#ffffff',
    textLight: '#f0f0f0',
    sidebarText: '#ffffff',
    sidebarTextActive: '#007bff', // O el color que prefieras para el texto activo en sidebar
    danger: '#dc3545', // Rojo para peligro/logout
    dangerHover: '#c82333', // Rojo más oscuro para hover
  },
  fonts: {
    main: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    // Puedes añadir más fuentes aquí, por ejemplo, las de Geist que ya usas
    geistSans: 'var(--font-geist-sans)',
    geistMono: 'var(--font-geist-mono)',
  },
  sidebarWidth: '250px',
  borderRadius: '4px', // Un radio de borde estándar
};

export type ThemeType = typeof theme; 