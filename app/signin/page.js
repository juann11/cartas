"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { result, error } = await signIn(email, password);

            if (error) {
                setError("Error al iniciar sesión. Verifica tus credenciales.");
                console.log(error);
                return;
            }

            // Inicio de sesión exitoso
            console.log(result);
            router.push("/cartas");
        } catch (err) {
            setError("Ocurrió un error inesperado. Inténtalo nuevamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#8B2C3B] to-[#a13a4a] p-6 text-white">
                    <h1 className="text-2xl font-bold text-center">Bienvenido de nuevo</h1>
                    <p className="text-center text-amber-100 mt-2">Por favor, inicia sesión para continuar</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleForm} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2C3B] focus:border-transparent transition-all duration-200"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2C3B] focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-bold bg-gradient-to-r from-[#8B2C3B] to-[#a13a4a] hover:from-[#a13a4a] hover:to-[#c04e5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2C3B] transition-all duration-200 shadow-md"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">¿No tienes una cuenta?</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href="/signup" className="w-full inline-flex justify-center py-2 px-4 border border-[#8B2C3B] rounded-lg text-[#8B2C3B] font-medium hover:bg-[#ffda6a] hover:border-[#ffda6a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2C3B] transition-all duration-200">
                                Regístrate ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}