import * as Calendar from "expo-calendar";

// Pide permisos
export async function pedirPermisosCalendario() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === "granted";
}

// Trae calendario
export async function obtenerCalendarioDefault() {
  const tienePermiso = await pedirPermisosCalendario();
  if (!tienePermiso) return null;

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

  const editable = calendars.find(c => c.allowsModifications);
  if (editable) return editable;

  return calendars[0] ?? null;
}

// Crea el evento
export async function crearEventoSimple(
  titulo: string,
  notas: string,
  fecha: Date
) {
  const calendario = await obtenerCalendarioDefault();
  if (!calendario) return null;

  const inicio = fecha;
  const fin = new Date(fecha.getTime() + 60 * 60 * 1000);

  try {
    const eventId = await Calendar.createEventAsync(calendario.id, {
      title: titulo,
      notes: notas,
      startDate: inicio,
      endDate: fin,
      alarms: [{ relativeOffset: -10 }],
    });

    return eventId;
  } catch (e) {
    console.log("Error creando evento:", e);
    return null;
  }
}

// Trae los datos del evento
export async function obtenerEvento(eventId: string) {
  try {
    return await Calendar.getEventAsync(eventId);
  } catch (e) {
    console.log("No se pudo obtener el evento:", e);
    return null;
  }
}

// 5) Eliminar evento
export async function eliminarEvento(eventId: string) {
  try {
    await Calendar.deleteEventAsync(eventId);
  } catch (e) {
    console.log("No se pudo eliminar el evento:", e);
  }
}
