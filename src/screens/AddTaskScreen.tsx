import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { agregarTarea } from '../storage/tasks';

type Props = NativeStackScreenProps<any>;

export default function AddTaskScreen({ navigation }: Props) {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  async function guardarTareaHandler() {
    if (!titulo.trim()) {
      Alert.alert("Error", "El título es obligatorio");
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      completada: false,
    };

    await agregarTarea(nuevaTarea);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Tarea pendiente",
        body: `No olvides: ${titulo}`,
      },
      trigger: { seconds: 5 },
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Button title="Guardar tarea" onPress={guardarTareaHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
