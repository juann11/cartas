import Link from "next/link";

export default function Tutorial() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 flex flex-col items-center justify-start py-12 px-6 md:px-10 border-b md:border-b-0 md:border-r border-[#ececec] bg-[#f5f6fa]">
                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <div className="w-24 h-24 rounded-full bg-[#ffe6a0] flex items-center justify-center shadow-md mb-2">
                        <span className="text-4xl font-bold text-[#8B2C3B]">📚</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#222] text-center">Tutorial Next.js + Firebase</h1>
                    <p className="text-[#555] text-center text-lg mb-2">
                        Aprende a conectar tu app Next.js con Firestore de Firebase paso a paso, con ejemplos claros y código real.
                    </p>
                    <div className="flex gap-3 mt-2">
                        <Link href="/" className="text-[#8B2C3B] hover:underline text-sm font-semibold">Inicio</Link>
                        <Link href="/cartas" className="text-[#8B2C3B] hover:underline text-sm font-semibold">Cartas</Link>
                        <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#8B2C3B] hover:underline text-sm font-semibold">Firebase Console</a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center py-12 px-2 md:px-10">
                <div className="w-full max-w-3xl flex flex-col gap-8">
                    {/* Paso 0 */}
                    <section className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-[#ffe6a0] flex items-center justify-center font-bold text-[#8B2C3B]">0</span>
                            <h2 className="text-xl font-bold text-[#8B2C3B]">[Opcional] Instalar Firebase CLI</h2>
                        </div>
                        <ol className="list-decimal list-inside text-[#222] space-y-3">
                            <li>
                                Instala Firebase CLI globalmente usando npm:
                                <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 mt-2 mb-2 overflow-x-auto border border-[#f3e6c1]">npm install -g firebase-tools</pre>
                            </li>
                            <li>
                                Inicia sesión en Firebase:
                                <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 mt-2 mb-2 overflow-x-auto border border-[#f3e6c1]">firebase login</pre>
                            </li>
                            <li>
                                Inicia el proyecto de Firebase (en la raíz de tu proyecto):
                                <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 mt-2 mb-2 overflow-x-auto border border-[#f3e6c1]">firebase init</pre>
                            </li>
                        </ol>
                    </section>

                    {/* Paso 1 */}
                    <section className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-[#ffe6a0] flex items-center justify-center font-bold text-[#8B2C3B]">1</span>
                            <h2 className="text-xl font-bold text-[#8B2C3B]">Configurar Firebase en Next.js</h2>
                        </div>
                        <ol className="list-decimal list-inside text-[#222] space-y-3">
                            <li>Ve a <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#8B2C3B] underline hover:text-[#a13a4a]">Firebase Console</a> y crea un nuevo proyecto.</li>
                            <li>Agrega una app web y copia la configuración, te servirá más adelante.</li>
                            <li>Instala Firebase en tu proyecto:
                                <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 mt-2 mb-2 overflow-x-auto border border-[#f3e6c1]">npm install firebase</pre>
                            </li>
                            <li>Crea un archivo <b>.env.local</b> en la raíz y pega tus variables de configuración.</li>
                            <li>Crea una carpeta <b>firebase</b> y un archivo <b>firebase.js</b> con la configuración:</li>
                        </ol>
                        <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 overflow-x-auto border border-[#f3e6c1]">
                            {`import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;`}
                        </pre>
                    </section>

                    {/* Paso 2 */}
                    <section className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-[#ffe6a0] flex items-center justify-center font-bold text-[#8B2C3B]">2</span>
                            <h2 className="text-xl font-bold text-[#8B2C3B]">Escribir en Firebase (nueva-carta)</h2>
                        </div>
                        <p className="text-[#222]">Crea una API route en <b>app/api/firestore/route.js</b>:</p>
                        <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 overflow-x-auto border border-[#f3e6c1]">
                            {`import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import app from "../../../firebase";
import { NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function POST(req) {
    const { data } = await req.json();
    try {
        const docRef = doc(collection(firestore, "cartas"));
        const id = docRef.id;
        await setDoc(docRef, { ...data, id });
        return NextResponse.json({ id: id, ...data });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add document " + error });
    }
}`}
                        </pre>
                        <p className="text-[#222]">Y el formulario en <b>app/nueva-carta/page.js</b>:</p>
                        <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 overflow-x-auto border border-[#f3e6c1]">
                            {`"use client";
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
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
            <textarea className="w-full border border-[#ffe6a0] rounded px-3 py-2" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Mensaje" required />
            <button type="submit" className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm transition hover:bg-[#ffda6a]" disabled={loading}>
                {loading ? "Enviando..." : "Enviar carta"}
            </button>
        </form>
    );
}`}
                        </pre>
                    </section>

                    {/* Paso 3 */}
                    <section className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-[#ffe6a0] flex items-center justify-center font-bold text-[#8B2C3B]">3</span>
                            <h2 className="text-xl font-bold text-[#8B2C3B]">Leer de Firebase (cartas)</h2>
                        </div>
                        <p className="text-[#222]">Agrega el método GET en <b>app/api/firestore/route.js</b>:</p>
                        <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 overflow-x-auto border border-[#f3e6c1]">
                            {`export async function GET() {
    const snapshot = await getDocs(collection(firestore, "cartas"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return NextResponse.json(data);
}`}
                        </pre>
                        <p className="text-[#222]">Y muestra las cartas en <b>app/cartas/page.js</b>:</p>
                        <pre className="bg-[#fff8e1] text-[#8B2C3B] rounded-lg p-3 overflow-x-auto border border-[#f3e6c1]">
                            {`"use client";
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
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#8B2C3B]">Cartas disponibles</h1>
                <Link href="/nueva-carta">
                    <button className="px-6 py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm hover:bg-[#ffda6a] transition">Enviar nueva carta</button>
                </Link>
            </div>
            {loading ? (
                <p className="text-[#8B2C3B]">Cargando cartas...</p>
            ) : (
                <ul className="space-y-4">
                    {cartas.map((carta) => (
                        <li key={carta.id} className="bg-[#fff8e1] rounded-xl p-4 shadow flex flex-col gap-2">
                            <span className="font-semibold text-[#8B2C3B]">{carta.nombre}</span>
                            <span className="text-[#222]">{carta.mensaje}</span>
                            <span className="text-xs text-[#bfa77a]">ID: {carta.id}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}`}
                        </pre>
                    </section>

                    {/* Final */}
                    <section className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4 items-center">
                        <h2 className="text-xl font-bold text-[#8B2C3B]">¡Listo!</h2>
                        <p className="text-[#222] text-center">Ya tienes una app Next.js conectada a Firebase con Firestore. Puedes seguir mejorando tu app agregando autenticación, reglas de seguridad y más funcionalidades.</p>
                        <a href="https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/" target="_blank" rel="noopener noreferrer" className="text-[#8B2C3B] underline hover:text-[#a13a4a] font-semibold">Ver tutorial original en freeCodeCamp</a>
                    </section>
                </div>
            </main>
        </div>
    );
}
