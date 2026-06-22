import * as Calendar from 'expo-calendar';
import { Camera } from 'expo-camera';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export async function pedirPermisoCamara() {
  return Camera.requestCameraPermissionsAsync();
}

export async function pedirPermisoGaleria() {
  return ImagePicker.requestMediaLibraryPermissionsAsync();
}

export async function pedirPermisoUbicacion() {
  return Location.requestForegroundPermissionsAsync();
}

export async function pedirPermisoContactos() {
  return Contacts.requestPermissionsAsync();
}

export async function pedirPermisoCalendario() {
  return Calendar.requestCalendarPermissionsAsync();
}
