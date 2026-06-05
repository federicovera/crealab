export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-crealab-bg flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black text-crealab-text">
            Mi Dashboard 🚀
          </h1>
          <p className="text-gray-500 font-semibold">
            Tus cursos y progreso aparecerán aquí.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Estado</p>
          <p className="text-crealab-text font-semibold">
            Sesión activa. Dashboard en construcción — próximamente verás tus módulos y progreso.
          </p>
        </div>

        <a
          href="/api/auth/logout"
          className="text-sm text-brand-orange font-bold hover:underline self-start"
        >
          ← Cerrar sesión
        </a>
      </div>
    </main>
  );
}
