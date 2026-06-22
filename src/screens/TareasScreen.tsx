import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, Text, View } from 'react-native';
import Button from "../components/Button";
import Card from "../components/Card";
import { useTasksStore } from "../store/useTasksStore";
import globalStyles from '../styles/globalStyles';
import colors from "../theme/colors";

type Props = NativeStackScreenProps<any>;

export default function TareasScreen({ navigation }: Props) {

  const tareas = useTasksStore(s => s.tareas);
  const toggleCompletada = useTasksStore(s => s.toggleCompletada);
  const eliminarTarea = useTasksStore(s => s.eliminarTarea);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Mis Tareas</Text>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.text,
                textDecorationLine: item.completada ? "line-through" : "none",
                opacity: item.completada ? 0.5 : 1,
              }}
            >
              {item.titulo}
            </Text>

            {item.descripcion ? (
              <Text
                style={{
                  color: colors.textSecondary,
                  marginTop: 4,
                }}
              >
                {item.descripcion}
              </Text>
            ) : null}

            {item.imagen && (
              <Image
                source={{ uri: item.imagen }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            )}

            {item.ubicacion && (
              <Text style={{ marginTop: 8, color: colors.text }}>
                📍 {item.ubicacion.direccion 
                      ? item.ubicacion.direccion 
                      : `${item.ubicacion.lat.toFixed(4)}, ${item.ubicacion.lng.toFixed(4)}`}
              </Text>
            )}

            {item.contacto && (
              <Text style={{ marginTop: 8, color: colors.textSecondary }}>
                👤 {item.contacto.nombre}
                {item.contacto.telefono ? ` — ${item.contacto.telefono}` : ''}
              </Text>
            )}

            {item.eventId && (
              <Text style={{ marginTop: 8, color: colors.textSecondary }}>
                📅 Evento creado en calendario
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 12,
              }}
            >
              <Button
                title={item.completada ? "Desmarcar" : "Completar"}
                color={colors.secondary}
                onPress={() => toggleCompletada(item.id)}
              />

              <Button
                title="Editar"
                color={colors.secondary}
                onPress={() => navigation.navigate('AddTask', { tarea: item })}
              />

              <Button
                title="Eliminar"
                color={colors.danger}
                onPress={() => eliminarTarea(item.id)}
              />
            </View>

          </Card>
        )}

        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
            No hay tareas aún
          </Text>
        }
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Agregar tarea" onPress={() => navigation.navigate('AddTask')} />
      </View>
    </View>
  );
}
