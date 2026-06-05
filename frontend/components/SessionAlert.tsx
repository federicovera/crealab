"use client";

import { useSearchParams } from "next/navigation";

export default function SessionAlert() {
  const params = useSearchParams();
  if (params.get("sesion") !== "expirada") return null;

  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3 font-semibold">
      Tu sesión expiró. Ingresá de nuevo.
    </div>
  );
}
