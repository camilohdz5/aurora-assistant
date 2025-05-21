import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
  width: ${({ theme }) => theme.sidebarWidth};
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Para empujar UserInfoWrapper hacia abajo */
  color: ${({ theme }) => theme.colors.sidebarText};
  position: fixed; // Para que se mantenga fijo en el scroll
  top: 0;
  left: 0;
`;

export const LogoWrapper = styled.div`
  padding: 0 20px 30px 20px; // Espacio para el logo
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.sidebarText};
  // Aquí podrías agregar un <Image /> de Next.js si tienes un logo
`;

export const NavList = styled.nav`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

interface NavItemProps {
  $isActive?: boolean;
}

// const CURVE_SIZE = '20px'; // Ya no se usa
const LEFT_BORDER_RADIUS = '15px'; // Radio para las esquinas izquierdas

export const NavItem = styled.div<NavItemProps>`
  position: relative; // Necesario para el motion.div del fondo absoluto
  padding: 15px 20px; // El padding ahora está en el NavItem (li)
  margin: 5px 0; // El margen se mantiene en el NavItem (li)
  // El color del texto cambia según el estado activo
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.sidebarText};
  transition: color 0.2s ease-in-out;
  border-top-left-radius: ${LEFT_BORDER_RADIUS}; // Aplicar a NavItem para que el fondo animado lo herede o coincida
  border-bottom-left-radius: ${LEFT_BORDER_RADIUS}; // Aplicar a NavItem

  // Estilos para HOVER (aplicar solo si NO está activo)
  &:hover {
    ${({ theme, $isActive }) =>
      !$isActive &&
      `
        // background-color: ${theme.colors.sidebarItemBackground}; // Se podría quitar o ajustar si interfiere con la animación
        // color: ${theme.colors.sidebarTextActive}; // Eliminar o comentar esta línea
      `}
  }

  a {
    display: block;
    color: inherit; // Hereda el color de NavItem
    text-decoration: none;
    position: relative; // Para que el contenido esté sobre el fondo animado
    z-index: 1; // Asegura que el contenido del enlace esté por encima del fondo animado
    // Ya no hay padding, background-color, ni pseudo-elementos aquí
  }
`;

export const NavLinkContent = styled.span`
  // Si quieres añadir iconos junto al texto en el futuro
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Nuevos componentes estilizados para la información del usuario
export const UserInfoWrapper = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.sidebarText}; // Una línea divisoria
  display: flex;
  flex-direction: column; // Apilar elementos verticalmente
  align-items: center; // Centrar elementos
  gap: 10px;
`;

export const UserName = styled.span`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.sidebarText};
  text-align: center;
`;

export const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme.colors.danger}; // Un color distintivo para logout
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%; // Hacer que el botón ocupe el ancho disponible
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerHover}; // Color más oscuro en hover
  }
`;
