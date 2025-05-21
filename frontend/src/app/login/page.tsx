'use client';

import Link from 'next/link';
import styles from '../page.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginSuccess } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store';
import HomeLayout from '@/components/Layout/Home-Layout';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSimulatedLogin = () => {
    // Datos ficticios para el usuario y token
    const simulatedUser = {
      id: '123',
      name: 'Usuario Ejemplo',
      email: 'usuario@ejemplo.com',
    };
    const simulatedToken = 'fake-jwt-token-12345';

    dispatch(loginSuccess({ user: simulatedUser, token: simulatedToken }));
    router.push('/dashboard'); // Redirigir al dashboard después del login
  };

  return (
    <HomeLayout>
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Login / Registro</h1>
        <p>Formulario de login/registro aquí...</p>
        
        <button onClick={handleSimulatedLogin} className={styles.primary} style={{ marginTop: '20px' }}>
          Simular Login Exitoso
        </button>

        {/* Enlace temporal, puede ser eliminado o modificado después */}
        <Link href="/dashboard" className={styles.secondary} style={{ marginTop: '10px' }}>
          Ir al Dashboard (temporal)
        </Link>
      </main>
    </div>
    </HomeLayout>
  );
} 