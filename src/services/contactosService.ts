import * as Contacts from 'expo-contacts';

export async function seleccionarContacto() {
  // Abre el selector nativo
  const contacto = await Contacts.presentContactPickerAsync();

  // Si el usuario cancela, devuelve null
  if (!contacto) return null;

  return contacto;
}
