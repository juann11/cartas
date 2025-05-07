export default function Tutorial() {
    return (
        <div className="min-h-screen py-10 px-2 flex justify-center">
            <div className="w-full max-w-5xl bg-white/90 rounded-xl shadow-xl p-8 border border-[#e2d6c2]">
                <h1 className="text-3xl font-bold text-[#8B2C3B] mb-2 text-center drop-shadow">Conectando Next con Firestore de Firebase</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">0. [OPCIONAL] Instalar Firebase CLI</h2>
                    <p className="mb-4 text-[#181818]">
                        Primero necesitamos instalar la interfaz de línea de comandos (CLI) de Firebase. Esta herramienta nos permitirá interactuar con Firebase desde la terminal.
                    </p>
                    <ol className="list-decimal list-inside mb-2 text-[#181818] space-y-6">
                        <li className="mb-4">
                            Instala Firebase CLI globalmente usando npm:
                            <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mt-2 mb-2 overflow-x-auto">
                                {`npm install -g firebase-tools`}
                            </pre>
                        </li>
                        <li className="mb-4">
                            Inicia sesión en Firebase:
                            <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mt-2 mb-2 overflow-x-auto">
                                {`firebase login`}
                            </pre>
                            <p className="mt-2 text-[#181818]">
                                Esto abrirá una ventana del navegador donde deberás iniciar sesión con tu cuenta de Google. Una vez que hayas iniciado sesión, podrás usar el CLI de Firebase para interactuar con tu proyecto.
                            </p>
                        </li>
                        <li className="mb-4">
                            Inicia el proyecto de Firebase (En la raíz de tu proyecto):
                            <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mt-2 mb-2 overflow-x-auto">
                                {`firebase init`}
                            </pre>
                            <p className="mt-2 text-[#181818]">
                                Esto te pedirá que selecciones el tipo de proyecto que quieres inicializar. En este caso, selecciona "Firestore: Database" (con espacio y luego enter), las otras opciones las puedes dejar por defecto.
                            </p>
                        </li>
                    </ol>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">1. Configurar Firebase en Next.js</h2>
                    <ol className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>
                            Ve a <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline text-[#8B2C3B]">Firebase Console</a> y crea un nuevo proyecto.
                        </li>
                        <li>Agrega una app web y copia la configuración, te servirá más adelante. De momento puedes darle a continuar</li>
                        <li>Instala Firebase en tu proyecto, para ello corre el siguiente comando en la carpeta raíz. (Si el comando no lo reconoce, intenta ejecutarlo en una terminal de gitBash)</li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">npm install firebase</pre>
                    <ol start={4} className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>
                            Crea un archivo <b>.env.local</b> en la raíz y pega tus variables. Acá deberás agregar los valores que encuentras luego del paso 2
                        </li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">
                        {`NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu-analytic-id`}
                    </pre>
                    <ol start={5} className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>
                            En la raíz del proyecto, crea una carpeta <b>firebase</b> y un archivo <b>firebase.js</b>, en él vas a pegar lo siguiente:
                        </li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">
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

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">2. Escribir en Firebase (nueva-carta)</h2>
                    <p className="mb-4 text-[#181818]">
                        Para escribir datos en Firebase, necesitamos crear una API route y un componente que maneje el formulario. En Next.js 13+, la carpeta <b>app/api</b> es especial: cualquier archivo dentro de ella se convierte automáticamente en un endpoint de API. El archivo <b>route.js</b> es una convención de Next.js para definir rutas de API.
                    </p>
                    <p className="mb-4 text-[#181818]">
                        Primero, crea el archivo <b>app/api/firestore/route.js</b>. La estructura de carpetas es importante porque define la ruta de la API. En este caso, la API será accesible en <b>/api/firestore</b>:
                    </p>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-4 overflow-x-auto">
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
                    <p className="mb-4 text-[#181818]">
                        Este archivo maneja las peticiones POST a nuestra API. Cuando alguien envíe datos a <b>/api/firestore</b>, esta función los procesará y los guardará en Firestore.
                    </p>
                    <p className="mb-4 text-[#181818]">
                        Luego, crea el componente <b>app/nueva-carta/page.js</b>. En Next.js 13+, la carpeta <b>app</b> usa el sistema de enrutamiento basado en carpetas. Esto significa que <b>app/nueva-carta/page.js</b> será accesible en la ruta <b>/nueva-carta</b>:
                    </p>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-4 overflow-x-auto">
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
}`}
                    </pre>
                    <p className="mb-4 text-[#181818]">
                        Este componente es un formulario que:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li>Usa <b>"use client"</b> porque necesita interactividad del lado del cliente</li>
                        <li>Maneja el estado del formulario con <b>useState</b></li>
                        <li>Envía los datos a nuestra API usando <b>fetch</b></li>
                        <li>Redirige al usuario después de enviar la carta</li>
                    </ul>
                    <p className="mb-4 text-[#181818]">
                        Algunos conceptos importantes:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li><b>useState</b>: Es un Hook de React que nos permite agregar estado a componentes funcionales. En nuestro caso, lo usamos para:
                            <ul className="list-disc list-inside ml-8 mt-2">
                                <li>Mantener el valor de los campos del formulario</li>
                                <li>Controlar el estado de carga durante el envío</li>
                                <li>Actualizar la UI cuando los valores cambian</li>
                            </ul>
                        </li>
                        <li><b>fetch</b>: Es una API web moderna para hacer peticiones HTTP. En nuestro código:
                            <ul className="list-disc list-inside ml-8 mt-2">
                                <li>Enviamos datos en formato JSON con <code>JSON.stringify()</code></li>
                                <li>Especificamos el método HTTP (POST)</li>
                                <li>Configuramos los headers para indicar que enviamos JSON</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">3. Leer de Firebase (cartas)</h2>
                    <p className="mb-4 text-[#181818]">
                        Para leer datos de Firebase, primero agregamos el método GET en <b>app/api/firestore/route.js</b>. Este método se ejecutará cuando alguien haga una petición GET a <b>/api/firestore</b>:
                    </p>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-4 overflow-x-auto">
                        {`export async function GET() {
    const snapshot = await getDocs(collection(firestore, "cartas"));
    const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
    }));
    return NextResponse.json(data);
}`}
                    </pre>
                    <p className="mb-4 text-[#181818]">
                        En Next.js 13+, un archivo <b>route.js</b> puede exportar diferentes métodos HTTP:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li><b>GET</b>: Para obtener datos (como en este caso)</li>
                        <li><b>POST</b>: Para crear nuevos datos (como en el formulario)</li>
                        <li><b>PUT/PATCH</b>: Para actualizar datos existentes</li>
                        <li><b>DELETE</b>: Para eliminar datos</li>
                    </ul>
                    <p className="mb-4 text-[#181818]">
                        Este método:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li>Obtiene todos los documentos de la colección "cartas"</li>
                        <li>Convierte los documentos a un formato JSON</li>
                        <li>Devuelve los datos al cliente</li>
                    </ul>
                    <p className="mb-4 text-[#181818]">
                        Luego, creamos el componente <b>app/cartas/page.js</b>. Este componente:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li>Se carga en la ruta <b>/cartas</b></li>
                        <li>Usa <b>useEffect</b> para cargar los datos cuando el componente se monta</li>
                        <li>Muestra un estado de carga mientras los datos se están obteniendo</li>
                        <li>Renderiza una lista de cartas con un diseño responsive</li>
                    </ul>
                    <p className="mb-4 text-[#181818]">
                        Sobre <b>useEffect</b>:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-4 text-[#181818]">
                        <li>Es un Hook de React que nos permite ejecutar código después de que el componente se renderiza</li>
                        <li>El array vacío <code>[]</code> como segundo argumento significa que el efecto solo se ejecuta una vez al montar el componente</li>
                        <li>Es perfecto para:
                            <ul className="list-disc list-inside ml-8 mt-2">
                                <li>Cargar datos iniciales</li>
                                <li>Suscribirse a eventos</li>
                                <li>Realizar peticiones a APIs</li>
                            </ul>
                        </li>
                    </ul>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-4 overflow-x-auto">
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
}`}
                    </pre>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">6. Firestore: leer y escribir datos</h2>
                    <p>
                        Crea funciones para agregar y obtener datos de Firestore en <b>firebase/firestore/addData.js</b> y <b>firebase/firestore/getData.js</b>.
                    </p>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 overflow-x-auto">
                        {`import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);
// Agregar datos
export async function addData(collection, id, data) {
  let result = null, error = null;
  try {
    result = await setDoc(doc(db, collection, id), data, { merge: true });
  } catch (e) {
    error = e;
  }
  return { result, error };
}
// Obtener datos
export async function getData(collection, id) {
  let docRef = doc(db, collection, id);
  let result = null, error = null;
  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }
  return { result, error };
}`}
                    </pre>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">7. ¡Listo!</h2>
                    <p>
                        Ahora tienes una app Next.js 13 conectada a Firebase con autenticación y base de datos en tiempo real.
                    </p>
                    <p>
                        Para más detalles y pasos avanzados, revisa el tutorial original en{" "}
                        <a
                            href="https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-[#8B2C3B] hover:text-[#a13a4a]"
                        >
                            freeCodeCamp
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
