import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import SessionAlert from "@/components/SessionAlert";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">

      {/* Lado izquierdo — Identidad de marca */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-12 text-white"
        style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FFD23F 100%)" }}>

        <div className="max-w-sm w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl font-black tracking-tight">
              CreaLab
            </h1>
            <p className="text-lg font-semibold opacity-90">
              Programá. Construí. Aprendé.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["🤖 Robótica", "💻 Programación", "⚡ STEAM", "🏆 Proyectos reales"].map((tag) => (
              <span
                key={tag}
                className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-base font-semibold opacity-90 leading-relaxed">
            La plataforma educativa para aprender programación y robótica
            construyendo proyectos reales. Para jóvenes de 8 a 18 años.
          </p>
        </div>
      </div>

      {/* Lado derecho — Login */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-12 bg-white">
        <div className="max-w-sm w-full flex flex-col gap-8">

          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-crealab-text">
              Bienvenido 👋
            </h2>
            <p className="text-gray-500 font-semibold">
              Ingresá a tu cuenta para continuar
            </p>
          </div>

          <Suspense>
            <SessionAlert />
          </Suspense>

          <LoginForm />

        </div>
      </div>

    </main>
  );
}
