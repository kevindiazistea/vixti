import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = "usuarios";
const CURRENT_KEY = "usuario_actual";

export async function registrarUsuario(usuario: string, password: string) {
  const data = await AsyncStorage.getItem(USERS_KEY);
  const usuarios = data ? JSON.parse(data) : [];

  // Ver si ya existe
  const existe = usuarios.find((u: any) => u.usuario === usuario);
  if (existe) return false;

  usuarios.push({ usuario, password });

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
  return true;
}

export async function loginUsuario(usuario: string, password: string) {
  const data = await AsyncStorage.getItem(USERS_KEY);
  const usuarios = data ? JSON.parse(data) : [];

  const user = usuarios.find(
    (u: any) => u.usuario === usuario && u.password === password
  );

  if (!user) return false;

  await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  return true;
}

export async function obtenerUsuario() {
  const data = await AsyncStorage.getItem(CURRENT_KEY);
  return data ? JSON.parse(data) : null;
}

export async function cerrarSesion() {
  await AsyncStorage.removeItem(CURRENT_KEY);
}
