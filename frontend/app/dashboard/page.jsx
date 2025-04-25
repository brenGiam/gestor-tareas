'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TareasBox from "@/components/TareasBox";

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push('/'); // Redirige al login si no hay token
        }
    }, []);

    const boxStyle = "bg-teal-950 w-full min-h-screen"

    return (
        <div className={boxStyle}>
            <TareasBox />
        </div>
    )
}