"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cartas() {
    const [cartas, setCartas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/firestore")
            .then(res => res.json())
            .then(data => {
                setCartas(data);
                setLoading(false);
            });
    },
        []);

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto py-10 px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-amber-900">Cartas disponibles</h1>
                    <Link href="/nueva-carta">
                        <button className="px-6 py-2 rounded-full bg-burdeos text-white font-bold shadow bg-[#a13a4a] transition cursor-pointer">
                            Enviar nueva carta
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <p className="text-[#f3f3e6]">Cargando cartas...</p>
                ) : (
                    <ul className="space-y-6">
                        {cartas.map((carta) => (
                            <li
                                key={carta.id}
                                className="bg-[#fff8e1] rounded-xl p-6 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <span className="block text-lg font-bold text-black mb-1">Nombre</span>
                                    <span className="block text-black break-words">{carta.nombre}</span>
                                </div>
                                <div className="flex-1 min-w-0 sm:text-right">
                                    <span className="block text-lg font-bold text-black mb-1">ID</span>
                                    <span className="block text-black break-all">{carta.id}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
} 