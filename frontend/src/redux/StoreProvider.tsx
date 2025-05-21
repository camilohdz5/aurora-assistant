"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // Asumiendo que tu store está en redux/store.ts o similar
// Si tu store tiene un tipo específico para RootState, podrías querer importarlo también
// para un tipado más fuerte si es necesario aquí, aunque usualmente no lo es para el Provider.

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 