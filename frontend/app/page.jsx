"use client";

import { loginUser } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/homePage.module.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>Iniciá sesión para comenzar</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Iniciar sesión
          </button>
        </form>
        <p className={styles.textCenter}>
          o hacé <Link className={styles.link} href="/register">click acá</Link> para registrarte
        </p>
      </div>
    </div>
  );
}
