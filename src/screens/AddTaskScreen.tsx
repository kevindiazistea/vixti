import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

import {
  crearEventoSimple,
  eliminarEvento,
} from "../services/calendarioService";

import { tomarFoto } from "../services/camaraService";
import { seleccionarContacto } from "../services/contactosService";
import { seleccionarDeGaleria } from "../services/galeriaservice";
import { cancelarNotificacion } from "../services/notificacionesService";

import {
  pedirPermisoCalendario,
  pedirPermisoCamara,
  pedirPermisoContactos,
  pedirPermisoGaleria,
  pedirPermisoUbicacion,
} from "../services/permisos";

import { obtenerUbicacionActual } from "../services/ubicacionService";

import { useTasksStore } from "../store/useTasksStore";
import { Tarea } from "../types/Tarea";

import colors from "../theme/colors";

type Props = NativeStackScreenProps<any>;

export default function AddTaskScreen({ navigation, route }: Props) {
  const agregarTarea = useTasksStore((s) => s.agregarTarea);
  const editarTarea = useTasksStore((s) => s.editarTarea);

  const tareaEditar: Tarea | undefined = route.params?.tarea;

  // Título y descripción
  const [titulo, setTitulo] = useState(tareaEditar?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(
    tareaEditar?.descripcion ?? ""
  );

  // Foto
  const [imagen, setImagen] = useState<string | undefined>(
    tareaEditar?.imagen
  );
  const [previewVisible, setPreviewVisible] = useState(false);

  // Ubicacion
  const [ubicacion, setUbicacion] = useState<
    { latitude: number; longitude: number; address?: string } | null
  >(
    tareaEditar?.ubicacion
      ? {
          latitude:
            (tareaEditar.ubicacion as any).latitude ??
            (tareaEditar.ubicacion as any).lat,
          longitude:
            (tareaEditar.ubicacion as any).longitude ??
            (tareaEditar.ubicacion as any).lng,
          address:
            (tareaEditar.ubicacion as any).address ??
            (tareaEditar.ubicacion as any).direccion,
        }
      : null
  );

  // Contacto
  const [contacto, setContacto] = useState<
    { nombre: string; telefono?: string } | null
  >(tareaEditar?.contacto ?? null);

  // Calendario
  const [eventId, setEventId] = useState<string | null>(
    tareaEditar?.eventId ?? null
  );
  const [fechaEvento, setFechaEvento] = useState(new Date());

  // Recordatorio
  const [temporizador, setTemporizador] = useState<number>(
    Number(
      tareaEditar?.recordatorio.tipo === "minutos"
        ? tareaEditar.recordatorio.temporizador
        : 5
    )
  );

  const [personalizado, setPersonalizado] = useState(
    tareaEditar ? tareaEditar.recordatorio.tipo !== "minutos" : false
  );

  const [tipoRecordatorio, setTipoRecordatorio] = useState<
    "diario" | "semanal" | null
  >(
    tareaEditar?.recordatorio.tipo === "diario" ||
      tareaEditar?.recordatorio.tipo === "semanal"
      ? tareaEditar.recordatorio.tipo
      : null
  );

  const [horaRecordatorio, setHoraRecordatorio] = useState(
    tareaEditar?.recordatorio.fechaHora
      ? new Date(tareaEditar.recordatorio.fechaHora)
      : new Date()
  );

  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [diasSemana, setDiasSemana] = useState<number[]>(
    tareaEditar?.recordatorio.diasSemana ?? []
  );

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  // Camara
  const abrirCamara = async () => {
    const permiso = await pedirPermisoCamara();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "No se puede usar la cámara");
      return;
    }

    const result = await tomarFoto();
    if (!result.canceled && result.assets?.length > 0) {
      setImagen(result.assets[0].uri);
    }
  };

  // Galería
  const abrirGaleria = async () => {
    const permiso = await pedirPermisoGaleria();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "No se puede acceder a la galería");
      return;
    }

    const result = await seleccionarDeGaleria();
    if (!result.canceled && result.assets?.length > 0) {
      setImagen(result.assets[0].uri);
    }
  };

  // Ubicacion
  const obtenerUbicacionHandler = async () => {
    const permiso = await pedirPermisoUbicacion();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "No se puede acceder a la ubicación");
      return;
    }

    const loc = await obtenerUbicacionActual();
    if (!loc) {
      Alert.alert("Error", "No se pudo obtener la ubicación");
      return;
    }

    setUbicacion({
      latitude: loc.latitude,
      longitude: loc.longitude,
      address: loc.address,
    });
  };

  // Contacto
  const seleccionarContactoHandler = async () => {
    const permiso = await pedirPermisoContactos();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "No se puede acceder a los contactos");
      return;
    }

    const c = await seleccionarContacto();
    if (!c) return;

    setContacto({
      nombre: c.name ?? "Sin nombre",
      telefono: c.phoneNumbers?.[0]?.number,
    });
  };

  // Guardar tarea
  const guardarTareaHandler = async () => {
    if (!titulo.trim()) {
      Alert.alert("Error", "El título es obligatorio");
      return;
    }

    let notificationId: string | null = null;

    // Recordatorio simple
    if (!personalizado && temporizador > 0) {
      const trigger: Notifications.TimeIntervalTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: temporizador * 60,
      repeats: false,
    };


    notificationId = await Notifications.scheduleNotificationAsync({
      content: { title: "Recordatorio", body: titulo },
      trigger,
    });
    }

  // Recordatorio perzonalizado
    else if (personalizado && tipoRecordatorio) {
    const trigger: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    hour: horaRecordatorio.getHours(),
    minute: horaRecordatorio.getMinutes(),
    repeats: true,
    };


    notificationId = await Notifications.scheduleNotificationAsync({
      content: { title: "Recordatorio", body: titulo },
      trigger,
    });
    }


    // Evento de calendario
    let nuevoEventId = eventId;
    const permisoCal = await pedirPermisoCalendario();

    if (permisoCal.granted) {
      if (nuevoEventId) await eliminarEvento(nuevoEventId);

      nuevoEventId = await crearEventoSimple(
        titulo,
        descripcion,
        fechaEvento
      );
    }

    // Armar la tarea completa
    const nuevaTarea: Tarea = {
      id: tareaEditar?.id ?? Date.now().toString(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      imagen,
      completada: tareaEditar?.completada ?? false,

      ubicacion: ubicacion
        ? {
            lat: ubicacion.latitude,
            lng: ubicacion.longitude,
            direccion: ubicacion.address,
          }
        : undefined,

      contacto: contacto ?? undefined,
      eventId: nuevoEventId ?? null,

      recordatorio: {
        activo: true,
        tipo: personalizado ? tipoRecordatorio ?? "diario" : "minutos",
        temporizador: personalizado ? null : temporizador,
        fechaHora: personalizado ? horaRecordatorio.toISOString() : null,
        diasSemana:
          personalizado && tipoRecordatorio === "semanal"
            ? diasSemana
            : null,
        notificationId,
      },
    };

    if (tareaEditar) {
      if (tareaEditar.recordatorio.notificationId) {
        await cancelarNotificacion(tareaEditar.recordatorio.notificationId);
      }
      editarTarea(nuevaTarea);
    } else {
      agregarTarea(nuevaTarea);
    }

    navigation.goBack();
  };

  // Render
  return (
    <ScrollView 
  style={{ flex: 1, backgroundColor: colors.background }}
  contentContainerStyle={{ padding: 20, paddingBottom: 40, justifyContent: "center" }}
>



      {/* TÍTULO Y DESCRIPCIÓN */}
      <Card>
        <Input
          label="Título"
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Comprar víveres"
        />

        <Input
          label="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Detalles de la tarea"
          multiline
        />
      </Card>

      {/* FOTO */}
      <Card>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>
          Foto
        </Text>

        {imagen ? (
          <>
            <TouchableOpacity onPress={() => setPreviewVisible(true)}>
              <Image
                source={{ uri: imagen }}
                style={{ width: "100%", height: 200, borderRadius: 12 }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Button
                title="Ver grande"
                color={colors.secondary}
                onPress={() => setPreviewVisible(true)}
              />
              <Button
                title="Eliminar"
                color={colors.danger}
                onPress={() => setImagen(undefined)}
              />
            </View>

            <Modal visible={previewVisible} transparent>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.9)",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: imagen }}
                  style={{
                    width: "100%",
                    height: "80%",
                    resizeMode: "contain",
                  }}
                />
                <Button
                  title="Cerrar"
                  color={colors.secondary}
                  onPress={() => setPreviewVisible(false)}
                />
              </View>
            </Modal>
          </>
        ) : (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button title="Tomar foto" onPress={abrirCamara} />
            <Button
              title="Galería"
              color={colors.secondary}
              onPress={abrirGaleria}
            />
          </View>
        )}
      </Card>

      {/* UBICACIÓN */}
      <Card>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>
          Ubicación
        </Text>

        {ubicacion ? (
          <>
            <Text style={{ color: colors.textSecondary, marginBottom: 10 }}>
              {ubicacion.address ??
                `Lat: ${ubicacion.latitude.toFixed(6)} | Lng: ${ubicacion.longitude.toFixed(6)}`}
            </Text>

            <Button
              title="Quitar ubicación"
              color={colors.secondary}
              onPress={() => setUbicacion(null)}
            />
          </>
        ) : (
          <Button title="Obtener ubicación" onPress={obtenerUbicacionHandler} />
        )}
      </Card>

      {/* CONTACTO */}
      <Card>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>
          Contacto
        </Text>

        {contacto ? (
          <>
            <Text style={{ color: colors.textSecondary }}>
              👤 {contacto.nombre}
            </Text>
            {contacto.telefono && (
              <Text style={{ color: colors.textSecondary }}>
                📞 {contacto.telefono}
              </Text>
            )}

            <Button
              title="Quitar contacto"
              color={colors.secondary}
              onPress={() => setContacto(null)}
            />
          </>
        ) : (
          <Button
            title="Seleccionar contacto"
            onPress={seleccionarContactoHandler}
          />
        )}
      </Card>

      {/* CALENDARIO */}
      <Card>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>
          Calendario
        </Text>

        <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>
          Seleccionar fecha del evento
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Input
            label="Día"
            keyboardType="numeric"
            value={String(fechaEvento.getDate())}
            onChangeText={(t) => {
              const nueva = new Date(fechaEvento);
              nueva.setDate(Number(t));
              setFechaEvento(nueva);
            }}
            style={{ flex: 1 }}
          />

          <Input
            label="Mes"
            keyboardType="numeric"
            value={String(fechaEvento.getMonth() + 1)}
            onChangeText={(t) => {
              const nueva = new Date(fechaEvento);
              nueva.setMonth(Number(t) - 1);
              setFechaEvento(nueva);
            }}
            style={{ flex: 1 }}
          />

          <Input
            label="Año"
            keyboardType="numeric"
            value={String(fechaEvento.getFullYear())}
            onChangeText={(t) => {
              const nueva = new Date(fechaEvento);
              nueva.setFullYear(Number(t));
              setFechaEvento(nueva);
            }}
            style={{ flex: 1 }}
          />
        </View>

        <Button
          title="Guardar fecha en calendario"
          onPress={async () => {
            const permiso = await pedirPermisoCalendario();
            if (!permiso.granted) {
              Alert.alert("Permiso denegado", "No se puede crear el evento");
              return;
            }

            if (eventId) await eliminarEvento(eventId);

            const id = await crearEventoSimple(
              titulo,
              descripcion,
              fechaEvento
            );

            setEventId(id);

            Alert.alert(
              "Evento creado",
              `El evento fue agregado al calendario para el ${fechaEvento.toLocaleDateString()}`
            );
          }}
        />

        {eventId && (
          <Button
            title="Eliminar evento"
            color={colors.danger}
            onPress={async () => {
              await eliminarEvento(eventId);
              setEventId(null);
            }}
          />
        )}
      </Card>

      {/* RECORDATORIOS */}
      <Card>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>
          Recordatorio
        </Text>

        <Button
          title={
            personalizado
              ? "Usar temporizador en minutos"
              : "Usar recordatorio diario/semanal"
          }
          color={colors.secondary}
          onPress={() => setPersonalizado(!personalizado)}
        />

        {/* SIMPLE */}
        {!personalizado && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.textSecondary }}>
              Temporizador (minutos)
            </Text>

            <Input
              keyboardType="numeric"
              value={temporizador.toString()}
              onChangeText={(t) => setTemporizador(Number(t) || 1)}
            />
          </View>
        )}

        {/* PERSONALIZADO */}
        {personalizado && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.textSecondary }}>
              Tipo de recordatorio
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
              <Button
                title="Diario"
                color={colors.secondary}
                onPress={() => setTipoRecordatorio("diario")}
              />
              <Button
                title="Semanal"
                color={colors.secondary}
                onPress={() => setTipoRecordatorio("semanal")}
              />
            </View>

            <Button
              title="Elegir hora"
              color={colors.secondary}
              onPress={() => setMostrarPicker(true)}
            />

            {mostrarPicker && (
              <DateTimePicker
                value={horaRecordatorio}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setMostrarPicker(false);
                  if (selectedDate) setHoraRecordatorio(selectedDate);
                }}
              />
            )}

            {tipoRecordatorio === "semanal" && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: colors.textSecondary }}>
                  Días de la semana
                </Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5, 6, 0].map((dia) => (
                    <TouchableOpacity
                      key={dia}
                      onPress={() => {
                        if (diasSemana.includes(dia)) {
                                                  setDiasSemana(
                          diasSemana.filter((d) => d !== dia)
                        );
                      } else {
                        setDiasSemana([...diasSemana, dia]);
                      }
                    }}
                    style={{
                      padding: 8,
                      margin: 4,
                      borderRadius: 6,
                      backgroundColor: diasSemana.includes(dia)
                        ? colors.primary
                        : colors.card,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: diasSemana.includes(dia)
                          ? "#fff"
                          : colors.text,
                      }}
                    >
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][dia]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </Card>

    {/* GUARDAR */}
    <View style={{ marginTop: 20 }}>
      <Button title="Guardar tarea" onPress={guardarTareaHandler} />
    </View>
  </ScrollView>
);
}
