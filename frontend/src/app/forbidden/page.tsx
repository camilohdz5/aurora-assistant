"use client";

import Link from "next/link";
import styles from "../page.module.css"; // Puedes crear estilos específicos si lo deseas
import { useRouter } from "next/navigation";
import HomeLayout from "@/components/Layout/Home-Layout";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <HomeLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Acceso Denegado</h1>
          <p>No tienes permiso para ver esta página.</p>
          <p>Por favor, inicia sesión para continuar.</p>
          <Link
            href='/login'
            className={styles.primary}
            style={{ marginTop: "20px" }}
          >
            Ir a Iniciar Sesión
          </Link>
          <button
            onClick={() => router.back()}
            className={styles.secondary}
            style={{ marginTop: "10px" }}
          >
            Regresar
          </button>
        </main>
      </div>
    </HomeLayout>
  );
}
