import * as Notifications from "expo-notifications";

export async function cancelarNotificacion(id: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (error) {
    console.log("Error al cancelar notificación:", error);
  }
}
