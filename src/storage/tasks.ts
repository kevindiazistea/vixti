import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerUsuario } from './auth';

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
};

export async function obtenerTareas(): Promise<Tarea[]> {
  const user = await obtenerUsuario();
  if (!user) return [];

  const key = `tareas_${user.usuario}`;
  const data = await AsyncStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export async function guardarTareas(tareas: Tarea[]) {
  const user = await obtenerUsuario();
  if (!user) return;

  const key = `tareas_${user.usuario}`;
  await AsyncStorage.setItem(key, JSON.stringify(tareas));
}

export async function agregarTarea(tarea: Tarea) {
  const tareasActuales = await obtenerTareas();
  tareasActuales.push(tarea);
  await guardarTareas(tareasActuales);
}
