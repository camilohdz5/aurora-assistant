import HomeLayout from "@/components/Layout/Home-Layout";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Bienvenido a Aurora Assistant</h1>
        </main>
      </div>
    </HomeLayout>
  );
}
