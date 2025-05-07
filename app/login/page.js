"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        router.push("/signin");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a13a4a]"></div>
        </div>
    );
} 