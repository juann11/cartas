import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amarillo">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-burdeos drop-shadow-lg text-center">
          Cartas sin marcar
        </h1>
        <p className="text-lg text-negroprofundo text-center max-w-md">
          Un lugar donde enviar cartas a la antigua
        </p>
        <button
          className="mt-6 px-8 py-3 rounded-full bg-burdeos text-white font-semibold text-lg shadow-lg hover:bg-[#a13a4a] transition"
        >
          Envía tu carta
        </button>
      </main>
    </div>
  );
}
