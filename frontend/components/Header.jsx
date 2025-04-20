import { lora, montserrat } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/header.module.css";

export default function Header() {
    return (
        <div className={styles.mainBox}>
            <div className={styles.box}>
                <h1 className={`${styles.title} ${montserrat.className}`}>Gestor de Tareas</h1>
                <div className={styles.imageBox}>
                    <Image
                        src="/defaultUser.jpg"
                        width={50}
                        height={50}
                        alt="Default user"
                        className={styles.image}
                    />
                    <span className={styles.link}>
                        <Link href="/">Iniciar sesión</Link>
                    </span>
                </div>
            </div>
            <h2 className={`${styles.subtitle} ${lora.className}`}>
                Organizá tu día, tomá el control de tu tiempo, gestioná con facilidad
                <Image
                    src="/check.png"
                    width={25}
                    height={25}
                    alt="check"
                    className={styles.icon}
                />
            </h2>
        </div>
    );
}