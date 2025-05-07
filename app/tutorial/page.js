export default function Tutorial() {
    return (
        <div className="min-h-screen bg-[#f8f5f0] py-10 px-2 flex justify-center">
            <div className="w-full max-w-3xl bg-white/90 rounded-xl shadow-xl p-8 border border-[#e2d6c2]">
                <h1 className="text-3xl font-bold text-[#8B2C3B] mb-2 text-center drop-shadow">Conectando Next con Firestore de Firebase</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">0. Instalar Firebase CLI</h2>
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
                        <li>Agrega una app web y copia la configuración.</li>
                        <li>Instala Firebase en tu proyecto:</li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">npm install firebase</pre>
                    <ol start={4} className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>
                            Crea un archivo <b>.env.local</b> en la raíz y pega tus variables:
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
                            Crea una carpeta <b>firebase</b> y un archivo <b>config.js</b>:
                        </li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">
                        {`import { initializeApp, getApps } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebase_app;`}
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
