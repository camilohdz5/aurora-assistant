'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaRocket, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'styled-components';
import {
  SidebarWrapper, 
  NavList, 
  NavItem, 
  LogoWrapper,
  NavLinkContent,
  UserInfoWrapper,
  UserName,
  LogoutButton
} from './Sidebar.styles';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: <FaHome /> },
  { href: '/aurora-assistant', label: 'Assistant', icon: <FaRocket /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push('/');
  };

  return (
    <SidebarWrapper>
      <div>
        <LogoWrapper>
         Aurora Assistant
        </LogoWrapper>
        <NavList>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard'));
            return (
              <NavItem
                as={motion.li}
                key={item.href}
                $isActive={isActive}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeItemBackground"
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: theme.colors.background,
                      borderRadius: 'inherit',
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <Link href={item.href}>
                    <NavLinkContent>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLinkContent>
                </Link>
              </NavItem>
            );
          })}
        </NavList>
      </div>

      {isAuthenticated && (
        <UserInfoWrapper>
          <FaUserCircle size={24} />
          <UserName>{user?.name || 'Usuario'}</UserName>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Salir
          </LogoutButton>
        </UserInfoWrapper>
      )}
    </SidebarWrapper>
  );
} 