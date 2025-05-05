export default function Tutorial() {
    return (
        <div className="min-h-screen bg-[#f8f5f0] py-10 px-2 flex justify-center">
            <div className="w-full max-w-3xl bg-white/90 rounded-xl shadow-xl p-8 border border-[#e2d6c2]">
                <h1 className="text-3xl font-bold text-[#8B2C3B] mb-2 text-center drop-shadow">Cómo crear una app full stack con Next.js 13 y Firebase</h1>
                <p className="text-center mb-8 text-[#6b4f2c]">
                    Basado en el tutorial original de freeCodeCamp:{" "}
                    <a
                        href="https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#8B2C3B] hover:text-[#a13a4a]"
                    >
                        How to Build a Full Stack App with Next.js 13 and Firebase
                    </a>
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">1. Crear un proyecto Next.js 13</h2>
                    <ol className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>Abre tu terminal y ejecuta:</li>
                    </ol>
                    <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 mb-2 overflow-x-auto">
                        {`npx create-next-app@latest --experimental-app
cd nombre-de-tu-proyecto
npm run dev`}
                    </pre>
                    <p className="mb-0">Esto iniciará el servidor en <b>http://localhost:3000</b>.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">2. Configurar Firebase en Next.js</h2>
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
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">3. Autenticación con Firebase</h2>
                    <ol className="list-decimal list-inside mb-2 text-[#181818]">
                        <li>En la consola de Firebase, activa el método de autenticación que prefieras (por ejemplo, Email/Password).</li>
                        <li>
                            Crea funciones para registro e inicio de sesión en <b>firebase/auth/signup.js</b> y <b>firebase/auth/signin.js</b>:
                        </li>
                    </ol>
                    <div className="mb-2">
                        <div className="font-semibold text-[#8B2C3B] mb-1">// signup.js</div>
                        <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 overflow-x-auto">
                            {`import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(firebase_app);
export default async function signUp(email, password) {
  let result = null, error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
}`}
                        </pre>
                    </div>
                    <div>
                        <div className="font-semibold text-[#8B2C3B] mb-1">// signin.js</div>
                        <pre className="bg-[#f3e6c1] text-[#8B2C3B] rounded p-3 overflow-x-auto">
                            {`import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(firebase_app);
export default async function signIn(email, password) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
}`}
                        </pre>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">4. Páginas de registro e inicio de sesión</h2>
                    <p>
                        Crea <b>app/signup/page.js</b> y <b>app/signin/page.js</b> con formularios que usen las funciones anteriores.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#bfa77a] mb-2">5. Contexto de autenticación</h2>
                    <p>
                        Usa React Context para compartir el usuario autenticado en toda la app. Crea <b>src/context/AuthContext.js</b> y envuelve tu layout con el provider.
                    </p>
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
