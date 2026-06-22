import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Tarea } from "../types/Tarea";

interface TasksState {
  tareas: Tarea[];
  tareasCompletadas: Tarea[];
  tareasEliminadas: Tarea[];

  agregarTarea: (t: Tarea) => void;
  editarTarea: (t: Tarea) => void;
  eliminarTarea: (id: string) => void;
  toggleCompletada: (id: string) => void;

  moverACompletadas: (id: string) => void;
  moverAEliminadas: (id: string) => void;
  restaurarEliminada: (id: string) => void;

  restaurarCompletada: (id: string) => void;
  eliminarCompletada: (id: string) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tareas: [],
      tareasCompletadas: [],
      tareasEliminadas: [],

      agregarTarea: (t) =>
        set({
          tareas: [...get().tareas, t],
        }),

      editarTarea: (t) =>
        set({
          tareas: get().tareas.map((x) =>
            x.id === t.id ? t : x
          ),
        }),

      eliminarTarea: (id) =>
        set((state) => {
          const tarea = state.tareas.find((t) => t.id === id);
          if (!tarea) return state;

          return {
            tareas: state.tareas.filter((t) => t.id !== id),
            tareasEliminadas: [...state.tareasEliminadas, tarea],
          };
        }),

      toggleCompletada: (id) =>
  set((state) => {

    let tarea = state.tareas.find((t) => t.id === id);
    let origen: "tareas" | "tareasCompletadas" = "tareas";

    if (!tarea) {
      tarea = state.tareasCompletadas.find((t) => t.id === id);
      origen = "tareasCompletadas";
    }

    if (!tarea) return state;

    const actualizada = { ...tarea, completada: !tarea.completada };

    // Si se completa, mover a completadas
    if (actualizada.completada) {
      return {
        tareas: state.tareas.filter((t) => t.id !== id),
        tareasCompletadas: [...state.tareasCompletadas, actualizada],
      };
    }

    // Mover a tareas activas
    return {
      tareas: [...state.tareas, actualizada],
      tareasCompletadas: state.tareasCompletadas.filter((t) => t.id !== id),
    };
  }),


      // Mover a completadas, pero manual
      moverACompletadas: (id) =>
        set((state) => {
          const tarea = state.tareas.find((t) => t.id === id);
          if (!tarea) return state;

          return {
            tareas: state.tareas.filter((t) => t.id !== id),
            tareasCompletadas: [
              ...state.tareasCompletadas,
              { ...tarea, completada: true },
            ],
          };
        }),

      // Mover a eliminadas, pero manual
      moverAEliminadas: (id) =>
        set((state) => {
          const tarea = state.tareas.find((t) => t.id === id);
          if (!tarea) return state;

          return {
            tareas: state.tareas.filter((t) => t.id !== id),
            tareasEliminadas: [...state.tareasEliminadas, tarea],
          };
        }),

      // restaurar
      restaurarEliminada: (id) =>
        set((state) => {
          const tarea = state.tareasEliminadas.find((t) => t.id === id);
          if (!tarea) return state;

          return {
            tareasEliminadas: state.tareasEliminadas.filter((t) => t.id !== id),
            tareas: [...state.tareas, tarea],
          };
        }),

      //  restaurar completadas
      restaurarCompletada: (id) =>
        set((state) => {
          const tarea = state.tareasCompletadas.find((t) => t.id === id);
          if (!tarea) return state;

          const restaurada = { ...tarea, completada: false };

          return {
            tareasCompletadas: state.tareasCompletadas.filter((t) => t.id !== id),
            tareas: [...state.tareas, restaurada],
          };
        }),

      // borrar desde eliminadas
      eliminarCompletada: (id) =>
        set((state) => ({
          tareasCompletadas: state.tareasCompletadas.filter((t) => t.id !== id),
        })),
    }),

    {
      name: "tasks-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
