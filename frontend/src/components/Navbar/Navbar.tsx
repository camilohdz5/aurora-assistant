'use client';

import Link from 'next/link';
import { NavbarWrapper, Logo, NavActions, NavButton } from './Navbar.styles';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <Logo>
        <Link href="/">Aurora Assistant</Link>
      </Logo>
      <NavActions>
        <Link href="/demo" passHref>
          <NavButton>Demo</NavButton>
        </Link>
        <Link href="/login" passHref>
          <NavButton>Login</NavButton>
        </Link>
      </NavActions>
    </NavbarWrapper>
  );
} 