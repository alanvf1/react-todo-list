import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import { Tasks } from "./components/Tasks";

export function App() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <Tasks />
      </main>
    </>
  );
}
