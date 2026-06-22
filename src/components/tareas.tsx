import AsyncStorage from '@react-native-async-storage/async-storage';

// Modelo de una tarea (lo que guarda cada una)
export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
};

const STORAGE_KEY = 'tareas'; // donde guardo todo

// Traigo las tareas guardadas. Si no hay nada, devuelvo []
export async function obtenerTareas(): Promise<Tarea[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guardo la lista completa de tareas (sobrescribe lo anterior)
export async function guardarTareas(tareas: Tarea[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}
