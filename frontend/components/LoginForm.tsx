"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completá todos los campos.");
      return;
    }

    setLoading(true);
    // Auth con WordPress — implementar en tarea posterior
    if (onSubmit) {
      onSubmit(email, password);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 font-semibold">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-crealab-text">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="bg-crealab-bg border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-orange transition-colors"
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-crealab-text">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-crealab-bg border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-semibold outline-none focus:border-brand-orange transition-colors"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-orange transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-brand-orange text-white font-bold rounded-xl px-6 py-3 hover:bg-orange-600 transition-colors disabled:opacity-60 mt-2"
      >
        {loading ? "Ingresando..." : "Ingresar"}
        {!loading && <ArrowRight size={18} />}
      </button>

      <p className="text-center text-sm text-gray-500 mt-1">
        ¿No tenés cuenta?{" "}
        <a href="/registro" className="text-brand-orange font-bold hover:underline">
          Registrate
        </a>
      </p>
    </form>
  );
}
