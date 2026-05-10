import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
};

const STORAGE_KEY = 'tareas';

export async function obtenerTareas(): Promise<Tarea[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function guardarTareas(tareas: Tarea[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}
