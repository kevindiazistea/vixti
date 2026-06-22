import * as Calendar from 'expo-calendar';

export async function obtenerCalendarioDefault() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  return calendars[0];
}

export async function crearEventoSimple(
  titulo: string,
  notas: string,
  fecha: Date
) {
  const calendario = await obtenerCalendarioDefault();

  const inicio = fecha;
  const fin = new Date(fecha.getTime() + 60 * 60 * 1000); // +1 hora

  return Calendar.createEventAsync(calendario.id, {
    title: titulo,
    notes: notas,
    startDate: inicio,
    endDate: fin,
  });
}

export async function eliminarEvento(eventId: string) {
  try {
    await Calendar.deleteEventAsync(eventId);
  } catch {}
}
