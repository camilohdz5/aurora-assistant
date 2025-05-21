'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectIsAuthenticated, selectCurrentUser } from '../redux/slices/userSlice';

export function useAuth() {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  return { isAuthenticated, user };
} 