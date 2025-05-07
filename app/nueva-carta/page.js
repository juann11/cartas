"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaCarta() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/firestore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: { nombre, mensaje } }),
        });
        setLoading(false);
        if (res.ok) {
            router.push("/cartas");
        } else {
            alert("Error al enviar la carta");
        }
    };

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-burdeos">Agregar nueva carta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Nombre</label>
                    <input
                        className="w-full border border-burdeos rounded px-3 py-2"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Mensaje</label>
                    <textarea
                        className="w-full border border-burdeos rounded px-3 py-2"
                        value={mensaje}
                        onChange={e => setMensaje(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-burdeos text-white font-bold shadow bg-[#a13a4a] transition cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar carta"}
                </button>
            </form>
        </div>
    );
} 