import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { guardarTareas, obtenerTareas, Tarea } from '../storage/tasks';

type Props = NativeStackScreenProps<any>;

export default function TareasScreen({ navigation }: Props) {

  const [tareas, setTareas] = useState<Tarea[]>([]);

  async function cargarTareas() {
    const data = await obtenerTareas();
    setTareas(data);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarTareas);
    return unsubscribe;
  }, [navigation]);

  async function completarTarea(id: string) {
    const nuevas = tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );

    setTareas(nuevas);
    await guardarTareas(nuevas);
  }

  async function eliminarTarea(id: string) {
    const nuevas = tareas.filter(t => t.id !== id);
    setTareas(nuevas);
    await guardarTareas(nuevas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completada && styles.completed]}>
              {item.titulo}
            </Text>

            <Text style={styles.taskDesc}>{item.descripcion}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => completarTarea(item.id)}
              >
                <Text style={{ color: 'white' }}>✔</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarTarea(item.id)}
              >
                <Text style={{ color: 'white' }}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 20 },

  taskItem: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },

  taskText: { fontSize: 18, fontWeight: 'bold' },
  taskDesc: { fontSize: 14, color: '#555', marginBottom: 10 },

  completed: {
    textDecorationLine: 'line-through',
    color: 'green',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  completeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },

  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
