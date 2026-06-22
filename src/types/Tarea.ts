export interface Ubicacion {
  lat: number;
  lng: number;
  direccion?: string;
}

export interface Contacto {
  nombre: string;
  telefono?: string;
}

export interface Recordatorio {
  activo: boolean;
  tipo: "diario" | "semanal" | "minutos" | null;
  temporizador: number | null;
  fechaHora: string | null;
  diasSemana: number[] | null;
  notificationId: string | null;
}

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  imagen?: string;
  ubicacion?: Ubicacion;
  contacto?: Contacto;
  eventId?: string | null;
  recordatorio: Recordatorio;
}
