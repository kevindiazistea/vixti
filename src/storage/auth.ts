import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = "usuarios";        // acá guardo TODOS los usuarios registrados
const CURRENT_KEY = "usuario_actual"; // acá guardo el usuario que está logueado

// Registrar un usuario nuevo
export async function registrarUsuario(usuario: string, password: string) {

  // Traigo la lista de usuarios guardados
  const data = await AsyncStorage.getItem(USERS_KEY);
  const usuarios = data ? JSON.parse(data) : [];

  // Me fijo si ya existe uno con el mismo nombre
  const existe = usuarios.find((u: any) => u.usuario === usuario);
  if (existe) return false; // si existe, aviso que no se puede registrar

  // Si no existe, lo agrego
  usuarios.push({ usuario, password });

  // Guardo la lista actualizada
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
  return true;
}

// Login: valida usuario + contraseña
export async function loginUsuario(usuario: string, password: string) {

  // Traigo todos los usuarios registrados
  const data = await AsyncStorage.getItem(USERS_KEY);
  const usuarios = data ? JSON.parse(data) : [];

  // Busco uno que coincida con usuario y contraseña
  const user = usuarios.find(
    (u: any) => u.usuario === usuario && u.password === password
  );

  // Si no existe, login incorrecto
  if (!user) return false;

  // Si existe, lo guardo como "usuario actual"
  await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  return true;
}

// Devuelve el usuario que está logueado actualmente
export async function obtenerUsuario() {
  const data = await AsyncStorage.getItem(CURRENT_KEY);
  return data ? JSON.parse(data) : null;
}

// Cerrar sesión: borro el usuario actual
export async function cerrarSesion() {
  await AsyncStorage.removeItem(CURRENT_KEY);
}
