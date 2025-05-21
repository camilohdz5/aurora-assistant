"use client";

import styles from "../page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import RootLayout from "../../components/Layout/Layout";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  console.log("[DashboardPage] Render - isAuthenticated:", isAuthenticated);

  useEffect(() => {
    console.log(
      "[DashboardPage] useEffect - isAuthenticated:",
      isAuthenticated
    );
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      console.log("[DashboardPage] useEffect - Redirecting to /forbidden");
      router.push("/forbidden");
    }
  }, [isAuthenticated, router]);

  if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
    console.log(
      "[DashboardPage] Render - Showing Loading because !isAuthenticated"
    );
    return <p>Cargando...</p>;
  }
  // Si isAuthenticated es undefined (caso que no debería ocurrir con Redux bien configurado),
  // también podría mostrar Cargando o manejarlo como un estado inicial.
  // Por simplicidad y dado que Redux inicializa isAuthenticated a false, nos enfocamos en el booleano.

  if (!isAuthenticated) {
    // Cubre el caso inicial donde isAuthenticated es false
    console.log(
      "[DashboardPage] Render - Showing Loading (general !isAuthenticated check)"
    );
    return <p>Cargando...</p>;
  }

  console.log("[DashboardPage] Render - Rendering content");
  return (
    <RootLayout>
      
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Dashboard</h1>
        </main>
      </div>
    </RootLayout>
  );
}
